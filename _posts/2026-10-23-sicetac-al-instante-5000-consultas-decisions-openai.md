---
layout: post
title: "Superamos las 5.000 consultas: celebramos con una actualización de SICETAC al Instante"
description: "Más de 500 usuarios nos acompañan. Integramos la Decisions API de OpenAI para interpretar consultas más naturales por WhatsApp, con el mismo motor SICETAC."
date: 2026-10-23 00:00:00 -0500
display_date: "23 de octubre de 2026"
author: "ATIEMPPO S.A.S."
lab: "SICETAC al Instante"
tags: [sicetac, transporte-de-carga, logistica, whatsapp, openai, decisions-api]
image: /assets/images/blog/sicetac-decisions-5000/01-celebramos.jpg
permalink: /blog/sicetac-al-instante-5000-consultas-decisions-openai/
ai_content_declaration: ai-assisted
lang: es
portal_featured: true
---

<style>
.post-body .decisions-hero{max-width:650px;margin:0 auto 2.5rem}
.post-body .decisions-proof{max-width:620px;margin:2rem auto}
.post-body .decisions-hero img,.post-body .decisions-proof img{display:block;width:100%;height:auto}
.post-body .decisions-flow{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:2rem 0;padding:0;list-style:none;counter-reset:decisions-step}
.post-body .decisions-flow li{counter-increment:decisions-step;background:#eff6f3;border:1px solid #d9e8e2;border-radius:12px;padding:20px;margin:0;font-size:1rem;line-height:1.6}
.post-body .decisions-flow li::before{content:"0" counter(decisions-step);display:block;font-size:.8rem;font-weight:700;letter-spacing:.12em;color:#16796a;margin-bottom:8px}
.post-body .decisions-flow strong{display:block;margin-bottom:4px;color:#123c50}
.post-body .decisions-cta{padding:26px;background:#0b2f43;color:#fff;border-radius:14px;margin-top:2rem}
.post-body .decisions-cta p,.post-body .decisions-cta strong{color:#fff}.post-body .decisions-cta a{color:#a0f0db}
.post-body figcaption{text-align:left;max-width:none}.post-body p,.post-body li{overflow-wrap:anywhere}
@media(max-width:560px){.post-body .decisions-flow{grid-template-columns:1fr}.post-body .decisions-cta{padding:20px}}
</style>

**¡Superamos las 5.000 consultas y los 500 usuarios en SICETAC al Instante!** Gracias a quienes lo han utilizado para explorar una ruta, revisar una referencia de costos o estudiar las condiciones de un viaje. Celebramos este logro con una actualización que nace del uso de la herramienta: **ahora puedes describir tu consulta con más naturalidad en WhatsApp.**

Integramos la **Decisions API de OpenAI** para ayudar a interpretar solicitudes que reúnen varios datos: ciudades, vehículo, carrocería, contenedores, peso, horas logísticas e incluso una ida y un regreso en el mismo mensaje. El cálculo conserva nuestro motor SICETAC y sus reglas. La mejora está en cómo conectamos lo que escribes con la consulta que necesitas resolver.

<figure class="decisions-hero">
<img src="/assets/images/blog/sicetac-decisions-5000/01-celebramos.jpg" alt="SICETAC al Instante de ATIEMPPO celebra más de 5.000 consultas y 500 usuarios con una actualización para consultar con más naturalidad" width="1080" height="1080" fetchpriority="high" decoding="async">
<figcaption>Una actualización para celebrar el uso de SICETAC al Instante. Ilustración de campaña de ATIEMPPO.</figcaption>
</figure>

## Describe el viaje como lo piensas

En la operación, una pregunta puede incluir mucho más que un origen y un destino. Hay quien necesita mover un contenedor cargado y devolverlo vacío; otra persona quiere revisar un viaje circular o conocer cada sentido de un recorrido con determinadas horas logísticas.

Queremos que puedas expresar esas condiciones en una sola solicitud. Por ejemplo:

> Estoy organizando un despacho desde Buenaventura hasta Bogotá en un contenedor de 20 pies, cargado con 5.700 kg de mercancía. La tara del contenedor va adicional a ese peso. Después regresa con el contenedor vacío desde Bogotá hasta Buenaventura. Considera 6 horas logísticas por tramo. Necesito los valores SICETAC de cada sentido por separado y la configuración vehicular que corresponde.

Esta fue una de nuestras pruebas. La solicitud identifica dos trayectos y un cambio en el regreso. Ese detalle importa: **transportar un contenedor vacío y circular con el vehículo sin carga son condiciones distintas.** El sistema debe conservar esa diferencia al consultar el motor.

<figure class="decisions-proof">
<a href="/assets/images/blog/sicetac-decisions-5000/02-consulta-larga.png" target="_blank" rel="noopener" aria-label="Ampliar la prueba real de una consulta larga en WhatsApp"><img src="/assets/images/blog/sicetac-decisions-5000/02-consulta-larga.png" alt="Consulta real en WhatsApp: Buenaventura a Bogotá con contenedor de 20 pies cargado y regreso con contenedor vacío; respuestas separadas con 6 horas logísticas por tramo" width="629" height="713" loading="lazy" decoding="async"></a>
<figcaption>Captura real de una prueba en WhatsApp. El mensaje especifica carga en la ida y contenedor vacío en el regreso. Los resultados corresponden al escenario y al periodo 202610 mostrados.</figcaption>
</figure>

## Qué es la Decisions API de OpenAI

Una **API** es una interfaz que permite que dos programas se comuniquen. La Decisions API de OpenAI permite evaluar información y devolver respuestas estructuradas: elegir entre opciones definidas, evaluar una condición o asignar una puntuación según criterios establecidos. La documentación oficial presenta usos como clasificar contenido y dirigir solicitudes hacia la función adecuada. [Puedes consultar la explicación de OpenAI aquí.](https://developers.openai.com/api/docs/guides/decisions)

En nuestro caso, la utilizamos para ayudar a reconocer **qué operación está describiendo la persona**. Nuestro sistema prepara candidatos y preguntas concretas sobre el mensaje; Decisions devuelve elecciones que podemos validar y convertir en parámetros de consulta.

Así, una descripción como «ida y vuelta, contenedor de 20 pies cargado, seis horas logísticas» puede transformarse en dos solicitudes con origen, destino, configuración, carrocería, estado del contenedor y horas. Cada dato pasa por nuestras reglas y catálogos antes de llegar al motor.

**Los importes los obtiene nuestro motor SICETAC.** Decisions participa en la interpretación de la solicitud; la aplicación valida los parámetros, ejecuta las consultas y presenta sus resultados con el periodo y las condiciones utilizadas.

## Cómo la implementamos en SICETAC al Instante

La actualización se incorpora a la misma línea de WhatsApp que ya utilizan nuestros usuarios. Conservamos el flujo de las consultas simples y añadimos esta capacidad para interpretar solicitudes más completas.

<ol class="decisions-flow">
<li><strong>Recibimos tu descripción</strong>Leemos los datos del mensaje actual: recorrido, vehículo y condiciones del viaje.</li>
<li><strong>Interpretamos la solicitud</strong>Decisions ayuda a identificar opciones dentro de los candidatos preparados por el sistema.</li>
<li><strong>Validamos y consultamos</strong>Contrastamos los parámetros con las reglas y catálogos, y consultamos el motor por cada trayecto.</li>
<li><strong>Presentamos cada resultado</strong>Mostramos la ruta, configuración, horas, valor y periodo; las variantes quedan disponibles cuando existen.</li>
</ol>

Esta separación nos permite mejorar la interpretación conservando el procedimiento de cálculo. También nos ayuda a identificar dónde ocurrió una dificultad: al reconocer un municipio, distinguir una configuración, interpretar el regreso o encontrar una referencia disponible.

Cada consulta se interpreta con **el contenido de ese mensaje**, sin recordar una ruta anterior para completar la siguiente. Incluye en tu nueva solicitud las condiciones que quieras utilizar. Los botones de la respuesta llevan los parámetros necesarios para consultar sus opciones.

## Implementar también significa probar y mejorar

Durante las pruebas encontramos un caso que nos ayudó a refinar la experiencia. Una solicitud de ida y vuelta podía detenerse a preguntar por el estado de carga del regreso, aunque la persona había descrito el viaje con una misma configuración. Esa aclaración interrumpía una consulta que podía resolverse mostrando los supuestos.

Ajustamos el comportamiento: **si no indicas cambios, los demás trayectos utilizan la configuración del primero**. Una sola cifra de horas logísticas se aplica por tramo y se informa en la respuesta. Cuando expresas un cambio, como regresar con el contenedor vacío, ese cambio prevalece. Si hay datos contradictorios o una ambigüedad que afecta el resultado, el sistema solicita la aclaración correspondiente.

También mejoramos la presentación. Ahora mostramos primero la **ruta principal**, con su valor, y ofrecemos **«Ver otras variantes»** cuando hay más recorridos disponibles. En los casos aplicables, aparece una opción para revisar el regreso con **«Contenedor vacío»** o **«Regreso sin carga»**. La alternativa se consulta al seleccionarla.

<figure class="decisions-proof">
<a href="/assets/images/blog/sicetac-decisions-5000/03-ida-vuelta-y-variantes.png" target="_blank" rel="noopener" aria-label="Ampliar la prueba real de ida y vuelta con botones de variantes"><img src="/assets/images/blog/sicetac-decisions-5000/03-ida-vuelta-y-variantes.png" alt="Prueba real Buenaventura–Bogotá y Bogotá–Buenaventura, ambos C2S2 con contenedor cargado y 6 horas: valores SICETAC de 3.217.526 y 3.338.401 pesos; botones Ver otras variantes y Contenedor vacío" width="634" height="830" loading="lazy" decoding="async"></a>
<figcaption>Prueba real con la misma configuración en ambos sentidos: C2S2, contenedor cargado y 6 horas por tramo. Se ven los botones para ampliar variantes y consultar la alternativa de contenedor vacío. Referencias del periodo 202610; los importes dependen de esas condiciones.</figcaption>
</figure>

La revisión técnica incluyó **333 pruebas automatizadas** entre el servicio de interpretación, su conexión y el puente de WhatsApp. Complementamos esas comprobaciones con consultas reales al clasificador y al motor, y con las pruebas en WhatsApp que mostramos aquí. Cada tipo de prueba aporta evidencia distinta; seguimos revisando los casos que aparecen en el uso cotidiano.

El piloto también tiene controles de consumo y un interruptor para desactivar esta capa de interpretación. Si no está disponible, las consultas compatibles con el formato tradicional pueden seguir su flujo habitual. Así podemos evaluar la mejora y ajustar su funcionamiento de forma gradual.

## La herramienta mejora con las preguntas de quienes la usan

Las más de 5.000 consultas nos animan a continuar por este camino: facilitar el acceso a información útil de transporte y mejorar la forma de consultarla. Esta actualización atiende una necesidad concreta del servicio gratuito en WhatsApp y se suma al trabajo que venimos desarrollando en el portal ATIEMPPO.

Para quienes quieren profundizar, el portal reúne las capacidades de SICETAC al Instante y ATICA: consulta de información, organización de una red de transporte y conexiones autorizadas con agentes. En [este artículo explicamos cómo se relacionan el portal, la API y MCP](/blog/sicetac-al-instante-conectar-agente-ia/), con sus condiciones de acceso.

<div class="decisions-cta" markdown="1">

**Gracias por hacer parte de este logro. Prueba la actualización.**

Abre **[SICETAC al Instante en WhatsApp](https://wa.me/573134503694?text=Cotiza%20ida%20y%20vuelta%20desde%20Buenaventura%20hasta%20Bogot%C3%A1%2C%20C2S2%2C%20contenedor%20de%2020%20pies%20cargado%20y%206%20horas%20log%C3%ADsticas.)** y describe el recorrido, el vehículo y las condiciones que quieres consultar. La consulta por WhatsApp es gratuita.

**+57 313 450 3694** · Si encuentras una interpretación que podemos mejorar, cuéntanos qué preguntaste y qué esperabas obtener. Esa retroalimentación nos ayuda a seguir afinando la herramienta.

</div>
