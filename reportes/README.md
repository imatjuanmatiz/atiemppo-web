# Reportes vivos de El Dato Logistico

Esta carpeta publica la biblioteca publica de reportes HTML en `atiemppo.com/reportes/`.

La newsletter cuenta la historia y envia trafico al link del reporte. El reporte principal debe ser HTML navegable; cualquier PDF debe quedar como respaldo, no como experiencia principal.

## Arquitectura

Este repositorio no usa `public/`, `pages/`, `app/`, `src/routes` ni otro sistema de rutas de framework. Es un sitio Jekyll/static servido desde la raiz del repositorio. Por eso la estructura vive directamente en `reportes/` para conservar las URLs publicas `/reportes/...`.

No crear `public/reportes/` en este repo: en GitHub Pages eso publicaria las rutas como `/public/reportes/`, que no es lo que buscamos.

```text
reportes/
  index.html
  indice-sicetac-capitales/
    index.html
    2026-05/
      index.html
  seguimiento-acpm-sicetac/
    index.html
  impacto-horas-sicetac/
    index.html
  perfil-rutas-sicetac/
    index.html
    2026-04/
      index.html
```

## Rutas vivas

Estas rutas muestran siempre la version mas actualizada:

- `/reportes/indice-sicetac-capitales/`
- `/reportes/seguimiento-acpm-sicetac/`
- `/reportes/perfil-rutas-sicetac/`
- `/reportes/impacto-horas-sicetac/`

## Snapshots historicos

Estas rutas preservan cortes publicados cuando sea necesario:

- `/reportes/indice-sicetac-capitales/2026-05/`
- `/reportes/perfil-rutas-sicetac/2026-04/`

## Como actualizar un reporte

1. Genera un HTML autocontenido desde el proyecto/script externo.
2. Reemplaza el `index.html` de la ruta viva correspondiente.
3. Si quieres congelar un corte, copia ese mismo HTML a una carpeta `YYYY-MM/`.
4. Actualiza `_data/reportes.yml` para cambiar titulo, descripcion, fecha, categoria, estado o URL visible en la biblioteca.

## Metadata de la biblioteca

La pagina `/reportes/` no depende del front matter de cada reporte. Lee las tarjetas desde:

```text
_data/reportes.yml
```

Esto permite pegar reportes HTML completos sin romper el indice.
