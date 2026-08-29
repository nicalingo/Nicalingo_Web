// ==========================================================
// NicaLingo — Interactividad y animaciones
// ==========================================================

const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouchDevice =
  window.matchMedia &&
  window.matchMedia('(pointer: coarse)').matches;


/* ==========================================================
   AÑO DEL FOOTER
========================================================== */

const year = document.getElementById('year');

if(year){
  year.textContent = new Date().getFullYear();
}



/* ==========================================================
   CURSOR GLOW
   (con color que va cambiando suavemente)
========================================================== */

(function cursorGlow(){

  const glow = document.getElementById('cursorGlow');

  if(!glow || isTouchDevice || prefersReducedMotion){
    return;
  }


  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;

  let currentX = targetX;
  let currentY = targetY;

  let hue = 0;


  window.addEventListener(
    'mousemove',
    function(event){

      targetX = event.clientX;
      targetY = event.clientY;

      glow.classList.add('is-active');

    },
    {passive:true}
  );


  document.addEventListener(
    'mouseleave',
    function(){
      glow.classList.remove('is-active');
    }
  );


  // Un poco más de "vida": el glow respira
  // y su tinte se desliza muy lentamente
  // entre el sol y el coral de la marca.

  function animate(time){

    currentX +=
      (targetX - currentX) * 0.12;

    currentY +=
      (targetY - currentY) * 0.12;


    hue =
      (Math.sin(time / 6000) + 1) / 2;


    glow.style.transform =
      `translate(${currentX}px, ${currentY}px)`;

    glow.style.setProperty(
      '--glow-mix',
      hue.toFixed(3)
    );


    requestAnimationFrame(animate);

  }


  requestAnimationFrame(animate);

})();



/* ==========================================================
   HEADER AL HACER SCROLL
========================================================== */

