#!/usr/bin/env python3
"""Genera novedades-en-vias/estado_vial.json desde Supabase (schema radar, solo vigentes).

Fuente de verdad: Supabase SICETAC-ATICA, vista radar.v_novedades_vigentes (RLS pública: solo vigentes).
Uso en vivo (llave anon pública, nunca service_role):
  SUPABASE_URL=https://kpdlneddaqvkpwfbqejk.supabase.co SUPABASE_ANON_KEY=... python3 scripts/export_estado_vial_supabase.py
Uso offline: --snapshot snapshot.json  ({"corte": {...}, "vigentes": [...]})
Requiere que el schema `radar` esté expuesto en la Data API (Settings > API > Exposed schemas).
"""
import argparse, json, os, urllib.request
from datetime import datetime, timezone, timedelta
BOG = timezone(timedelta(hours=-5))
VENTANA = {"am": "AM", "md": "MD", "pm": "PM", "od": "OD"}

def rest(path):
    url = os.environ["SUPABASE_URL"].rstrip("/") + "/rest/v1/" + path
    key = os.environ["SUPABASE_ANON_KEY"]
    req = urllib.request.Request(url, headers={"apikey": key, "Authorization": f"Bearer {key}", "Accept-Profile": "radar"})
    return json.load(urllib.request.urlopen(req, timeout=30))

def load_live():
    vig = rest("v_novedades_vigentes?select=*")
    cors = {c["corridor_id"]: c["nombre"] for c in rest("corredores?select=corridor_id,nombre")}
    codes = sorted({m for v in vig for m in v["municipios"]})
    muns = {}
    if codes:
        for m in rest("municipios?select=dane_code,nombre,departamento&dane_code=in.(" + ",".join(codes) + ")"):
            muns[m["dane_code"]] = f'{m["nombre"]} ({m["departamento"]})'
    for v in vig:
        v["corredor_nombre"] = " / ".join(cors.get(c, c) for c in v["corredores"]) or None
        v["municipio_nombre"] = ", ".join(muns.get(m, m) for m in v["municipios"]) or None
    cut = max((v["actualizado_en_corte"] for v in vig), default=None)
    return {"corte": {"cut_id": cut}, "vigentes": vig}

def build(d):
    corte, vig = d["corte"] or {}, d["vigentes"] or []
    cut = corte.get("cut_id") or ""
    fecha, _, franja = cut.rpartition("-")
    now = datetime.now(BOG)
    def evento(v):
        return {
            "id": v["event_id"], "corredor": v.get("corredor_nombre") or "Sin corredor asignado",
            "tramo": v["texto_ubicacion"], "municipio": v.get("municipio_nombre") or "", "via": v.get("via_codigo") or "",
            "km": " – ".join(p for p in [v.get("pr_inicio"), v.get("pr_fin")] if p),
            "tipo": v["tipo"], "severidad": v["severidad"], "estado": "active" if v["estado"] == "activa" else "watch",
            "resumen": v["texto_ubicacion"], "vigente_hasta": v["valid_until"], "actualizado_en": v["last_verified_at"],
            "estado_ubicacion": v["estado_ubicacion"],
            "fuentes": [{"nombre": e["fuente"], "url": e["url"], "tier": e["tier"]} for e in (v.get("evidencias") or [])],
        }
    conf = [evento(v) for v in vig if v["estado"] == "activa"]
    vigil = [evento(v) for v in vig if v["estado"] != "activa"]
    listado = [{"icono": v.get("icono") or "🟡", "corredor": v.get("corredor_nombre") or v.get("municipio_nombre") or "Sin ubicar",
                "km": " – ".join(p for p in [v.get("pr_inicio"), v.get("pr_fin")] if p), "estado": v["texto_ubicacion"],
                "fuente": " · ".join(e["url"] for e in (v.get("evidencias") or []) if e.get("url"))}
               for v in vig if v["estado"] == "activa"]
    fuentes = {}
    for v in vig:
        for e in v.get("evidencias") or []:
            f = fuentes.setdefault(e["url"] or e["fuente"], {"id": e["fuente"], "nombre": e["fuente"], "url": e["url"], "fortaleza": e["tier"], "eventos": 0})
            f["eventos"] += 1
    return {
        "schema_version": "1.4", "modo": "operativo", "draft": False, "fuente_datos": "supabase:radar.v_novedades_vigentes",
        "cut_id": cut, "calidad_ingesta": {"state": "complete", "observation_count": len(vig), "complete": True, "fuente": "supabase"}, "revision_id": corte.get("revision_hash"), "zona_horaria": "America/Bogota",
        "nota_vigencia": "Solo novedades vigentes: cada una tiene fecha de vencimiento y sale sola del listado cuando vence o se resuelve.",
        "fecha": fecha, "ventana": VENTANA.get(franja, franja.upper()), "hora": now.strftime("%H:%M"),
        "generado_en": now.isoformat(timespec="seconds"),
        "que_cambio": [], "notas_cambio": [], "listado": listado, "senales_tempranas": [],
        "alertas_inmediatas": [], "acciones_sugeridas": [],
        "eventos_confirmados": conf, "eventos_vigilancia": vigil, "eventos_resueltos": [],
        "historial_corredores": [], "cambios_dia": [], "fuentes": list(fuentes.values()), "bibliografia_reporte": [],
    }

if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--snapshot"); ap.add_argument("--out", default="novedades-en-vias/estado_vial.json")
    a = ap.parse_args()
    data = json.load(open(a.snapshot)) if a.snapshot else load_live()
    out = build(data)
    with open(a.out, "w", encoding="utf-8") as fh: json.dump(out, fh, ensure_ascii=False, indent=2); fh.write("\n")
    print(f"{a.out}: {out['cut_id']} · {len(out['eventos_confirmados'])} activas · {len(out['eventos_vigilancia'])} en vigilancia")
