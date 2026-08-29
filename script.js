```javascript
// ==========================================================
// NicaLingo — Interactividad y animaciones
// Vanilla JavaScript
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================================
     AÑO DEL FOOTER
     ======================================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* ========================================================
     REDUCED MOTION
     ======================================================== */

  const reducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)");

  const isTouchDevice =
    window.matchMedia("(hover: none), (pointer: coarse)").matches;


  /* ========================================================
     CURSOR GLOW
     ======================================================== */

  function cursorGlow(){

    const glow =
      document.getElementById("cursorGlow");

    if (!glow) return;

    if (reducedMotion.matches || isTouchDevice) {
      glow.style.display = "none";
      return;
    }

    let targetX =
      window.innerWidth / 2;

    let targetY =
      window.innerHeight / 2;

    let currentX = targetX;
    let currentY = targetY;

    let active = false;


    window.addEventListener(
      "mousemove",
      (event) => {

        targetX = event.clientX;
        targetY = event.clientY;

        if (!active) {

          active = true;

          glow.classList.add("is-active");
        }
      },
      { passive:true }
    );


    window.addEventListener(
      "mouseleave",
      () => {

        active = false;

        glow.classList.remove("is-active");
      }
    );


    function animate(){

      currentX +=
        (targetX - currentX) * .12;

      currentY +=
        (targetY - currentY) * .12;

      glow.style.transform =
        `translate(${currentX}px, ${currentY}px)`;

      requestAnimationFrame(animate);
    }

    animate();
  }

  cursorGlow();


  /* ========================================================
     HEADER AL HACER SCROLL
     ======================================================== */

  const header =
    document.getElementById("siteHeader");


  if (header){

    const updateHeader = () => {

      header.classList.toggle(
        "is-scrolled",
        window.scrollY > 12
      );
    };

    window.addEventListener(
      "scroll",
      updateHeader,
      { passive:true }
    );

    updateHeader();
  }


  /* ========================================================
     MENÚ MÓVIL
     ======================================================== */

  const navToggle =
    document.getElementById("navToggle");

  const mainNav =
    document.getElementById("mainNav");


  if (navToggle && mainNav){

    navToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          mainNav.classList.toggle("is-open");

        navToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );
      }
    );


    mainNav
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            mainNav.classList.remove(
              "is-open"
            );

            navToggle.setAttribute(
              "aria-expanded",
              "false"
            );
          }
        );
      });
  }


  /* ========================================================
     SCROLL REVEAL + STAGGER AUTOMÁTICO
     ======================================================== */

  function scrollReveal(){

    const items =
      document.querySelectorAll(".reveal");

    if (!items.length) return;


    /*
      Buscamos grids y calculamos automáticamente
      el retraso según la posición de cada elemento.
    */

    const grids =
      document.querySelectorAll(
        ".card-grid, .meaning-list"
      );


    grids.forEach(grid => {

      const children =
        grid.querySelectorAll(".reveal");


      children.forEach((item,index) => {

        /*
          Máximo de 5 elementos en cascada.
          Así evitamos que una sección tarde
          demasiado en aparecer.
        */

        const delay =
          Math.min(index,4) * 90;

        item.style.setProperty(
          "--reveal-delay",
          `${delay}ms`
        );
      });
    });


    /*
      Los elementos que no están dentro de
      un grid reciben un pequeño retraso.
    */

    items.forEach(item => {

      if (!item.style.getPropertyValue("--reveal-delay")){

        item.style.setProperty(
          "--reveal-delay",
          "0ms"
        );
      }
    });


    if (
      reducedMotion.matches ||
      !("IntersectionObserver" in window)
    ){

      items.forEach(item => {

        item.classList.add(
          "is-visible"
        );

      });

      return;
    }


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ){

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold:.12,

          rootMargin:
            "0px 0px -60px 0px"
        }
      );


    items.forEach(item => {

      observer.observe(item);

    });
  }

  scrollReveal();


  /* ========================================================
     TILT 3D DE LAS TARJETAS
     ======================================================== */

  function cardTilt(){

    if (
      reducedMotion.matches ||
      isTouchDevice
    ){
      return;
    }


    const cards =
      document.querySelectorAll(
        ".card"
      );


    cards.forEach(card => {


      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;


          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;


          /*
            Máximo aproximado:
            5 grados de inclinación.
          */

          const rotateY =
            ((x - centerX) / centerX) * 5;

          const rotateX =
            ((centerY - y) / centerY) * 5;


          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-7px)`;
        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
        }
      );


      card.addEventListener(
        "mouseenter",
        () => {

          card.style.transition =
            "transform .12s var(--ease-smooth), box-shadow .3s var(--ease-smooth)";
        }
      );


    });
  }

  cardTilt();


  /* ========================================================
     BOTONES MAGNÉTICOS
     ======================================================== */

  function magneticButtons(){

    if (
      reducedMotion.matches ||
      isTouchDevice
    ){
      return;
    }


    const buttons =
      document.querySelectorAll(
        ".magnetic"
      );


    buttons.forEach(button => {


      button.addEventListener(
        "mousemove",
        event => {

          const rect =
            button.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left -
            rect.width / 2;


          const y =
            event.clientY -
            rect.top -
            rect.height / 2;


          /*
            Movimiento pequeño y controlado.
          */

          const moveX =
            x * .16;

          const moveY =
            y * .16;


          button.style.transform =
            `translate(${moveX}px,${moveY}px)`;
        }
      );


      button.addEventListener(
        "mouseleave",
        () => {

          button.style.transform =
            "translate(0,0)";
        }
      );

    });
  }

  magneticButtons();


  /* ========================================================
     PARALLAX DEL HERO
     ======================================================== */

  function heroParallax(){

    const heroVisual =
      document.getElementById(
        "heroVisual"
      );


    if (
      !heroVisual ||
      reducedMotion.matches ||
      isTouchDevice
    ){
      return;
    }


    let ticking = false;


    const updateParallax = () => {

      const scroll =
        window.scrollY;


      /*
        Movimiento muy suave:
        máximo aproximado de 55px.
      */

      const offset =
        Math.min(scroll * .12,55);


      heroVisual.style.transform =
        `translateY(${offset}px)`;


      ticking = false;
    };


    window.addEventListener(
      "scroll",
      () => {

        if (!ticking){

          window.requestAnimationFrame(
            updateParallax
          );

          ticking = true;
        }

      },
      { passive:true }
    );
  }

  heroParallax();


  /* ========================================================
     CIERRE DEL MENÚ AL HACER CLICK FUERA
     ======================================================== */

  document.addEventListener(
    "click",
    event => {

      if (
        !mainNav ||
        !navToggle
      ){
        return;
      }


      const clickedInsideNav =
        mainNav.contains(
          event.target
        );


      const clickedToggle =
        navToggle.contains(
          event.target
        );


      if (
        !clickedInsideNav &&
        !clickedToggle
      ){

        mainNav.classList.remove(
          "is-open"
        );

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    }
  );


  /* ========================================================
     ACTUALIZAR REDUCED MOTION
     ======================================================== */

  reducedMotion.addEventListener(
    "change",
    () => {

      if (reducedMotion.matches){

        document
          .querySelectorAll(".reveal")
          .forEach(item => {

            item.classList.add(
              "is-visible"
            );

          });
      }

    }
  );

});
```

