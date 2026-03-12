# Configurar formulario con Google Sheets

## Qué hace esta opción

- Guarda cada lead en una hoja de cálculo de Google Sheets.
- Envía un correo a `juanmatiz@atiemppo.co`.
- Mantiene la página de gracias en `https://atiemppo.com/gracias/`.

## Paso 1: crear la hoja

1. En la cuenta de Google de ATIEMPPO, crea un Google Sheet nuevo.
2. Ponle un nombre como `Leads ATIEMPPO`.

## Paso 2: crear el Apps Script

1. Dentro del Sheet, entra a `Extensiones -> Apps Script`.
2. Reemplaza el contenido del archivo por el código de [contact-form.gs](/Users/atiemppoia/Documents/GitHub/atiemppo-web/google-apps-script/contact-form.gs).
3. Guarda el proyecto.

## Paso 3: desplegar como Web App

1. Haz clic en `Deploy -> New deployment`.
2. Elige `Web app`.
3. En `Execute as`, selecciona `Me`.
4. En `Who has access`, selecciona `Anyone`.
5. Autoriza los permisos.
6. Copia la URL del deployment.

## Paso 4: pegar la URL en la web

En [index.html](/Users/atiemppoia/Documents/GitHub/atiemppo-web/index.html), busca este atributo:

```html
data-google-script-url=""
```

Pega ahí la URL del Web App, por ejemplo:

```html
data-google-script-url="https://script.google.com/macros/s/AKfycb.../exec"
```

## Paso 5: publicar y probar

1. Sube los cambios a GitHub.
2. Espera a que GitHub Pages publique el sitio.
3. Envía un formulario de prueba.
4. Verifica dos cosas:
   - que apareció una fila nueva en Google Sheets
   - que llegó el correo a `juanmatiz@atiemppo.co`

## Notas

- Si `data-google-script-url` queda vacío, el formulario seguirá usando el fallback actual por `FormSubmit`.
- Puedes desactivar luego `FormSubmit` si decides quedarte solo con Google.
- Si quieres, después podemos agregar una columna `estado`, `etapa comercial` o `observaciones`.
