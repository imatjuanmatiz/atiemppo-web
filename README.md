# Atiemppo.com

Sitio web de Atiemppo - Optimización de Visibilidad en Inteligencia Artificial para marcas de América Latina.

**URL**: https://atiemppo.com

## Tecnología

- **Jekyll** 4.3+ - Generador de sitios estáticos
- **GitHub Pages** - Hosting
- **Minima Theme** - Tema base
- **Custom CSS** - Estilos personalizados

## Estructura del Proyecto

atiemppo-web/
- _config.yml - Configuración de Jekyll
- _layouts/ - Templates (default.html, post.html)
- _includes/ - Componentes (header.html, footer.html)
- assets/css/ - Estilos personalizados (main.css)
- _posts/ - Artículos del blog
- index.md - Página principal
- blog.html - Página de blog
- robots.txt - Configuración SEO
- CNAME - Configuración de dominio

## Instalación Local

Requisitos: Ruby 2.7+, Bundler

git clone https://github.com/imatjuanmatiz/atiemppo-web.git
cd atiemppo-web
bundle install
bundle exec jekyll serve

El sitio estará disponible en http://localhost:4000

## Crear un Post

Crea un archivo en _posts/ con el formato YYYY-MM-DD-titulo.md

## Deploy

Los cambios en la rama main se despliegan automáticamente a través de GitHub Pages.

## Contacto

**Email**: hola@atiemppo.com
**Twitter**: @atiemppo
**Ubicación**: Bogotá, Colombia

---

© 2026 Atiemppo. Todos los derechos reservados.
