# NicaLingo — Landing page

Página de aterrizaje estática (HTML/CSS/JS puro, sin build ni dependencias) lista para publicar en GitHub Pages, Netlify, Vercel o cualquier hosting estático.

## Estructura

```
nicalingo-landing/
├── index.html          → toda la página (sprite de íconos incluido)
├── css/
│   └── style.css       → paleta, tipografía, layout y animaciones
├── js/
│   └── script.js       → luz del cursor, menú móvil, scroll reveal
└── assets/
    ├── coco-hero.jpg           → mascota "Coco" (extraída de tu PDF de marca)
    ├── coco-logo.png           → mascota recortada con fondo transparente (logo)
    ├── favicon.png
    ├── pattern-zigzag-green.svg   → patrón zigzag+puntos (recreado del PDF)
    ├── pattern-zigzag-navy.svg
    ├── pattern-wave-coral.svg     → patrón de olas dobles (recreado del PDF)
    └── pattern-wave-navy.svg
```

## Cómo subirla a tu repositorio

1. Copia toda la carpeta `nicalingo-landing/` (o solo su contenido) a la raíz de tu repo.
2. Si usas **GitHub Pages**: Settings → Pages → Deploy from branch → selecciona la rama y la carpeta donde quedó `index.html`.
3. No requiere `npm install` ni build: es HTML/CSS/JS plano.

## Qué incluye

- Paleta y tipografía basadas en tu hoja de marca (colores exactos del PDF: verde #69B31E, coral #F65C28, magenta #D22054, cian #05ADD2, amarillo #F8DF23, azul #244699, cacao #491309).
- Los patrones de **zigzag con puntos** y **olas dobles** de tu PDF, recreados como SVG editables (se pueden recolorear cambiando el `stroke`/`fill` en el archivo).
- Íconos a medida en el mismo lenguaje visual de la mascota (contorno grueso, colores planos), para Listening/Speaking/Grammar/Writing, el Ecosistema de Identidad, el portal docente y el significado de la mascota.
- Animaciones: luz suave que sigue al cursor, mascota flotando, tarjetas con hover, franjas decorativas en movimiento continuo y aparición progresiva al hacer scroll.
- Responsive (móvil, tablet, escritorio) y respeta `prefers-reduced-motion`.

## Personalizar contenido

Todo el texto y los enlaces están directamente en `index.html`; los colores y espaciados se controlan desde las variables al inicio de `css/style.css` (bloque `:root`).
