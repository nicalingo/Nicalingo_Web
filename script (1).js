// ==========================================================
// NicaLingo — Interactividad y animaciones (versión simple)
// ==========================================================

const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ==========================================================
   AÑO DEL FOOTER
========================================================== */

const year = document.getElementById('year');

if(year){
  year.textContent = new Date().getFullYear();
}



/* ==========================================================
   CURSOR GLOW
========================================================== */

(function cursorGlow(){

  const glow = document.getElementById('cursorGlow');

  if(!glow){
    return;
  }

  if(
    window.matchMedia &&
    window.matchMedia('(pointer: coarse)').matches
  ){
    return;
  }

  if(prefersReducedMotion){
    return;
  }


  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;

  let currentX = targetX;
  let currentY = targetY;


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


  function animate(){

    currentX +=
      (targetX - currentX) * 0.1;

    currentY +=
      (targetY - currentY) * 0.1;

    // Se usan variables CSS (--gx/--gy) en lugar de fijar
    // "transform" directo, para que la animación sutil de
    // "respiración" del glow (glowBreathe) pueda seguir
    // corriendo sin que ambas cosas se pisen entre sí.

    glow.style.setProperty('--gx', `${currentX}px`);
    glow.style.setProperty('--gy', `${currentY}px`);


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

  if(!header){
    return;
  }


  function updateHeader(){

    if(window.scrollY > 12){

      header.classList.add('is-scrolled');

    }else{

      header.classList.remove('is-scrolled');

    }

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


  nav.querySelectorAll('a').forEach(
    function(link){

      link.addEventListener(
        'click',
        function(){

          nav.classList.remove('is-open');
          toggle.classList.remove('is-active');
          toggle.setAttribute('aria-expanded', 'false');

        }
      );

    }
  );

})();



/* ==========================================================
   SCROLL REVEAL
   (con un pequeño escalonado automático por tarjeta,
    para que no aparezcan todas de golpe)
========================================================== */

(function scrollReveal(){

  const groups =
    document.querySelectorAll('.card-grid');

  const items =
    document.querySelectorAll('.reveal');


  if(!items.length){
    return;
  }


  // Escalonar automáticamente las tarjetas de cada grid,
  // sin depender de que el HTML traiga --delay puesto a mano.

  groups.forEach(function(grid){

    const children =
      grid.querySelectorAll(':scope > .reveal');

    children.forEach(function(child, index){

      child.style.setProperty('--delay', (index * 0.1) + 's');

    });

  });


  if(!('IntersectionObserver' in window) || prefersReducedMotion){

    items.forEach(function(element){
      element.classList.add('is-visible');
    });

    return;
  }


  const observer =
    new IntersectionObserver(
      function(entries){

        entries.forEach(function(entry){

          if(entry.isIntersecting){

            entry.target.classList.add('is-visible');

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold:0.15,
        rootMargin:'0px 0px -60px 0px'
      }
    );


  items.forEach(function(element){
    observer.observe(element);
  });

})();



/* ==========================================================
   EFECTO DE MOVIMIENTO EN COCO (medallón)
========================================================== */

(function mascotInteraction(){

  const medallion =
    document.querySelector('.medallion');

  if(!medallion){
    return;
  }

  if(
    window.matchMedia &&
    window.matchMedia('(pointer: coarse)').matches
  ){
    return;
  }

  if(prefersReducedMotion){
    return;
  }


  medallion.addEventListener(
    'mousemove',
    function(event){

      const rect =
        medallion.getBoundingClientRect();

      const centerX =
        rect.left + rect.width / 2;

      const centerY =
        rect.top + rect.height / 2;

      const rotateX =
        ((event.clientY - centerY) / rect.height) * -8;

      const rotateY =
        ((event.clientX - centerX) / rect.width) * 8;

      medallion.style.transform =
        `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

    }
  );


  medallion.addEventListener(
    'mouseleave',
    function(){
      medallion.style.transform = '';
    }
  );

})();



/* ==========================================================
   INCLINACIÓN SUAVE EN LAS TARJETAS AL PASAR EL MOUSE
========================================================== */

(function cardTilt(){

  if(
    window.matchMedia &&
    window.matchMedia('(pointer: coarse)').matches
  ){
    return;
  }

  if(prefersReducedMotion){
    return;
  }


  document.querySelectorAll('.card').forEach(function(card){

    card.addEventListener('mousemove', function(event){

      const rect = card.getBoundingClientRect();

      const rotateX =
        ((event.clientY - rect.top - rect.height / 2) / rect.height) * -5;

      const rotateY =
        ((event.clientX - rect.left - rect.width / 2) / rect.width) * 5;

      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

    });


    card.addEventListener('mouseleave', function(){
      card.style.transform = '';
    });

  });

})();



/* ==========================================================
   BOTONES: ONDA AL HACER CLICK (ripple)
   — puramente decorativo, no interfiere con la navegación
     porque no llama preventDefault ni detiene la propagación.
========================================================== */

(function buttonRipple(){

  if(prefersReducedMotion){
    return;
  }

  document.querySelectorAll('.btn').forEach(function(btn){

    btn.addEventListener('click', function(event){

      const rect = btn.getBoundingClientRect();

      const ripple = document.createElement('span');

      ripple.className = 'btn-ripple';

      const size = Math.max(rect.width, rect.height) * 1.4;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';

      btn.appendChild(ripple);

      ripple.addEventListener('animationend', function(){
        ripple.remove();
      });

    });

  });

})();



/* ==========================================================
   CONTADOR ANIMADO EN "TU PROGRESO SIEMPRE CONTIGO"
   (cuenta de 0 al valor real solo la primera vez que
    el bloque entra en pantalla)
========================================================== */

(function topbarCounters(){

  const preview =
    document.querySelector('.topbar-preview');

  if(!preview){
    return;
  }

  const spans =
    preview.querySelectorAll('.topbar-mock span');

  if(!spans.length){
    return;
  }

  if(!('IntersectionObserver' in window) || prefersReducedMotion){
    return;
  }


  function animateCount(span){

    const text = span.textContent;

    const match = text.match(/\d+/);

    if(!match){
      return;
    }

    const target = parseInt(match[0], 10);

    const prefix = text.slice(0, match.index);
    const suffix = text.slice(match.index + match[0].length);

    const duration = 900;

    const start = performance.now();

    function step(now){

      const progress = Math.min((now - start) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      const current = Math.round(target * eased);

      span.textContent = prefix + current + suffix;

      if(progress < 1){
        requestAnimationFrame(step);
      }

    }

    requestAnimationFrame(step);

  }


  const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

      if(entry.isIntersecting){

        spans.forEach(animateCount);

        observer.unobserve(entry.target);

      }

    });

  }, {threshold:0.4});


  observer.observe(preview);

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
        nav.classList.remove('is-open');
      }


      if(toggle){
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
      }

    }

  }
);
