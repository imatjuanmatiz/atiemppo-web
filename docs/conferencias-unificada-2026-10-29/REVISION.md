# ATIEMPPO · Versión unificada de experiencias y conferencias

29 de octubre de 2026. Versión local para revisión; no desplegada.

## Criterio comercial

El objetivo es abrir conversaciones y captar consultas: portada con invitación a escribir, cuatro ofertas diferenciadas, un enlace de contacto en la navegación compartida y una página de contacto directa. El visitante puede empezar con una pregunta, aunque no tenga definido el formato o el proyecto.

Se integró la propuesta A «Posibilidades» de Bruno con los colores, las fuentes DM Serif Display e Instrument Sans, el encabezado y el pie compartidos de ATIEMPPO. Se reutiliza la fotografía pública del encuentro de COLFECAR en Cali, con contexto y enlace a la publicación original. No se presentan testimonios ni resultados comerciales inventados.

Las experiencias se presentan como alternativas independientes: sesión personalizada, acompañamiento a equipos, conferencias y workshop. Se utiliza SI/superinteligencia para la oferta propia de ATIEMPPO. Bruno OpenClaw participa en la experiencia guiada por Juan; la continuidad posterior requiere un alcance acordado.

## Fuentes revisadas

Chat «Preparar sección de conferencias ATIEMPPO», ID 01a16185-f87f-74e7-84d0-986949cf70e8, leído el 29 de octubre.

Materiales de Bruno bajo `/Users/atiemppoia/Documents/Codex/2026-10-21/task/`:

- `web-critica-20261028/revision/CRITICA-Y-RECOMENDACION.md`: crítica de la web y recomendación de la alternativa A; investigación de referentes usada como contexto, sin copiar sus sistemas visuales.
- `web-a-servicios-20261029/revision/fuentes-servicios.md`: alcance comercial y fuentes de las cuatro experiencias.
- `web-conjunta-20261029/entrega/ATIEMPPO-Web-Conjunta-Textos.md`: jerarquía y contenido de la propuesta conjunta.
- `web-conjunta-20261029/revision/PROPUESTA-CONJUNTA.md` y `revision/revision-editorial-independiente.md`: alcance, continuidad y pendientes.
- `web-conjunta-20261029/revision/jerarquia-y-conversion.md`: recorridos y criterios de contacto.

Se contrastaron en vivo la portada y `/conferencias/` de atiemppo.com. La sección de conferencias publicada enviaba principalmente al perfil personal de Juan; ahora la oferta y la consulta se resuelven dentro de ATIEMPPO.

## Recorrido implementado

| Ruta española | Equivalente en inglés | Función |
|---|---|---|
| `/` | `/en/` | Nueva apertura y cuatro experiencias; conserva portal, consultoría, datos y publicaciones |
| `/experiencias/` | `/en/experiencias/` | Elegir una experiencia y conocer el papel de Bruno |
| `/sesion-personalizada/` | `/en/sesion-personalizada/` | Práctica individual sobre una tarea propia |
| `/acompanamiento-ia/` | `/en/acompanamiento-ia/` | Caso, proceso, responsables y continuidad del equipo |
| `/conferencias/` | `/en/conferencias/` | Enfoques de negocio y datos; invitación a Juan |
| `/workshop/` | `/en/workshop/` | Seis preguntas, primera práctica y hoja de ruta |
| `/contacto/` | `/en/contacto/` | Escribir con el interés preseleccionado |

El contacto requiere solamente nombre, correo y mensaje. Empresa, teléfono e interés son opcionales. Los valores de los servicios, el receptor Google Apps Script y las redirecciones de confirmación originales se conservan. El formulario aparece también en la portada y utiliza el mismo componente/controlador. Cambiar de interés no sobrescribe el mensaje; cambiar de idioma en la página de contacto conserva el interés.

El formulario recibe los cuatro intereses existentes: `profe-bruno`, `acompanamiento-ia`, `conferencias` y `taller-equipo`. Se retiró la conversión automática que cambiaba `profe-bruno` por acompañamiento empresarial y confundía la consulta individual.

La prueba móvil detectó que el enlace al pie de la portada quedaba desplazado durante la carga de imágenes. Las nuevas llamadas a conversar y el encabezado/pie compartidos llevan directamente a `/contacto/`.

## Validación

- Jekyll 3.9 con Ruby 3.1.4: compilación completa correcta.
- `scripts/check-site-consistency.py`: 1.134 verificaciones, cero errores y cero enlaces/recursos faltantes en el contenido revisado.
- Comprobación adicional: 224 verificaciones de 14 páginas, enlaces internos y anclas, idiomas recíprocos, intereses de consulta, JSON-LD y receptor del formulario; cero fallos.
- Navegador: 28 combinaciones de página/ancho (390 y 1.440 px), más seis revisiones a 320 px. Sin desbordamiento horizontal; un H1 y un pie compartido en cada vista.
- Ocho recorridos reales desde el botón de cada servicio hasta el formulario, en ES y EN, con el interés y la ayuda correctos.
- Menú móvil, selección de interés, preservación del texto escrito y cambio de idioma con el interés conservado comprobados.
- JavaScript: comprobación de sintaxis correcta en los tres controladores editados.
- No se envió un formulario ni un correo de prueba. Estas verificaciones no acreditan entrega de mensajes al buzón ni captación real de leads.

Evidencias: `site-checks.json`, `journey-checks.json`, `browser-checks.json` y capturas de portada, conferencias y contacto en esta carpeta.

## Publicación y agenda

La versión está preparada en el repositorio local y en la vista previa `http://127.0.0.1:8766/`. No se hizo push ni despliegue durante esta integración.

No se publica como vigente la convocatoria de noviembre: fecha y horario siguen pendientes en la investigación. Tampoco se deriva tráfico a la inscripción antigua de agosto. El portal, el registro gratuito, los productos y las líneas de consultoría permanecen accesibles.

## Reproducir la vista previa

```sh
JEKYLL_NO_BUNDLER_REQUIRE=1 RBENV_VERSION=3.1.4 rbenv exec jekyll build --destination /private/tmp/atiemppo-unified-20261029
python3 scripts/check-site-consistency.py /private/tmp/atiemppo-unified-20261029
python3 -m http.server 8766 --bind 127.0.0.1 --directory /private/tmp/atiemppo-unified-20261029
```