(function headerScroll(){

  const header =
    document.getElementById('siteHeader');

  if(!header){
    return;
  }


  let ticking = false;


  function updateHeader(){

    if(window.scrollY > 12){

      header.classList.add('is-scrolled');

    }else{

      header.classList.remove('is-scrolled');

    }

    ticking = false;

  }


  window.addEventListener(
    'scroll',
    function(){

      if(!ticking){

        requestAnimationFrame(updateHeader);

        ticking = true;

      }

    },
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


  if(!toggle || !nav){
    return;
  }


  toggle.addEventListener(
    'click',
    function(){

      const isOpen =
        nav.classList.toggle('is-open');


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


  // Cerrar menú al seleccionar un enlace

  nav.querySelectorAll('a').forEach(
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
   (con stagger automático por grupo,
    en vez de depender solo de --delay en HTML)
========================================================== */

(function scrollReveal(){

  const groups =
    document.querySelectorAll('.card-grid, .section-head');

  const loose =
    document.querySelectorAll(
      '.reveal:not(.card-grid .reveal):not(.section-head)'
    );


  if(!('IntersectionObserver' in window) || prefersReducedMotion){

    document.querySelectorAll('.reveal').forEach(
      function(element){
        element.classList.add('is-visible');
      }
    );

    return;
  }


  const observer =
    new IntersectionObserver(
      function(entries){

        entries.forEach(
          function(entry){

            if(!entry.isIntersecting){
              return;
            }

            const target = entry.target;


            // Si es un grupo de tarjetas, escalonamos
            // sus hijos .reveal automáticamente.

            const children =
              target.classList.contains('card-grid')
                ? target.querySelectorAll(':scope > .reveal')
                : [target];


            children.forEach(
              function(child, index){

                child.style.setProperty(
                  '--delay',
                  `${index * 0.09}s`
                );

                child.classList.add('is-visible');

              }
            );


            observer.unobserve(target);

          }
        );

      },
      {
        threshold:0.15,

        rootMargin:
          '0px 0px -60px 0px'
      }
    );


  groups.forEach(function(el){ observer.observe(el); });
  loose.forEach(function(el){ observer.observe(el); });

})();



/* ==========================================================
   TILT 3D — MEDALLÓN Y TARJETAS
========================================================== */

function attachTilt(element, strength){

  if(isTouchDevice || prefersReducedMotion){
    return;
  }


  let raf = null;


  element.addEventListener(
    'mousemove',
    function(event){

      const rect =
        element.getBoundingClientRect();


      const px =
        (event.clientX - rect.left) / rect.width;

      const py =
        (event.clientY - rect.top) / rect.height;


      const rotateX =
        (py - 0.5) * -strength;

      const rotateY =
        (px - 0.5) * strength;


      if(raf){
        cancelAnimationFrame(raf);
      }


      raf =
        requestAnimationFrame(
          function(){

            element.style.transform =
              `perspective(800px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)
               translateY(-4px)`;

            element.style.setProperty(
              '--glare-x',
              `${px * 100}%`
            );

            element.style.setProperty(
              '--glare-y',
              `${py * 100}%`
            );

          }
        );

    }
  );


  element.addEventListener(
    'mouseleave',
    function(){

      if(raf){
        cancelAnimationFrame(raf);
      }

      element.style.transform = '';

    }
  );

}


(function mascotInteraction(){

  const medallion =
    document.querySelector('.medallion');

  if(medallion){
    attachTilt(medallion, 12);
  }

})();


(function cardTilt(){

  document.querySelectorAll('.card').forEach(
    function(card){
      attachTilt(card, 6);
    }
  );

})();



/* ==========================================================
   BOTONES MAGNÉTICOS
========================================================== */

(function magneticButtons(){

  if(isTouchDevice || prefersReducedMotion){
    return;
  }


  document.querySelectorAll('.btn').forEach(
    function(btn){

      btn.addEventListener(
        'mousemove',
        function(event){

          const rect =
            btn.getBoundingClientRect();

          const x =
            event.clientX - rect.left - rect.width / 2;

          const y =
            event.clientY - rect.top - rect.height / 2;


          btn.style.transform =
            `translate(${x * 0.18}px, ${y * 0.35}px)`;

        }
      );


      btn.addEventListener(
        'mouseleave',
        function(){

          btn.style.transform = '';

        }
      );

    }
  );

})();



/* ==========================================================
   PARALLAX SUAVE EN EL HERO
========================================================== */

(function heroParallax(){

  const visual =
    document.querySelector('.hero-visual');

  const hero =
    document.querySelector('.hero');

  if(!visual || !hero || prefersReducedMotion){
    return;
  }


  let ticking = false;


  function update(){

    const rect = hero.getBoundingClientRect();

    const progress =
      Math.min(
        Math.max(
          -rect.top / (rect.height || 1),
          0
        ),
        1
      );


    visual.style.transform =
      `translateY(${progress * 40}px)`;

    hero.style.setProperty(
      '--hero-fade',
      String(1 - progress * 0.6)
    );


    ticking = false;

  }


  window.addEventListener(
    'scroll',
    function(){

      if(!ticking){

        requestAnimationFrame(update);

        ticking = true;

      }

    },
    {passive:true}
  );


  update();

})();



/* ==========================================================
   CONTADOR DE XP (topbar-mock)
   Pequeña animación de conteo al entrar en vista.
========================================================== */

(function animateCounters(){

  const spans =
    document.querySelectorAll('.topbar-mock span');

  if(!spans.length || !('IntersectionObserver' in window)){
    return;
  }


  const observer =
    new IntersectionObserver(
      function(entries, obs){

        entries.forEach(
          function(entry){

            if(!entry.isIntersecting){
              return;
            }

            const el = entry.target;

            const match =
              el.textContent.match(/\d+/);

            if(match && !prefersReducedMotion){

              const target = parseInt(match[0], 10);

              const prefix =
                el.textContent.slice(
                  0,
                  el.textContent.indexOf(match[0])
                );

              const suffix =
                el.textContent.slice(
                  el.textContent.indexOf(match[0]) +
                  match[0].length
                );

              let current = 0;

              const duration = 900;

              const start = performance.now();


              function step(now){

                const t =
                  Math.min((now - start) / duration, 1);

                const eased =
                  1 - Math.pow(1 - t, 3);

                current = Math.round(target * eased);

                el.textContent =
                  `${prefix}${current}${suffix}`;


                if(t < 1){
                  requestAnimationFrame(step);
                }

              }


              requestAnimationFrame(step);

            }


            obs.unobserve(el);

          }
        );

      },
      {threshold:0.4}
    );


  spans.forEach(function(el){ observer.observe(el); });

})();



/* ==========================================================
   CIERRE AUTOMÁTICO SI CAMBIA A PANTALLA GRANDE
========================================================== */

window.addEventListener(
  'resize',
  function(){

    if(window.innerWidth > 720){

      const nav =
        document.getElementById('mainNav');

      const toggle =
        document.getElementById('navToggle');


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
