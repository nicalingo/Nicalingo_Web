/* =========================================================
   NicaLingo — Interactive Experience
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
       ===================================================== */

    const loader = document.getElementById("loader");

    function closeLoader() {

        if (!loader) return;

        loader.classList.add("loader-hidden");

        document.body.classList.add("page-ready");

        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);
    }

    /*
       Loader más largo.
       La página entra después de 2.8 segundos.
    */
    setTimeout(closeLoader, 2800);


    /*
       Seguridad:
       si algo impide ejecutar la animación,
       nunca dejamos la página bloqueada.
    */
    setTimeout(() => {

        if (loader) {
            loader.classList.add("loader-hidden");
            loader.style.pointerEvents = "none";
        }

    }, 4500);


    /* =====================================================
       NAVBAR
       ===================================================== */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            menuButton.classList.toggle("active");
            mobileMenu.classList.toggle("open");

            document.body.classList.toggle(
                "menu-open"
            );

        });


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    menuButton.classList.remove(
                        "active"
                    );

                    mobileMenu.classList.remove(
                        "open"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                });

            });

    }


    /* =====================================================
       REVEAL SYSTEM
       ===================================================== */
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.08}s`;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  reveals.forEach(el => observer.observe(el));
}
    /*
       Primero nos aseguramos de que todos
       puedan ser mostrados por JavaScript.
    */

    reveals.forEach(element => {

        element.style.willChange =
            "opacity, transform";

    });


    /*
       Si el navegador soporta IntersectionObserver,
       usamos animaciones al entrar en pantalla.
    */

    if (
        "IntersectionObserver" in window &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("is-visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        reveals.forEach(element => {

            observer.observe(element);

        });


        /*
           HERO:
           hacemos visible inmediatamente
           lo que pertenece al primer viewport.
        */

        document
            .querySelectorAll(
                ".hero .reveal"
            )
            .forEach(element => {

                setTimeout(() => {

                    element.classList.add(
                        "is-visible"
                    );

                }, 350);

            });


        /*
           SEGUNDO SEGURO:
           después de unos segundos revisamos
           si algo sigue oculto.
        */

        setTimeout(() => {

            reveals.forEach(element => {

                const rect =
                    element.getBoundingClientRect();

                const visible =
                    rect.top <
                    window.innerHeight &&
                    rect.bottom > 0;

                if (visible) {

                    element.classList.add(
                        "is-visible"
                    );

                }

            });

        }, 1000);

    } else {

        /*
           Si el navegador no soporta las animaciones,
           mostramos todo.
        */

        reveals.forEach(element => {

            element.classList.add(
                "is-visible"
            );

        });

    }


    /* =====================================================
       MAGNETIC BUTTONS
       ===================================================== */

    const magneticElements =
        document.querySelectorAll(
            ".magnetic"
        );


    magneticElements.forEach(element => {

        element.addEventListener(
            "pointermove",
            event => {

                if (window.innerWidth < 850)
                    return;

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(
                        ${x * 0.15}px,
                        ${y * 0.15}px
                    )`;

            }
        );


        element.addEventListener(
            "pointerleave",
            () => {

                element.style.transform = "";

            }
        );

    });


    /* =====================================================
       CARD 3D TILT
       ===================================================== */

    const cards =
        document.querySelectorAll(
            ".learning-card, .eco-card, .floating-card, .teacher-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                if (window.innerWidth < 900)
                    return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;

                const rotateX =
                    y * -4;

                const rotateY =
                    x * 4;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)`;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       CURSOR GLOW
       ===================================================== */

    const cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );


    if (cursorGlow) {

        window.addEventListener(
            "pointermove",
            event => {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

            },
            { passive: true }
        );

    }


    /* =====================================================
       HERO PARALLAX
       ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (heroVisual) {

        heroVisual.addEventListener(
            "pointermove",
            event => {

                if (window.innerWidth < 900)
                    return;

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;

                heroVisual.style.transform =
                    `translate(
                        ${x * 8}px,
                        ${y * 6}px
                    )`;

            }
        );


        heroVisual.addEventListener(
            "pointerleave",
            () => {

                heroVisual.style.transform = "";

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !id ||
                        id === "#"
                    ) {

                        event.preventDefault();
                        return;

                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       LEVEL MAP INTERACTION
       ===================================================== */

    const nodes =
        document.querySelectorAll(
            ".level-node"
        );


    nodes.forEach(node => {

        node.addEventListener(
            "mouseenter",
            () => {

                nodes.forEach(other => {

                    other.classList.remove(
                        "node-focus"
                    );

                });

                node.classList.add(
                    "node-focus"
                );

            }
        );


        node.addEventListener(
            "mouseleave",
            () => {

                node.classList.remove(
                    "node-focus"
                );

            }
        );

    });


    /* =====================================================
       WRITING ANIMATION
       ===================================================== */

    const writing =
        document.querySelector(
            ".writing-animation"
        );


    if (writing) {

        const originalText =
            "NicaLingo";

        let index = 0;
        let deleting = false;


        function typeWriter() {

            if (
                !document.body.contains(
                    writing
                )
            ) return;


            if (!deleting) {

                index++;

                writing.innerHTML =
                    originalText.substring(
                        0,
                        index
                    ) +
                    "<span>|</span>";


                if (
                    index >=
                    originalText.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeWriter,
                        1600
                    );

                    return;

                }

            } else {

                index--;

                writing.innerHTML =
                    originalText.substring(
                        0,
                        index
                    ) +
                    "<span>|</span>";


                if (index <= 0) {

                    deleting = false;

                    setTimeout(
                        typeWriter,
                        500
                    );

                    return;

                }

            }


            setTimeout(
                typeWriter,
                deleting ? 70 : 120
            );

        }


        setTimeout(
            typeWriter,
            1800
        );

    }


    /* =====================================================
       PROGRESS BAR
       ===================================================== */

    const progressBar =
        document.querySelector(
            ".progress-bar"
        );


    if (progressBar) {

        const progressObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            progressBar.classList.add(
                                "progress-loaded"
                            );

                            progressObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );


        progressObserver.observe(
            progressBar
        );

    }


    /* =====================================================
       STAGGER DE TARJETAS
       ===================================================== */

    const staggerGroups = [

        ".learning-grid",
        ".ecosystem-grid",
        ".coco-features"

    ];


    staggerGroups.forEach(selector => {

        document
            .querySelectorAll(selector)
            .forEach(group => {

                Array
                    .from(group.children)
                    .forEach(
                        (child, index) => {

                            child.style
                                .transitionDelay =
                                `${index * 0.12}s`;

                        }
                    );

            });

    });


    /* =====================================================
       RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                mobileMenu?.classList.remove(
                    "open"
                );

                menuButton?.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =====================================================
       PAGE READY
       ===================================================== */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "page-loaded"
            );

        }
    );

});
