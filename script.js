```javascript
// ==========================================================
// NicaLingo — Interactividad y animaciones
// Vanilla JavaScript
// ==========================================================


/* ==========================================================
   CONFIGURACIÓN GLOBAL
   ========================================================== */

const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const isTouchDevice =
  window.matchMedia('(pointer: coarse)').matches;


/* ==========================================================
   AÑO AUTOMÁTICO
   No genera error si #year no existe
   ========================================================== */

(function setYear(){

  const year = document.getElementById('year');

  if(year){
    year.textContent = new Date().getFullYear();
  }

})();


/* ==========================================================
   CURSOR GLOW
   Se desactiva en touch y reduced-motion
   ========================================================== */

(function cursorGlow(){

  const glow = document.getElementById('cursorGlow');

  if(!glow) return;
  if(reducedMotion) return;
  if(isTouchDevice) return;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;

  let x = targetX;
  let y = targetY;

  let active = false;

  window.addEventListener(
    'mousemove',
    (event) => {

      targetX = event.clientX;
      targetY = event.clientY;

      if(!active){

        active = true;

        glow.classList.add('is-active');

      }

    },
    {passive:true}
  );


  window.addEventListener(
    'mouseleave',
    () => {

      active = false;

      glow.classList.remove('is-active');

    }
  );


  function animate(){

    x += (targetX - x) * 0.12;
    y += (targetY - y) * 0.12;

    glow.style.transform =
      `translate3d(${x}px, ${y}px, 0)`;

    requestAnimationFrame(animate);

  }

  animate();

})();


/* ==========================================================
   HEADER AL HACER SCROLL
   ========================================================== */

(function headerScroll(){

  const header =
    document.getElementById('siteHeader');

  if(!header) return;


  function updateHeader(){

    header.classList.toggle(
      'is-scrolled',
      window.scrollY > 12
    );

  }


  window.addEventListener(
    'scroll',
    updateHeader,
    {passive:true}
  );

  updateHeader();

})();


/* ==========================================================
   MENÚ MÓVIL
   ========================================================== */

(function mobileNav(){

  const toggle =
    document.getElementById('navToggle');

  const nav =
    document.getElementById('mainNav');

  if(!toggle || !nav) return;


  toggle.addEventListener(
    'click',
    () => {

      const isOpen =
        nav.classList.toggle('is-open');

      toggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

    }
  );


  nav.querySelectorAll('a').forEach(
    link => {

      link.addEventListener(
        'click',
        () => {

          nav.classList.remove('is-open');

          toggle.setAttribute(
            'aria-expanded',
            'false'
          );

        }
      );

    }
  );

})();


/* ==========================================================
   SCROLL REVEAL + STAGGER AUTOMÁTICO
   No necesita --delay en el HTML
   ========================================================== */

(function scrollReveal(){

  const items =
    document.querySelectorAll('.reveal');

  if(!items.length) return;


  /* ------------------------------------------
     Si el usuario prefiere menos movimiento
     ------------------------------------------ */

  if(reducedMotion){

    items.forEach(
      item => {

        item.classList.add('is-visible');

        item.style.removeProperty(
          '--reveal-delay'
        );

      }
    );

    return;

  }


  /* ------------------------------------------
     STAGGER POR GRID
     ------------------------------------------ */

  const grids =
    document.querySelectorAll(
      '.card-grid, .cards'
    );


  grids.forEach(
    grid => {

      const children =
        Array.from(grid.children)
          .filter(
            child =>
              child.classList.contains('reveal') ||
              child.classList.contains('card')
          );


      children.forEach(
        (child, index) => {

          /*
           * Cada elemento aparece 90ms después
           * del anterior.
           */

          child.style.setProperty(
            '--reveal-delay',
            `${index * 90}ms`
          );

          child.classList.add('reveal');

        }
      );

    }
  );


  /* ------------------------------------------
     Elementos normales fuera de grids
     ------------------------------------------ */

  items.forEach(
    item => {

      if(!item.style.getPropertyValue('--reveal-delay')){

        item.style.setProperty(
          '--reveal-delay',
          '0ms'
        );

      }

    }
  );


  /* ------------------------------------------
     Intersection Observer
     ------------------------------------------ */

  if(!('IntersectionObserver' in window)){

    document
      .querySelectorAll('.reveal')
      .forEach(
        item =>
          item.classList.add('is-visible')
      );

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if(!entry.isIntersecting) return;


            entry.target.classList.add(
              'is-visible'
            );


            /*
             * Dejamos de observar el elemento
             * después de aparecer.
             */

            observer.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold:0.15,

        rootMargin:
          '0px 0px -60px 0px'
      }
    );


  document
    .querySelectorAll('.reveal')
    .forEach(
      item => observer.observe(item)
    );

})();


/* ==========================================================
   TILT 3D PARA TARJETAS
   ========================================================== */

(function cardTilt(){

  if(reducedMotion) return;
  if(isTouchDevice) return;


  const cards =
    document.querySelectorAll('.card');


  if(!cards.length) return;


  cards.forEach(
    card => {

      card.addEventListener(
        'mousemove',
        event => {

          const rect =
            card.getBoundingClientRect();


          /*
           * Posición del mouse dentro
           * de la tarjeta: 0 → 1
           */

          const x =
            (event.clientX - rect.left)
            / rect.width;

          const y =
            (event.clientY - rect.top)
            / rect.height;


          /*
           * Convertimos esa posición
           * en grados.
           *
           * Máximo:
           *  ±5 grados
           */

          const rotateY =
            (x - 0.5) * 10;

          const rotateX =
            (0.5 - y) * 10;


          card.style.transform =
            `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-5px)
            translateZ(8px)
            `;

        },
        {passive:true}
      );


      card.addEventListener(
        'mouseenter',
        () => {

          card.style.transition =
            'transform .12s var(--ease-smooth), box-shadow .3s var(--ease-smooth)';

        }
      );


      card.addEventListener(
        'mouseleave',
        () => {

          card.style.transition =
            'transform .45s var(--ease-bounce), box-shadow .3s var(--ease-smooth)';


          card.style.transform =
            `
            perspective(900px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0)
            translateZ(0)
            `;

        }
      );

    }
  );

})();


/* ==========================================================
   BOTONES MAGNÉTICOS
   ========================================================== */

(function magneticButtons(){

  if(reducedMotion) return;
  if(isTouchDevice) return;


  const buttons =
    document.querySelectorAll(
      '.btn'
    );


  if(!buttons.length) return;


  buttons.forEach(
    button => {

      button.addEventListener(
        'mousemove',
        event => {

          const rect =
            button.getBoundingClientRect();


          const centerX =
            rect.left + rect.width / 2;

          const centerY =
            rect.top + rect.height / 2;


          const distanceX =
            event.clientX - centerX;

          const distanceY =
            event.clientY - centerY;


          /*
           * El botón solo sigue una parte
           * del movimiento del cursor.
           *
           * Así se siente magnético
           * sin salir volando.
           */

          const moveX =
            distanceX * 0.18;

          const moveY =
            distanceY * 0.18;


          button.style.transform =
            `translate3d(${moveX}px, ${moveY}px, 0) scale(1.02)`;

        },
        {passive:true}
      );


      button.addEventListener(
        'mouseenter',
        () => {

          button.style.transition =
            'transform .12s var(--ease-smooth), box-shadow .3s var(--ease-smooth), background .25s var(--ease-smooth)';

        }
      );


      button.addEventListener(
        'mouseleave',
        () => {

          button.style.transition =
            'transform .4s var(--ease-bounce), box-shadow .3s var(--ease-smooth), background .25s var(--ease-smooth)';

          button.style.transform =
            'translate3d(0,0,0) scale(1)';

        }
      );

    }
  );

})();


/* ==========================================================
   PARALLAX DEL HERO
   El hero-visual se mueve suavemente con el scroll
   ========================================================== */

(function heroParallax(){

  if(reducedMotion) return;


  const visual =
    document.querySelector('.hero-visual');


  if(!visual) return;


  let current = 0;
  let target = 0;


  function updateTarget(){

    /*
     * Limitamos el parallax para que nunca
     * se mueva demasiado.
     */

    target =
      Math.max(
        -35,
        Math.min(
          35,
          window.scrollY * 0.12
        )
      );

  }


  function animate(){

    current +=
      (target - current) * 0.08;


    visual.style.transform =
      `translate3d(0, ${current}px, 0)`;


    requestAnimationFrame(
      animate
    );

  }


  window.addEventListener(
    'scroll',
    updateTarget,
    {passive:true}
  );


  updateTarget();

  animate();

})();


/* ==========================================================
   MICROINTERACCIÓN DE LOS PILLS
   ========================================================== */

(function pillsInteraction(){

  if(reducedMotion) return;
  if(isTouchDevice) return;


  document
    .querySelectorAll('.pill')
    .forEach(
      pill => {

        pill.addEventListener(
          'mouseenter',
          () => {

            pill.style.transform =
              'translateY(-4px) rotate(-1deg)';

          }
        );


        pill.addEventListener(
          'mouseleave',
          () => {

            pill.style.transform =
              'translateY(0) rotate(0)';

          }
        );

      }
    );

})();


/* ==========================================================
   LIMPIEZA AL CAMBIAR TAMAÑO
   Evita que efectos de escritorio queden
   activos al pasar a móvil.
   ========================================================== */

window.addEventListener(
  'resize',
  () => {

    if(window.innerWidth <= 720){

      document
        .querySelectorAll('.card')
        .forEach(
          card => {

            card.style.transform =
              'none';

          }
        );


      document
        .querySelectorAll('.btn')
        .forEach(
          button => {

            button.style.transform =
              'none';

          }
        );

    }

  },
  {passive:true}
);
```

