```javascript
// ==========================================================
// NicaLingo — SCRIPT.JS
// Interactividad y animaciones
// ==========================================================


/* ==========================================================
   AÑO DEL FOOTER
   ========================================================== */

const yearElement =
  document.getElementById('year');

if(yearElement){

  yearElement.textContent =
    new Date().getFullYear();

}


/* ==========================================================
   CURSOR GLOW
   ========================================================== */

(function cursorGlow(){

  const glow =
    document.getElementById('cursorGlow');

  if(!glow) return;


  // No ejecutar el efecto en dispositivos táctiles
  if(
    window.matchMedia('(pointer: coarse)').matches
  ){
    return;
  }


  let targetX =
    window.innerWidth / 2;

  let targetY =
    window.innerHeight / 2;

  let x = targetX;
  let y = targetY;

  let active = false;


  window.addEventListener(
    'mousemove',
    function(event){

      targetX = event.clientX;
      targetY = event.clientY;


      if(!active){

        active = true;

        glow.classList.add(
          'is-active'
        );

      }

    },
    {
      passive:true
    }
  );


  document.addEventListener(
    'mouseleave',
    function(){

      active = false;

      glow.classList.remove(
        'is-active'
      );

    }
  );


  function animate(){

    x +=
      (targetX - x) * 0.12;

    y +=
      (targetY - y) * 0.12;


    glow.style.transform =
      `translate(${x}px, ${y}px)`;


    requestAnimationFrame(
      animate
    );

  }


  animate();

})();


/* ==========================================================
   HEADER AL HACER SCROLL
   ========================================================== */

(function headerScroll(){

  const header =
    document.getElementById(
      'siteHeader'
    );

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
    {
      passive:true
    }
  );


  updateHeader();

})();


/* ==========================================================
   MENÚ MÓVIL
   ========================================================== */

(function mobileNav(){

  const toggle =
    document.getElementById(
      'navToggle'
    );

  const nav =
    document.getElementById(
      'mainNav'
    );


  if(!toggle || !nav) return;


  toggle.addEventListener(
    'click',
    function(){

      const isOpen =
        nav.classList.toggle(
          'is-open'
        );


      toggle.classList.toggle(
        'is-active',
        isOpen
      );


      toggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

    }
  );


  /*
   * Al seleccionar un enlace:
   * cerramos automáticamente
   * el menú móvil.
   */

  nav.querySelectorAll('a')
    .forEach(
      function(link){

        link.addEventListener(
          'click',
          function(){

            nav.classList.remove(
              'is-open'
            );

            toggle.classList.remove(
              'is-active'
            );

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
   SCROLL REVEAL
   ========================================================== */

(function scrollReveal(){

  const elements =
    document.querySelectorAll(
      '.reveal'
    );


  if(!elements.length) return;


  /*
   * Compatibilidad con navegadores
   * que no soporten IntersectionObserver.
   */

  if(
    !('IntersectionObserver' in window)
  ){

    elements.forEach(
      function(element){

        element.classList.add(
          'is-visible'
        );

      }
    );

    return;

  }


  const observer =
    new IntersectionObserver(
      function(entries){

        entries.forEach(
          function(entry){

            if(
              entry.isIntersecting
            ){

              entry.target.classList.add(
                'is-visible'
              );


              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold:0.15,

        rootMargin:
          '0px 0px -60px 0px'
      }
    );


  elements.forEach(
    function(element){

      observer.observe(
        element
      );

    }
  );

})();


/* ==========================================================
   CERRAR MENÚ AL PASAR A ESCRITORIO
   ========================================================== */

window.addEventListener(
  'resize',
  function(){

    if(window.innerWidth > 720){

      const nav =
        document.getElementById(
          'mainNav'
        );

      const toggle =
        document.getElementById(
          'navToggle'
        );


      if(nav){

        nav.classList.remove(
          'is-open'
        );

      }


      if(toggle){

        toggle.classList.remove(
          'is-active'
        );

        toggle.setAttribute(
          'aria-expanded',
          'false'
        );

      }

    }

  }
);
```
