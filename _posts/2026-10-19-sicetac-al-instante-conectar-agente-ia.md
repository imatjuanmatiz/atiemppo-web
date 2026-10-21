---
layout: post
title: "SICETAC al Instante: así conectamos los datos de transporte con tu agente de IA"
description: "Conectamos los datos de transporte con tus agentes de IA. Conoce ATICA, SICETAC al Instante y el paso a paso para usar MCP, el portal y la API."
date: 2026-10-19 12:00:00 -0500
display_date: "19 de octubre de 2026"
author: "ATIEMPPO S.A.S."
lab: "SICETAC al Instante"
tags: [sicetac, atica, mcp, agentes-ia, claude, grok-bot, openclaw, bruno]
image: /assets/images/blog/sicetac-al-instante-mcp/01-portada-sicetac.jpg
permalink: /blog/sicetac-al-instante-conectar-agente-ia/
ai_content_declaration: ai-assisted
lang: es
translations:
  es: /blog/sicetac-al-instante-conectar-agente-ia/
  en: /en/blog/sicetac-al-instante-conectar-agente-ia/
portal_featured: true
---

<style>
.post-body table{display:block;max-width:100%;overflow-x:auto;border-collapse:collapse;margin:1.5rem 0;font-size:.92rem;line-height:1.55}
.post-body th,.post-body td{padding:12px;border:1px solid #d7e2e5;vertical-align:top;text-align:left;min-width:135px}
.post-body th{background:#eaf3ef}.post-body pre{white-space:pre-wrap;overflow-wrap:anywhere}.post-body pre code{white-space:pre-wrap;overflow-wrap:anywhere}
.post-body p,.post-body li,.post-body td{overflow-wrap:anywhere}.post-body figure img{height:auto;cursor:zoom-in}.post-body figcaption{text-align:left;max-width:none}
</style>

**En ATIEMPPO estamos desarrollando herramientas para que las personas, las empresas y sus agentes de inteligencia artificial puedan consultar y utilizar información logística en su trabajo diario. Con ATICA y SICETAC al Instante damos un paso en esa dirección y te contamos cómo empezar.**

*Artículo preparado el 19 de octubre de 2026. Las condiciones de lanzamiento y el estado de las conexiones corresponden a esa fecha.*

En **ATIEMPPO** venimos trabajando para ampliar las posibilidades de uso de los datos que generamos, organizamos y analizamos. Nuestro interés es que esa información acompañe decisiones concretas de la operación: estudiar un recorrido, comparar escenarios, entender la composición de un costo o revisar los valores de una red de transporte. **SICETAC al Instante** es uno de los proyectos que hemos desarrollado con ese propósito y que hoy queremos poner al alcance de más personas.

Este trabajo coincide con una convicción que orienta nuestros desarrollos: los agentes de inteligencia artificial tendrán cada vez más utilidad a medida que podamos darles acceso autorizado a herramientas y fuentes de información especializadas. Pensamos tanto en los asistentes que ya utilizamos como en aquellos que cada persona o empresa está creando para resolver sus propias necesidades. Queremos contribuir a que esos agentes puedan realizar tareas más completas, consultar información verificable y utilizar un motor de cálculo cuando la pregunta lo requiera.

Por eso estamos construyendo servicios que se pueden utilizar desde nuestro portal e integrar con sistemas y agentes de IA. Buscamos que una misma capacidad pueda acompañarte en distintos entornos de trabajo, conservando la identificación de las fuentes, los parámetros de cada consulta y los permisos de tu cuenta. En ese camino hemos desarrollado **ATICA** y **SICETAC al Instante**, dos servicios que comparten el ingreso a ATIEMPPO y atienden necesidades diferentes de la operación.

## Qué estamos construyendo con ATICA y SICETAC al Instante

Con **ATICA** te ofrecemos un espacio para organizar y analizar tu red de transporte, guardar rutas e incorporar valores propios. La cuenta gratuita permite comenzar con una red personal de hasta **10 rutas activas**; el trabajo con información empresarial y la ampliación de capacidades tienen sus propios permisos y condiciones. Desde allí queremos facilitar el paso entre consultar información general y trabajar sobre las características de tu operación.

Con **SICETAC al Instante** ponemos a tu disposición la consulta de referencias SICETAC publicadas y el cálculo de escenarios con nuestro motor de costos. Puedes explorar las rutas del catálogo, revisar configuraciones vehiculares y carrocerías, ajustar las horas logísticas o solicitar el desglose de una ruta existente. También ofrecemos un modo manual para estudiar recorridos fuera del catálogo, siempre que aportes las distancias por terreno y los peajes necesarios para calcularlos.

Hemos definido los accesos de cada servicio para que puedas conectar estas herramientas con tranquilidad. Cuando autorizas a un agente para utilizar SICETAC al Instante, le permites consultar sus catálogos, referencias, cálculos, documentación y consumo personal. La información privada de las empresas en ATICA conserva su administración y sus permisos propios.

## Cómo se relacionan el portal, la API y MCP

En nuestro **portal ATIEMPPO** reunimos el ingreso a la cuenta y la administración de los accesos. Allí puedes entrar a tu red de ATICA, revisar el saldo de SICETAC al Instante, gestionar claves API y consultar o revocar las conexiones que hayas autorizado. Hemos unificado la habilitación gratuita para que puedas comenzar por cualquiera de los dos servicios con la misma cuenta.

Para quienes desean incorporar estas capacidades a sus propios desarrollos, ofrecemos una **API**, que permite a un programa o sistema comunicarse con el servicio. Para los agentes de inteligencia artificial, habilitamos una conexión mediante **MCP**, con la que pueden conocer y utilizar las herramientas disponibles. En SICETAC al Instante, las consultas realizadas por API y por agentes se descuentan del mismo cupo personal.

<figure>
<a href="/assets/images/blog/sicetac-al-instante-mcp/01-portada-sicetac.jpg" target="_blank" rel="noopener" aria-label="Ampliar: Portada pública de SICETAC al Instante"><img src="/assets/images/blog/sicetac-al-instante-mcp/01-portada-sicetac.jpg" alt="Portada pública de SICETAC al Instante" width="1265" height="712" loading="lazy" decoding="async"></a>
<figcaption>En la portada de nuestro servicio reunimos las modalidades de consulta y las condiciones de lanzamiento. Captura del 19 de octubre de 2026.</figcaption>
</figure>

## Qué significa conectar tu agente mediante MCP

**MCP significa Model Context Protocol**, o Protocolo de Contexto del Modelo. Es un estándar que permite conectar un agente de IA con herramientas y fuentes de información externas. A través de esa conexión, nuestro servicio le comunica qué funciones puede utilizar, qué datos necesita cada una y qué resultados puede obtener.

En la práctica, puedes pedirle a tu agente que consulte una ruta, revise una referencia publicada o solicite al motor el desglose de un costo. Una instrucción como **«Consulta Bogotá–Barranquilla y muéstrame el desglose con seis horas logísticas»** puede llevarlo a identificar el recorrido, pedirte que elijas una variante cuando corresponda y utilizar las herramientas que hayas autorizado para resolver la consulta.

Hemos diseñado este proceso para que cada respuesta permita reconocer **su procedencia, el período consultado, los parámetros utilizados y sus limitaciones**. Distinguimos las referencias SICETAC publicadas de los resultados de nuestro modelo, incluso cuando ambos corresponden a una ruta del catálogo. Los valores se expresan por viaje en pesos colombianos y tienen un alcance técnico; la contratación del transporte y la disponibilidad de vehículos requieren su gestión correspondiente.

Con estas herramientas puedes trabajar sobre varias preguntas de la operación:

| Lo que necesitas resolver | Lo que puedes consultar con nuestro servicio |
| --- | --- |
| Identificar un recorrido | Municipios de origen y destino, rutas del catálogo y sus variantes. |
| Definir el vehículo | Configuraciones vehiculares, carrocerías y condición de carga disponibles. |
| Revisar una referencia | Referencia SICETAC publicada para un período, con las horas logísticas utilizadas. |
| Entender la composición del costo | Desglose del modelo para una ruta existente, con combustible, peajes y los demás componentes que devuelva el motor. |
| Estudiar un recorrido fuera del catálogo | Escenario manual con las distancias por terreno y los peajes que aportes. |
| Seguir el consumo | Saldo y actividad de tu cuenta, con la atribución disponible por agente o clave. |

A continuación te acompañamos en el registro, la conexión del agente y la primera consulta. Puedes comenzar desde **[nuestro portal de SICETAC al Instante](https://clientes.atiemppo.com/sicetac-al-instante)**.

## Paso 1. Entra a tu cuenta ATIEMPPO

Hemos dispuesto un ingreso común para que puedas utilizar los servicios gratuitos sin presentar un formulario empresarial ni registrar una tarjeta. Si ya tienes una cuenta ATIEMPPO, puedes conservarla; si estás comenzando, el mismo portal te permite crearla y confirmar tu identidad.

1. Abre **[clientes.atiemppo.com/sicetac-al-instante](https://clientes.atiemppo.com/sicetac-al-instante)** e inicia sesión o elige crear tu cuenta gratuita.
2. Completa la verificación de identidad. Si utilizas correo y contraseña, confirma el correo de registro.
3. Revisa las condiciones del servicio y el tratamiento de datos. Si aparece **«Habilitar mi cuenta gratuita»**, completa esa aceptación una sola vez.
4. Entra a **SICETAC al Instante** y revisa el saldo disponible antes de conectar tu agente.

Con esa habilitación incluimos el acceso a **ATICA con una red personal de hasta 10 rutas activas** y a **SICETAC al Instante, API y MCP**, con el beneficio de consultas vigente. Las rutas que guardas en tu red y las consultas de costo se administran como capacidades distintas; la autorización de cada agente se realiza después, con tu propia cuenta.

<figure>
<a href="/assets/images/blog/sicetac-al-instante-mcp/02-registro-cuenta-gratuita.png" target="_blank" rel="noopener" aria-label="Ampliar: Formulario de cuenta gratuita ATIEMPPO"><img src="/assets/images/blog/sicetac-al-instante-mcp/02-registro-cuenta-gratuita.png" alt="Formulario de cuenta gratuita ATIEMPPO" width="1280" height="720" loading="lazy" decoding="async"></a>
<figcaption>Nuestro formulario de registro permite comenzar con una cuenta común para ATICA y SICETAC al Instante. Captura del 19 de octubre de 2026.</figcaption>
</figure>

### Las condiciones de nuestro lanzamiento en octubre

Para las personas que activen por primera vez SICETAC al Instante durante **octubre de 2026**, ofrecemos **hasta 100 consultas exitosas en total**, que pueden utilizarse hasta el **31 de octubre de 2026, hora de Bogotá**. La promoción termina el **1 de noviembre a las 00:00 de Bogotá**, sin reposición ni cobros automáticos.

Compartimos ese cupo entre todos los agentes y las integraciones API de cada usuario. Descontamos una consulta cuando obtienes una referencia o un cálculo exitoso, y otra si solicitas una repetición o un nuevo cálculo. Las consultas de catálogos, documentación y saldo, así como las aclaraciones y los errores, conservan el saldo. Desde el portal puedes revisar las unidades disponibles y su vigencia.

El acceso que ofrecemos desde ATIEMPPO funciona con las condiciones de uso de la plataforma de IA que elijas. La suscripción o el consumo de ese proveedor se gestionan por separado.

<figure>
<a href="/assets/images/blog/sicetac-al-instante-mcp/03-panel-cupo-y-mcp.jpg" target="_blank" rel="noopener" aria-label="Ampliar: Saldo inicial y dirección MCP en el portal"><img src="/assets/images/blog/sicetac-al-instante-mcp/03-panel-cupo-y-mcp.jpg" alt="Saldo inicial y dirección MCP en el portal" width="1007" height="870" loading="lazy" decoding="async"></a>
<figcaption>Así presentamos el saldo y la dirección de conexión en una cuenta nueva con 100 consultas disponibles. Captura del 19 de octubre de 2026, con el encabezado personal excluido.</figcaption>
</figure>

## Paso 2. Elige el agente que quieres conectar

La dirección de nuestro servidor MCP es la misma para las integraciones de SICETAC al Instante:

```text
https://sicetac-al-instante-atiemppo.vercel.app/mcp
```

Reunimos a continuación las opciones de conexión y el estado de las pruebas que hemos realizado. La configuración de cada entorno depende del producto, de los permisos de la organización y de las condiciones de su proveedor.

| Servicio | Conexión y estado de nuestras pruebas |
| --- | --- |
| **Claude web** | Ejecutamos consultas reales mediante un conector personalizado remoto con OAuth. Más adelante te mostramos cómo configurarlo. |
| **Claude Code** | Probamos una conexión MCP con OAuth propio, que requiere su configuración técnica y el cliente registrado correspondiente. |
| **Grok Bot** | Probamos un MCP remoto con OAuth en una instalación de la aplicación. Cada persona debe conectar y autorizar su cuenta. |
| **OpenClaw / nuestro Bruno** | Bruno es nuestro asistente desarrollado sobre OpenClaw. Para incorporar SICETAC al Instante en este entorno se configura el acceso a sus herramientas MCP o a la API, con las credenciales y los permisos de la integración. |
| **OpenAI / Codex** | Completamos OAuth y comprobamos las herramientas en una conexión de prueba. Al 19 de octubre, el complemento 0.4.5 continúa **en revisión**, con publicación pendiente en el directorio. |
| **Aplicación o agente propio** | Ofrecemos API HTTP y MCP con clave personal, o con un cliente OAuth registrado para la integración. Su incorporación requiere desarrollo técnico. |

En esta guía documentamos la experiencia que hemos probado en **Grok Bot**. La conexión en Grok web tiene su propio recorrido y queda fuera de esa comprobación. Del mismo modo, cada instalación necesita completar su autorización antes de utilizar las herramientas.

## Paso 3A. Conecta SICETAC al Instante en Claude

Para Claude web hemos registrado un cliente OAuth específico que permite iniciar la autorización en nuestro portal. Puedes utilizarlo al crear el conector personalizado y mantener el control de cuándo Claude ejecuta cada herramienta.

1. Entra a [Claude → Personalización → Conectores](https://claude.ai/customize/connectors) y elige **Añadir → Añadir conector personalizado**. Si SICETAC al Instante ya aparece en **Tus conectores**, abre la conexión existente.
2. Escribe **SICETAC al Instante** como nombre, pega la dirección MCP anterior y pulsa **Continuar**.
3. En autenticación, selecciona **Iniciar sesión ahora / Sign in now** y **Usar tu propio cliente OAuth / Use your own OAuth client**. Introduce este identificador público de Claude web y deja vacío el secreto de cliente:

   ```text
   5f308b2b-b0bf-45a1-a3e2-3cf6d0d70c49
   ```

4. Completa **Añadir → Conectar** según la pantalla. Cuando se abra nuestro portal, entra con tu cuenta ATIEMPPO y revisa los permisos antes de autorizar.
5. Regresa a Claude y habilita SICETAC al Instante en los conectores de una conversación nueva. Para comenzar, puedes conservar la opción de aprobación por herramienta.

El identificador anterior corresponde a la aplicación Claude web y es público; tu autorización personal es la que habilita el acceso a la cuenta. Hemos registrado clientes diferentes para los demás productos, por lo que debes conservar el identificador correspondiente a cada integración.

<figure>
<a href="/assets/images/blog/sicetac-al-instante-mcp/04-claude-url-mcp.jpg" target="_blank" rel="noopener" aria-label="Ampliar: Nombre y URL en el formulario de Claude"><img src="/assets/images/blog/sicetac-al-instante-mcp/04-claude-url-mcp.jpg" alt="Nombre y URL en el formulario de Claude" width="560" height="495" loading="lazy" decoding="async"></a>
<figcaption>Preparamos este formulario para mostrarte dónde escribir el nombre y la URL de nuestro servidor. Captura del 19 de octubre de 2026; salimos del formulario sin guardar una conexión duplicada.</figcaption>
</figure>

<figure>
<a href="/assets/images/blog/sicetac-al-instante-mcp/05-claude-conector-activo.jpg" target="_blank" rel="noopener" aria-label="Ampliar: Conector existente de SICETAC al Instante en Claude"><img src="/assets/images/blog/sicetac-al-instante-mcp/05-claude-conector-activo.jpg" alt="Conector existente de SICETAC al Instante en Claude" width="1010" height="745" loading="lazy" decoding="async"></a>
<figcaption>En nuestra instalación de prueba, Claude presenta nueve herramientas de SICETAC al Instante y conserva la aprobación por herramienta. Captura del 19 de octubre de 2026.</figcaption>
</figure>

Durante el ingreso, escribes tu contraseña en nuestro portal y el agente recibe una autorización que puedes revocar. Si tu organización administra los conectores de Claude, su administrador debe permitir la incorporación. Cuando una solicitud de autorización haya vencido, puedes regresar al agente y pulsar **Conectar** para iniciar una nueva.

## Paso 3B. Conecta SICETAC al Instante en Grok Bot

En la instalación que probamos, agregamos el servidor desde un bot personal y completamos la autorización con la cuenta ATIEMPPO. Puedes comenzar con esta instrucción, que reúne los datos públicos de configuración:

```text
Agrega un servidor MCP remoto llamado SICETAC al Instante.
URL: https://sicetac-al-instante-atiemppo.vercel.app/mcp
Transporte: Streamable HTTP.
Autenticación: OAuth.
Cliente público de Grok Bot: 1be6a88a-2530-402c-a751-40b331c0fb28
Scope: email.
Abre la autorización para que yo inicie sesión en ATIEMPPO.
Todavía no calcules ninguna ruta.
```

Después abre la tarjeta de autorización que presente la aplicación, entra a nuestro portal y revisa los permisos. Al regresar al bot podrás comprobar el acceso consultando tu saldo, como mostramos en el siguiente paso.

Hemos registrado ese cliente para el retorno OAuth de la instalación de Grok Bot que probamos. Si tu versión presenta un recorrido diferente o no permite completar la configuración, puedes [contactarnos en Soporte ATIEMPPO](https://atiemppo.com/soporte/) para revisar la integración y su retorno antes de autorizarla.

## Cómo avanzamos con OpenAI

También estamos trabajando en la publicación de SICETAC al Instante en OpenAI. Ya completamos la autorización OAuth y el descubrimiento de herramientas en una conexión de prueba, y al **19 de octubre de 2026** nuestro complemento **0.4.5 continúa en revisión para publicación**. Incorporaremos el enlace a la ficha pública y su recorrido de instalación cuando estén disponibles.

Mientras avanzamos en ese proceso, podemos acompañarte en una prueba asistida desde el producto OpenAI que utilices. Para hacerlo necesitamos configurar su cliente y retorno específicos, tras lo cual podrás autorizar la conexión con tu misma cuenta ATIEMPPO. Puedes [solicitar ese acompañamiento a nuestro equipo](https://atiemppo.com/soporte/). La fecha de aprobación depende de OpenAI y permanece pendiente.

## Paso 4. Comprueba el acceso y consulta tu primera ruta

Te recomendamos comenzar con una lectura de cuota y documentación, que permite verificar la conexión conservando el saldo. Puedes pedirle al agente:

> Usa SICETAC al Instante para consultar mi cuota y la documentación. Confirma que la conexión responde. No calcules todavía ninguna ruta.

Una vez comprobado el acceso, puedes pasar a una referencia publicada. Esta instrucción también le indica al agente cómo resolver una posible ambigüedad del recorrido:

> Consulta la referencia SICETAC publicada de Bogotá a Barranquilla con el perfil inicial y el último período disponible en el servidor. Si hay varias variantes, muéstramelas para elegir antes de calcular. Presenta primero la ruta y el valor; después la fuente, el período, los parámetros y las limitaciones.

Para facilitar el inicio, hemos definido un perfil con **C3S3, cargado, carga general, carrocería estacas y cuatro horas logísticas**, que aplicamos únicamente a los parámetros que omitas. Cuando dejas el mes sin indicar, seleccionamos el último período disponible en la fuente del servidor y lo mostramos en el resultado. Si solicitas un período específico, lo respetamos; cuando ese corte falta, lo informamos conservando tu solicitud.

<figure>
<a href="/assets/images/blog/sicetac-al-instante-mcp/06-claude-resultado-real.jpg" target="_blank" rel="noopener" aria-label="Ampliar: Consulta real desde Claude"><img src="/assets/images/blog/sicetac-al-instante-mcp/06-claude-resultado-real.jpg" alt="Consulta real desde Claude" width="960" height="700" loading="lazy" decoding="async"></a>
<figcaption>En nuestra prueba de Claude del 17 de octubre de 2026 consultamos Bogotá → Barranquilla, ruta 93, período 202610, C3S3 cargado, general–estacas y cuatro horas logísticas. Obtuvimos una referencia de COP 7.821.531 por viaje. La imagen conserva el resultado de ese escenario; una consulta posterior depende del período y los parámetros que confirme el servidor.</figcaption>
</figure>

A partir de la referencia puedes explorar el costo con nuestro modelo, conservando los datos del recorrido y cambiando el supuesto que te interesa estudiar:

> Para la misma ruta y variante, calcula el desglose del modelo con seis horas logísticas. Usa el mismo período y conserva los demás parámetros. Muestra los componentes del costo y señala que es un cálculo del modelo.

Si necesitas trabajar sobre un recorrido fuera del catálogo, puedes solicitar el modo manual y completar sus datos de forma progresiva:

> Quiero calcular una ruta manual con SICETAC al Instante. Indícame las distancias por terreno y los peajes que necesitas. Conserva los parámetros que ya te proporcione y pide solo los datos faltantes antes de calcular.

En el modo manual calculamos con los datos aportados para el escenario, por lo que necesitamos las distancias por terreno y los peajes antes de ejecutar el motor. Identificamos el resultado como un cálculo del modelo y descontamos una consulta cuando termina con éxito, al igual que en los demás escenarios de cálculo.

<figure>
<a href="/assets/images/blog/sicetac-al-instante-mcp/07-grok-resultado-real.jpg" target="_blank" rel="noopener" aria-label="Ampliar: Consulta real de Grok Bot con variante elegida por el usuario"><img src="/assets/images/blog/sicetac-al-instante-mcp/07-grok-resultado-real.jpg" alt="Consulta real de Grok Bot con variante elegida por el usuario" width="1000" height="480" loading="lazy" decoding="async"></a>
<figcaption>En nuestra prueba de Grok Bot del 17 de octubre de 2026 elegimos la ruta 154 de Buenaventura → Bogotá y consultamos C2S2 cargado, general–estacas, cuatro horas logísticas y período 202610. La referencia fue COP 3.102.518 por viaje. La captura muestra la elección de variante que precedió al resultado y conserva las condiciones de esa prueba histórica.</figcaption>
</figure>

## Cómo integrar estas capacidades con tu propio sistema

Si estás desarrollando una aplicación o un agente, ponemos a tu disposición la documentación [OpenAPI](https://sicetac-al-instante-atiemppo.vercel.app/openapi.json) y nuestra [guía para agentes](https://sicetac-al-instante-atiemppo.vercel.app/llms.txt). Desde **Mis claves API**, en el portal, puedes crear una clave con nombre, permisos y vencimiento para la integración que necesites; sus consultas comparten el cupo de tu cuenta.

La API utiliza autenticación Bearer. Te recomendamos guardar la clave en el almacén de secretos de tu aplicación y mantenerla fuera de conversaciones y archivos públicos. Para las conexiones OAuth registramos cada cliente de SICETAC al Instante con su retorno exacto, por lo que una integración nueva requiere [coordinar esa configuración con nuestro equipo](https://atiemppo.com/soporte/).

## Cómo puedes revisar y administrar tu consumo

En **Actividad de mis consultas** reunimos las solicitudes, los cálculos exitosos, las aclaraciones y los errores de tu cuenta, con la atribución disponible por agente o clave. Allí puedes comparar la actividad con las consultas descontadas; cuando una solicitud carece de identificación verificable del agente, conservamos esa condición en el seguimiento.

Desde el mismo portal puedes revocar conexiones y claves, revisar el saldo o continuar trabajando en tu red de ATICA. Con esta primera versión queremos que puedas probar cómo se incorporan las referencias y el cálculo de costos a tu forma de trabajar, y que esa experiencia nos ayude a desarrollar capacidades útiles para la operación.

Te invitamos a **[entrar a SICETAC al Instante y conectar tu agente](https://clientes.atiemppo.com/sicetac-al-instante)**. Si necesitas acompañamiento durante la configuración, puedes comunicarte con nosotros a través de [Soporte ATIEMPPO](https://atiemppo.com/soporte/).

[Términos de SICETAC al Instante](https://atiemppo.com/legal/terminos/sicetac-al-instante/) · [Tratamiento de datos personales](https://clientes.atiemppo.com/privacidad)

### Fuentes y fecha de comprobación

Para preparar esta guía utilizamos la documentación de nuestro servicio, las comprobaciones del portal y las pruebas de conexión descritas en los pies de foto. También consultamos las guías oficiales de los proveedores:

- ATIEMPPO: [portal](https://clientes.atiemppo.com/sicetac-al-instante), [portada del servicio](https://sicetac-al-instante-atiemppo.vercel.app/), [OpenAPI](https://sicetac-al-instante-atiemppo.vercel.app/openapi.json) y [guía para agentes](https://sicetac-al-instante-atiemppo.vercel.app/llms.txt), revisados el 19 de octubre de 2026.
- Anthropic: [conectores personalizados mediante MCP remoto](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp), consultado el 19 de octubre de 2026. El cliente público específico de SICETAC al Instante corresponde a nuestra configuración para Claude web.
- xAI: [configuración de bots y conexiones](https://docs.x.ai/grok-bot/team-bots) y [herramientas MCP remotas de la API](https://docs.x.ai/developers/tools/remote-mcp), consultadas el 19 de octubre de 2026. Documentamos por separado la prueba nativa de Grok Bot y las posibilidades de integración por API.
- OpenAI: [envío, revisión y publicación de complementos](https://developers.openai.com/plugins/deploy/submission). Comprobamos la ficha de ATIEMPPO el 19 de octubre: versión 0.4.5 en revisión, MCP configurado y publicación pendiente.
