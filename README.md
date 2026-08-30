# ZWAG ZONE — sitio web

Sitio estático (HTML + CSS + JS, sin build ni backend) listo para editar y subir a Netlify.

## 1. Dirección visual (resumen)

**Estética:** Y2K actualizado con swag — collage editorial, "sticker cards" con borde
grueso y sombra offset, fondos de grid/halftone, blobs orgánicos, estrellas, burbujas
y pills tipo etiqueta, inspirados en tus 3 imágenes de referencia (fan-edits estilo
Dispatch/WSP con marcos irregulares, stickers y tipografía gótica).

**Colores** (los que diste, tal cual):
- `#88DDFF` sky blue — protagonista
- `#FFEC75` yellow — protagonista
- `#EDD7C0` warm beige — calidez
- `#4D769C` deep blue — contraste
- `#FFFFFF` white — limpieza
- `#16283A` ink navy — tono oscuro derivado del deep blue, para texto/contraste alto

**Tipografías:**
- `Pirata One` (gótica) — solo para el wordmark "Zwag Zone" y momentos hero, igual
  que en tus referencias. Úsala con moderación, nunca en párrafos.
- `Archivo Black` — títulos de sección, chunky y directo.
- `Space Grotesk` — texto de cuerpo.
- `Space Mono` — etiquetas, pills, navegación, todo lo "UI/digital interface".

**Elemento firma:** el "gate" de entrada en Home — el logo gótico aparece, y al
presionar `ENTER THE ZONE` la pantalla se abre en círculo (efecto "peel") revelando
el sitio, con un pequeño estallido de estrellas. Solo ocurre una vez por sesión y
se omite automáticamente si el navegador tiene activado "reducir movimiento".

## 2. Estructura de archivos

```
zwagzone/
├── index.html          Home
├── about.html
├── how-it-works.html
├── staff.html
├── gallery.html
├── rules.html
├── join.html
├── css/style.css       Todos los estilos (variables al inicio del archivo)
├── js/main.js          Menú móvil, gate, animaciones, filtros
└── assets/             Carpeta vacía lista para tus imágenes reales
```

Cada página repite el mismo `<header>`/`<footer>` (patrón normal en sitios
estáticos sin backend). Si cambias un link de navegación, cámbialo en las 7
páginas — son bloques idénticos, fáciles de ubicar con buscar/reemplazar.

## 3. Qué reemplazar antes de publicar

Busca estos marcadores en el código (todos están comentados o visibles en pantalla):

| Dónde | Qué reemplazar |
|---|---|
| `index.html`, `staff.html`, `gallery.html` | Bloques `.photo-frame` con texto "reemplazar imagen/foto" → cambia el `<div class="photo-frame">...</div>` por un `<img src="assets/tu-foto.jpg" alt="...">` |
| `staff.html` | `[Nombre]`, `@[usuario]` en cada tarjeta, y el rango si hace falta |
| `rules.html` | El texto entre `[ ]` de cada regla — las categorías (Respect, Activity...) son solo sugerencias, puedes cambiarlas también |
| `join.html` | Las cajas `QR — Recepción` / `QR — TikTok` → cambia el `<div class="qr-box">` por `<img src="assets/qr-recepcion.png">`, y los `href="#"` de los botones Apply/TikTok por tus URLs reales |
| Todos los footers | `TikTok — [reemplazar URL]`, `Instagram — [reemplazar URL]` |

No se usó ninguna fotografía real: todo son placeholders de color con texto,
para que puedas reemplazarlos por tus propias imágenes sin pisar derechos de autor.

## 4. Desplegar en Netlify

**Opción rápida (arrastrar y soltar):**
1. Entra a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta `zwagzone` completa
3. Netlify te da una URL al instante (puedes cambiar el subdominio después en
   Site settings → Domain management)

**Opción con Git (recomendada si vas a seguir editando):**
1. Sube la carpeta a un repositorio de GitHub/GitLab
2. En Netlify: "Add new site" → "Import an existing project"
3. Build command: (vacío) — Publish directory: `.` (la raíz del repo)

No hay paso de build ni variables de entorno: es HTML/CSS/JS puro.

## 5. Ideas para ampliar más adelante

- Reemplazar los datos de ejemplo de Staff/Gallery por un archivo `.json` que
  alimente las tarjetas por JS, si el staff crece.
- Sistema real de puntos/perfiles → eso ya necesitaría backend, fuera del
  alcance de esta primera versión.
- Modo oscuro opcional usando las mismas variables de color en `:root`.
