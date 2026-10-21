# Criterios compartidos de la web ATIEMPPO

## Identidad

- Títulos: DM Serif Display, peso 400, caja natural y altura de línea 1,08.
- Texto, navegación y controles: Instrument Sans con alternativa del sistema.
- Tinta `#102c45`, fondo claro `#f7f7f4`, azul oscuro `#071e35`, acción principal `#246aaf`.
- Los títulos cambian según el contenido de cada página; mantienen familia, escala y separación coherentes.
- Encabezado y pie comunes se alimentan de `_data/navigation.yml`. El encabezado conserva nombres, orden y acceso a la cuenta gratuita; señala la sección activa.

## Implementación

`assets/css/site-foundation.css` se carga después de los estilos propios de cada página. Normaliza los componentes públicos sin cambiar las visualizaciones de los reportes individuales. Las páginas con el encabezado compartido pero sin esta hoja conservan la tipografía de respaldo definida en `navigation.css`.

`_includes/footer.html` contiene el pie bilingüe. `_includes/post-date.html` y `_includes/post-navigation.html` mantienen las fechas y la lectura de artículos en su idioma. Las relaciones históricas se declaran en `_data/translations.yml`; las publicaciones nuevas usan `translations` en su cabecera. No se debe deducir equivalencia únicamente por el nombre del archivo.

## Oferta y contenido

La oferta gratuita procede de `_data/portal_offer.yml`. Usar `portal-offer.html` en las páginas, `portal-offer-data.html` para las pestañas y `portal-news.html` para la selección de publicaciones. Marcar expresamente con `portal_featured: true` los artículos seleccionados en ambos idiomas.

Mantener claros los límites de las 10 combinaciones de ATICA y los cupos propios de SICETAC al Instante. Las condiciones temporales pertenecen al portal o a artículos fechados. No deben convertirse en una promesa permanente de la portada.

La versión inglesa debe indicar cuándo un destino o una captura está en español. Los reportes traducen su ficha de acceso sin alterar los datos ni presentar el documento original como una traducción completa.

## Comprobaciones al cambiar una página

- Un único título principal; controles con nombre y foco visible.
- CTA principal visible y correcto en escritorio y móvil.
- Menú móvil operable, contenido sin desbordamiento y espacio conservado al ocultar saltos de línea.
- Cambio de idioma hacia una equivalencia real; si no existe, el enlace identifica la portada del otro idioma.
- Oferta consistente antes y después de interactuar; condiciones y destinos centrales conservados.
- Enlaces, formularios y activos existentes preservados. Captura visual de las vistas modificadas.
