# WebMCP v1 — SICETAC al Instante

Fecha de estado: 2026-09-02

Rama de implementación: `codex/webmcp-sicetac-v1`

Estado: publicado en `main` y validado de punta a punta en `https://atiemppo.com/sicetac-al-instante/`.

## Objetivo

Permitir que un agente compatible abra `https://atiemppo.com/sicetac-al-instante/`, descubra una herramienta llamada `consultar_sicetac` y consulte una ruta con el mismo backend y las mismas opciones de SICETAC al Instante.

No es un producto nuevo y no duplica el cálculo SICETAC.

## Flujo

```text
Agente en la página
        |
        v
consultar_sicetac (WebMCP, read-only)
        |
        v
POST https://sicetac-api-mcp.onrender.com/consulta
        |
        v
Respuesta corta: ruta, totales, H2/H4/H8, peajes y texto
```

La página humana no incorpora formulario, iframe ni interfaz nueva. En navegadores sin WebMCP, la herramienta no se registra y la página continúa funcionando normalmente.

## Archivos de esta implementación

- `sicetac-al-instante.html`: registro y ejecución del tool.
- `llms.txt`: enruta primero a la landing con tool in-page.
- `llms-full.txt`: documenta el mismo orden de acceso.
- `docs/WEBMCP-SICETAC-V1.md`: esta nota de coordinación.

## Contrato del tool

- Nombre: `consultar_sicetac`
- Título: `Consultar SICETAC`
- Tipo: solo lectura (`readOnlyHint: true`)
- Obligatorios: `origen`, `destino`
- Opcionales:
  - `vehiculo`, default `C3S3`
  - `carroceria`, default `General - Estacas`
- El schema no acepta propiedades adicionales.
- No recibe modo plus ni hora logística.
- Siempre solicita al backend `resumen: true` y `peajes: true`.
- Devuelve como máximo cinco variantes oficiales, indica el total disponible y limita `texto` a 1500 caracteres.

Las listas de vehículos y carrocerías se copiaron del catálogo vigente de `SICETAC-INSTANT`; esa aplicación fue consultada en modo de solo lectura.

## Límites entre repositorios

Esta implementación pertenece exclusivamente a `PAGINA-WEB-ATIEMPPO`.

No modifica:

- `SICETAC-API-MCP` / `sicetac-mcp-atiemppo`;
- `SICETAC-INSTANT`;
- `SICETAC-LAB`;
- Render, Vercel, Supabase, secretos o migraciones.

Existe un trabajo anterior, separado y todavía local en `SICETAC-API-MCP`, relacionado con una API comercial v1. No forma parte de esta rama y debe revisarse en su propio flujo antes de commit, push, migración o despliegue.

## Validaciones realizadas

Revalidado el 2026-09-02:

- build completo de Jekyll con Ruby 3.1.4: correcto;
- registro simulado del tool: correcto;
- consulta real Bogotá → Barranquilla: correcta;
- respuesta observada: H2, H4, H8 y peajes presentes;
- respuesta WebMCP compacta: 457 caracteres de JSON y 95 de `texto`;
- CORS del backend para `Origin: https://atiemppo.com`: correcto;
- `git diff --check`: correcto;
- publicación de GitHub Pages para el commit `4d1ec6c`: correcta;
- sitio público: contiene `document.modelContext.registerTool` y `consultar_sicetac`;
- navegador integrado: descubrió el tool desde la página y lo ejecutó correctamente;
- prueba publicada Bogotá → Barranquilla: H2 `$7.638.005`, H4 `$7.821.531`, H8 `$8.188.583` y peajes `$869.600` COP.

Nota de entorno: Jekyll 3.9 con Ruby 3.2.4 falla por una incompatibilidad preexistente de Liquid con `String#tainted?`; Ruby 3.1.4 construye el sitio correctamente.

## Token de Chrome, explicado sin lenguaje técnico

El token pendiente es un token público del Origin Trial de Chrome para WebMCP. No es una clave de SICETAC, OpenAI, Render ni Supabase.

Cuando se decida probar con Chrome:

1. Abrir `https://developer.chrome.com/origintrials/`.
2. Iniciar sesión con Google.
3. Buscar `WebMCP`.
4. Registrar exactamente el origen `https://atiemppo.com`.
5. Copiar la cadena que entrega Chrome.
6. Reemplazar el placeholder comentado en el `<head>` de `sicetac-al-instante.html`.
7. Construir y revisar nuevamente antes de publicar.

El token no autoriza por sí mismo una publicación. Para Site tools del navegador integrado de ChatGPT/Codex, la disponibilidad depende del soporte de OpenAI y no de este token de Chrome.

## Coordinación con otros cambios de la web

Otros proyectos pueden modificar el resto de `PAGINA-WEB-ATIEMPPO`, pero deben evitar sobrescribir estos archivos sin revisar la integración:

- `sicetac-al-instante.html`
- `llms.txt`
- `llms-full.txt`
- `docs/WEBMCP-SICETAC-V1.md`

El archivo local `docs/SEGUIMIENTO-EN-2026-08-30.md` pertenece al trabajo anterior de la fase inglesa y no se incluye en esta rama.

## Estado de publicación y siguiente paso opcional

La rama se subió a GitHub y el mismo cambio se publicó en `main` con autorización explícita de Juan. La publicación, el descubrimiento del tool y una consulta real quedaron verificados.

No queda ningún paso obligatorio para el objetivo de que un agente compatible entre a ATIEMPPO y consulte SICETAC. Como prueba adicional opcional, se puede obtener el token público del Origin Trial de Chrome y activar el meta tag ya preparado. Ese token no es una clave del API ni debe confundirse con la futura API comercial.

No se modificó ni publicó el trabajo local separado de `SICETAC-API-MCP`.
