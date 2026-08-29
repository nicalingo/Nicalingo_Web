// ==========================================================
// NicaLingo — Interactividad y animaciones
// ==========================================================


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

  // No ejecutar en dispositivos táctiles
  if(
    window.matchMedia &&
    window.matchMedia('(pointer: coarse)').matches
  ){
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
      (targetX - currentX) * 0.10;

    currentY +=
      (targetY - currentY) * 0.10;


    glow.style.transform =
      `translate(${currentX}px, ${currentY}px)`;


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
========================================================== */

(function scrollReveal(){

  const items =
    document.querySelectorAll('.reveal');


  if(!items.length){
    return;
  }


  // Si el navegador no soporta
  // IntersectionObserver

  if(!('IntersectionObserver' in window)){

    items.forEach(
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

            if(entry.isIntersecting){

              entry.target.classList.add(
                'is-visible'
              );


              // Dejar de observarlo después
              // de mostrarlo

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


  items.forEach(
    function(element){

      observer.observe(element);

    }
  );

})();



/* ==========================================================
   EFECTO DE MOVIMIENTO EN COCO
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
        ((event.clientY - centerY) /
          rect.height) * -6;


      const rotateY =
        ((event.clientX - centerX) /
          rect.width) * 6;


      medallion.style.transform =
        `perspective(700px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         scale(1.02)`;

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
