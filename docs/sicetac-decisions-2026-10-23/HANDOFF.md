# Blog SICETAC al Instante · Decisions · 23 octubre 2026

Estado: artículo publicado y verificado en https://atiemppo.com/blog/sicetac-al-instante-5000-consultas-decisions-openai/.

## Entrega

- Artículo: `_posts/2026-10-23-sicetac-al-instante-5000-consultas-decisions-openai.md`.
- URL pública: https://atiemppo.com/blog/sicetac-al-instante-5000-consultas-decisions-openai/
- Tres imágenes en `assets/images/blog/sicetac-decisions-5000/`: portada de campaña optimizada a JPEG y dos capturas reales PNG sin modificaciones.
- Fuentes, dimensiones y SHA-256 en `sources.json`.

## Criterio editorial

El logro de 5.000 consultas y 500 usuarios abre el artículo y motiva la actualización. Las cifras fueron aportadas por Juan; no se vuelve a consultar Supabase ni se infiere un periodo, empresas o usuarios únicos. Se explica qué hace Decisions API de OpenAI y se separa interpretación, validación y cálculo por el motor existente. Se incluyen ejemplos de ida/vuelta, contenedor cargado/vacío, horas por tramo, variantes y las mejoras derivadas de pruebas.

La fuente primaria es la guía oficial de Decisions, consultada el 23 de octubre. El contrato del producto se contrastó con la documentación de Instant 0.4.16 y puente 3.10.4. Las 333 pruebas se citan como evidencia técnica de aquella revisión; no se presentan como prueba de precisión global ni fueron ejecutadas otra vez por un cambio editorial. No se afirma equivalencia de velocidad, memoria de conversaciones, nuevas funciones de vías ni respaldo comercial de OpenAI.

CTA principal: consulta gratuita por WhatsApp al +57 313 450 3694. CTA secundario: artículo existente sobre portal/API/MCP, que conserva sus propias condiciones de acceso. Sin cambios de cuotas, secretos, motor, contactos, permisos o cuentas.

## Publicación autorizada y verificada

Juan autorizó «publícalo» el 23 de octubre de 2026. Se incorporaron los commits remotos existentes sin modificar sus contenidos. El artículo aprobado se integró en main y se publicó mediante GitHub Pages.

- Commit de contenido: `1f0ab8e2bb62b7983f2484cd90892063fcfd86ed` (el commit local previo e3f5c67 cambió de hash al rebasar sobre las actualizaciones remotas).
- Despliegue: [39960399613](https://github.com/imatjuanmatiz/atiemppo-web/actions/runs/39960399613), construcción y publicación completadas con éxito.
- Lectura pública verificada: 23 de octubre de 2026, 13:22 UTC / 08:22 Colombia.
- Siete lecturas HTTP 200: artículo, tres imágenes, índice del blog, portada y artículo relacionado.
- Las tres imágenes públicas coinciden por SHA-256 con los archivos aprobados. Canonical, Open Graph, título y destino de WhatsApp correctos; artículo enlazado desde blog y portada.
- Recibo en `publication.json`; comprobador reproducible `verify-public.py` (solo GET públicos, sin credenciales).

El artículo ajeno sin seguimiento _posts/2026-10-21-que-es-sicetac.md y las demás carpetas de trabajo se conservaron sin incluirlas en esta publicación. Este registro documental posterior no cambia el artículo ni sus imágenes.

## Validación local completada

- Jekyll 3.9 / Ruby 3.1.4: construcción correcta. Avisos previos del logger de Jekyll, sin errores de generación.
- Navegador Chrome aislado en 320, 390 y 1366 px: sin desbordamiento horizontal ni errores JavaScript; las tres imágenes cargan y coinciden con sus dimensiones declaradas.
- Título, canonical, Open Graph, fuente oficial y destino WhatsApp verificados. Los enlaces internos del artículo responden 200 en la vista previa.
- Artículo presente en el índice del blog y en las publicaciones de portada de la construcción local.
- Revisadas visualmente portada, flujo y CTA. Se corrigió el contraste del texto destacado en el CTA.
- `verification.json` conserva los resultados. `portada-1366.png`, `portada-390.png` y `flujo-1366.png` conservan vistas de revisión.

El navegador bloqueó recursos externos, incluidos los de tipografía; las capturas usan las fuentes de respaldo del sitio. No se probaron envíos de WhatsApp, llamadas pagadas ni cambios al sistema. Las capturas originales de WhatsApp son evidencia aportada por Juan. La vista previa no prueba publicación pública.

Para limitar el espacio temporal, `preview-config.yml` excluye reportes y otros entregables grandes en esta construcción de revisión (37 MB); no modifica `_config.yml` ni el futuro build público. El árbol local contiene otros documentos sin seguimiento preexistentes que no pertenecen a esta entrega.

### Reproducir

Desde la raíz del sitio, con Ruby 3.1.4 y Jekyll instalados:

```sh
JEKYLL_NO_BUNDLER_REQUIRE=1 RBENV_VERSION=3.1.4 rbenv exec jekyll build --config _config.yml,docs/sicetac-decisions-2026-10-23/preview-config.yml --destination /tmp/atiemppo-blog-decisions-preview
python3 -m http.server 4329 --bind 127.0.0.1 --directory /tmp/atiemppo-blog-decisions-preview
```

En otra terminal, con Playwright disponible en `NODE_PATH`:

```sh
node docs/sicetac-decisions-2026-10-23/verify-preview.cjs
```

`CHROME_PATH`, `ATICA_BLOG_QA_DIR` y `ATICA_BLOG_PREVIEW_URL` permiten ajustar navegador, carpeta de recibos y servidor; el verificador solo admite localhost/127.0.0.1. No instala dependencias ni navega a servicios externos.
