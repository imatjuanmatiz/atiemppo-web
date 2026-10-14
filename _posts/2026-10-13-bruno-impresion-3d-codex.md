---
title: "Le pasé las fotos de Bruno a la IA y terminé imprimiéndolo en 3D"
subtitle: "Una impresora en casa, unas fotos de mi perro y una prueba para ver cuánto podía resolver Codex con pocas instrucciones"
author: "Juan Pablo Matiz"
slug: "bruno-impresion-3d-codex"
excerpt: "Le pasé a Codex las fotos de mi perro y fui diciendo qué me gustaba. Así pasamos de los primeros modelos a una figura de Bruno impresa en 3D."
layout: post
description: "Le pasé a Codex las fotos de mi perro y fui diciendo qué me gustaba. Así pasamos de los primeros modelos a una figura de Bruno impresa en 3D."
published: true
lab: "ATIEMPPO Lab"
emoji: "🐾"
tags: [inteligencia-artificial, codex, impresion-3d, bruno, atiemppo-lab]
permalink: /blog/bruno-impresion-3d-codex/
image: /assets/images/blog/bruno-impresion-3d-codex/imagen5.png
translations:
  es: /blog/bruno-impresion-3d-codex/
  en: /en/blog/bruno-3d-print-codex/
---

<style>
.post-body .bruno-figure{margin:2rem auto;max-width:100%}.post-body .bruno-figure img{display:block;width:100%;height:auto;margin:0 0 .6rem}.post-body .bruno-subtitle{font-size:1.1rem;color:#3a4a5a;line-height:1.65;margin-bottom:2rem}
</style>

<p class="bruno-subtitle"><em>{{ page.subtitle }}</em></p>

Este lunes festivo me puse a jugar con la IA. Tenía una impresora 3D en casa y quería aprovecharla, así que empecé por pedirle a Codex que preparara el computador con los programas necesarios para trabajar juntos. Después le pasé unas fotos de Bruno, mi perro, y le pedí hacer un modelo para imprimirlo.

La idea era probar cuánto podía resolver con pocas instrucciones. Yo quería dedicarle el mínimo tiempo a construir un megaprompt y más bien ir viendo qué hacía. Si algo me gustaba, se lo decía. Si salía horrible, también. Y hubo de eso, jajaja.

Al final terminamos con una figura de Bruno en PLA negro, de unos quince centímetros. Un resultado decente, con cosas por mejorar, pero ya era mi perro convertido en una pieza que podía poner sobre la mesa. Yo no sé modelar en 3D. Por eso me parece tan interesante contar cómo llegamos hasta ahí.

<figure class="bruno-figure" style="max-width:497px">
  <a href="/assets/images/blog/bruno-impresion-3d-codex/imagen1.png" aria-label="Abrir imagen 1 en tamaño original">
    <img src="/assets/images/blog/bruno-impresion-3d-codex/imagen1.png" alt="Conversación para preparar las herramientas y modelar a Bruno a partir de sus fotos" width="497" height="442" loading="lazy" decoding="async" />
  </a>
  <figcaption>Primero, preparar las herramientas. Después, pasarle las fotos de Bruno.</figcaption>
</figure>

## Los primeros resultados estaban horribles

Codex preparó las herramientas, entre ellas Blender y OrcaSlicer, y empezó a trabajar con las fotografías. La primera figura tenía los colores de Bruno, estaba sentada y hasta llevaba su nombre en la base. Pero el parecido no me convencía.

Mi comentario fue bastante directo: «jajaja está horrible». Le pedí hacerla más realista. Ajustó el hocico, los ojos y las orejas y me mostró otra versión. Todavía faltaba bastante para que yo viera a Bruno ahí.

<figure class="bruno-figure" style="max-width:494px">
  <a href="/assets/images/blog/bruno-impresion-3d-codex/imagen2.png" aria-label="Abrir imagen 2 en tamaño original">
    <img src="/assets/images/blog/bruno-impresion-3d-codex/imagen2.png" alt="Primer modelo de Bruno y mi comentario pidiendo más realismo" width="494" height="533" loading="lazy" decoding="async" />
  </a>
  <figcaption>Los primeros intentos y mi reacción. Tocaba seguir mejorando.</figcaption>
</figure>

Le pedí que buscara una forma de reconstruirlo con IA y que generara una imagen que valiera la pena imprimir. Codex fue preparando y probando herramientas de reconstrucción. Generó una referencia de Bruno sentado, sin arnés y sobre una base delgada. Esa sí me gustó: «está espectacular esta imagen».

Con esa referencia hizo el modelo 3D. Ahí apareció otro problema: había quedado más gordo. Bruno es un border collie y su cuerpo es más estilizado. Se lo dije. También le comenté que la cara y el hocico necesitaban parecerse más a los suyos; en una versión parecía faltar parte de la boca inferior.

Ese fue el tipo de instrucciones que fui dando. Miraba la siguiente versión y decía qué me gustaba y qué encontraba raro. Codex resolvía cómo convertir esos comentarios en cambios del modelo.

## Yo opinaba sobre Bruno y Codex resolvía la parte técnica

Para corregir el cuerpo, ajustó el torso y el volumen de la reconstrucción. Para mejorar la cara, trabajó esa región por separado y luego la integró al resto de la figura. Fue escribiendo y ejecutando código, usando las herramientas y revisando el resultado.

Lo que me llamaba la atención era poder participar desde algo muy sencillo: reconocer a mi perro. Yo podía decir que estaba gordo o que esa cara necesitaba trabajo. Codex encontraba qué hacer con esa información y me mostraba el siguiente resultado.

La imagen generada tenía más detalle que el volumen que conseguimos. Al pasar a tres dimensiones, el pelo y la expresión se simplificaron. Eso se ve en la comparación y también en la pieza final. Llegamos a una aproximación que podíamos imprimir y seguir mejorando.

<figure class="bruno-figure" style="max-width:493px">
  <a href="/assets/images/blog/bruno-impresion-3d-codex/imagen3.png" aria-label="Abrir imagen 3 en tamaño original">
    <img src="/assets/images/blog/bruno-impresion-3d-codex/imagen3.png" alt="Referencia generada y modelo tridimensional antes del envío a la impresora" width="493" height="277" loading="lazy" decoding="async" />
  </a>
  <figcaption>La imagen que me gustó y el modelo 3D. Aquí todavía no habíamos enviado nada a la impresora.</figcaption>
</figure>

Después le pedí conectar la impresora y dejar todo andando. Codex ya había preparado el modelo y el archivo de impresión. Antes de arrancar, me preguntó si quería dejarlo listo o iniciar también la fabricación. Le dije que iniciara la impresión de Bruno.

Usó Computer Use para operar la interfaz de mi Creality Ender-3 V3 KE y el trabajo apareció activo. El archivo tenía 931 capas. El programa estimaba unas ocho horas y dieciséis minutos y 156 gramos de PLA; eran cálculos del laminador. La cámara no estaba disponible, así que comprobar físicamente cómo iba la pieza seguía requiriendo atención junto a la máquina.

<figure class="bruno-figure" style="max-width:825px">
  <a href="/assets/images/blog/bruno-impresion-3d-codex/imagen4-sin-red.png" aria-label="Abrir captura editada en tamaño completo">
    <img src="/assets/images/blog/bruno-impresion-3d-codex/imagen4-sin-red.png" alt="Conversación con la autorización y la confirmación del inicio de la impresión" width="1550" height="1014" loading="lazy" decoding="async" />
  </a>
  <figcaption>Le di el visto bueno y Bruno empezó a imprimirse. <span style="display:block;font-size:.85em;margin-top:.35rem">Captura editada para ocultar información de la red local.</span></figcaption>
</figure>

## Varias horas después ya teníamos a Bruno

Al día siguiente mandé las fotos con un mensaje corto: «así quedó impreso». Ahí estaba la figura, con sus patas, el pecho y la cola a un lado. La cara todavía tiene margen de mejora. El resultado fue decente para esta prueba y nos dejó claro qué habría que trabajar en otra versión.

Me quedo con la forma en que avanzó el proyecto. Empecé preguntando qué necesitábamos y fui opinando sobre lo que aparecía. Codex se encargó de buscar las herramientas y resolver los pasos técnicos entre las fotos y el archivo que llegó a la impresora.

Esto es lo que me entusiasma: poder intentar algo que no sé hacer, aportar mi criterio y tener ayuda para llevarlo hasta un resultado real. En esta prueba, mis comentarios sobre Bruno bastaron para que el modelo fuera mejorando. Las posibilidades de trabajar así con los equipos que ya tenemos en casa son enormes.

Pasamos de una conversación a tener una figura sobre la mesa. Y eso ya está pasando. Wow.

<figure class="bruno-figure" style="max-width:483px">
  <a href="/assets/images/blog/bruno-impresion-3d-codex/imagen5.png" aria-label="Abrir imagen 5 en tamaño original">
    <img src="/assets/images/blog/bruno-impresion-3d-codex/imagen5.png" alt="Dos fotografías de la figura física de Bruno impresa en PLA negro" width="483" height="310" loading="lazy" decoding="async" />
  </a>
  <figcaption>Bruno impreso en PLA negro, de frente y de lado.</figcaption>
</figure>
