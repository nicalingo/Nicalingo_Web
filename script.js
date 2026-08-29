/* =========================================================
   NicaLingo — Interactive Experience
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
       ===================================================== */

    const loader = document.getElementById("loader");

    const finishLoader = () => {
        if (!loader) return;

        loader.style.transition =
            "opacity 0.8s cubic-bezier(.2,.8,.2,1), visibility 0.8s ease";

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";

        document.body.classList.add("page-ready");

        setTimeout(() => {
            loader.remove();
        }, 900);
    };

    /*
       Esperamos un poco para que el inicio
       se sienta como una verdadera entrada.
    */
    setTimeout(finishLoader, 1600);


    /* =====================================================
       ELEMENTOS PRINCIPALES
       ===================================================== */

    const navbar = document.getElementById("navbar");
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    const revealElements = document.querySelectorAll(".reveal");
    const magneticElements = document.querySelectorAll(".magnetic");


    /* =====================================================
       NAVBAR DINÁMICA
       ===================================================== */

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    /* =====================================================
       MENÚ MOBILE
       ===================================================== */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.contains("open");

            if (isOpen) {

                mobileMenu.classList.remove("open");
                menuButton.classList.remove("active");
                document.body.classList.remove("menu-open");

            } else {

                mobileMenu.classList.add("open");
                menuButton.classList.add("active");
                document.body.classList.add("menu-open");

            }

        });


        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");
                menuButton.classList.remove("active");
                document.body.classList.remove("menu-open");

            });

        });

    }


    /* =====================================================
       REVEAL AL HACER SCROLL
       ===================================================== */

    if (
        "IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("is-visible");

        });

    }


    /* =====================================================
       ENTRADA ESCALONADA DE ELEMENTOS
       ===================================================== */

    const staggerGroups = [
        ".learning-grid",
        ".ecosystem-grid",
        ".coco-features",
        ".level-map"
    ];

    staggerGroups.forEach(selector => {

        document.querySelectorAll(selector).forEach(group => {

            const children = group.children;

            Array.from(children).forEach((child, index) => {

                child.style.transitionDelay =
                    `${index * 0.09}s`;

            });

        });

    });


    /* =====================================================
       EFECTO MAGNÉTICO EN BOTONES
       ===================================================== */

    if (
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        magneticElements.forEach(element => {

            element.addEventListener("pointermove", event => {

                if (window.innerWidth < 800) return;

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

                const moveX = x * 0.18;
                const moveY = y * 0.18;

                element.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;

            });


            element.addEventListener("pointerleave", () => {

                element.style.transform = "";

            });

        });

    }


    /* =====================================================
       TILT 3D PARA TARJETAS
       ===================================================== */

    const cards = document.querySelectorAll(
        ".learning-card, .eco-card, .floating-card, .teacher-card"
    );

    if (
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        cards.forEach(card => {

            card.addEventListener("pointermove", event => {

                if (window.innerWidth < 900) return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                const rotateX = y * -5;
                const rotateY = x * 5;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            });


            card.addEventListener("pointerleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =====================================================
       GLOW QUE SIGUE AL CURSOR
       ===================================================== */

    const cursorGlow =
        document.querySelector(".cursor-glow");

    if (
        cursorGlow &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        window.addEventListener("pointermove", event => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        });

    }


    /* =====================================================
       PARALLAX DEL HERO
       ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (
        heroVisual &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        heroVisual.addEventListener("pointermove", event => {

            if (window.innerWidth < 900) return;

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width - 0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height - 0.5;

            heroVisual.style.transform =
                `translate3d(
                    ${x * 10}px,
                    ${y * 8}px,
                    0
                )`;

        });


        heroVisual.addEventListener("pointerleave", () => {

            heroVisual.style.transform = "";

        });

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                event.preventDefault();
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ANIMACIÓN DE LOS NODOS DEL MAPA
       ===================================================== */

    const levelNodes =
        document.querySelectorAll(".level-node");

    levelNodes.forEach((node, index) => {

        node.addEventListener("mouseenter", () => {

            levelNodes.forEach(other => {

                other.classList.remove("node-focus");

            });

            node.classList.add("node-focus");

        });


        node.addEventListener("mouseleave", () => {

            node.classList.remove("node-focus");

        });

    });


    /* =====================================================
       EFECTO DE ESCRITURA EN WRITING
       ===================================================== */

    const writing =
        document.querySelector(".writing-animation");

    if (writing) {

        const text =
            "NicaLingo";

        let position = 0;
        let deleting = false;

        const typeWriter = () => {

            if (!document.body.contains(writing)) return;

            if (!deleting) {

                position++;

                writing.innerHTML =
                    text.substring(0, position) +
                    "<span>|</span>";

                if (position >= text.length) {

                    deleting = true;

                    setTimeout(typeWriter, 1800);

                    return;

                }

            } else {

                position--;

                writing.innerHTML =
                    text.substring(0, position) +
                    "<span>|</span>";

                if (position <= 0) {

                    deleting = false;

                    setTimeout(typeWriter, 500);

                    return;

                }

            }

            setTimeout(
                typeWriter,
                deleting ? 80 : 130
            );

        };

        setTimeout(typeWriter, 1800);

    }


    /* =====================================================
       CONTADOR VISUAL DE XP
       ===================================================== */

    const progressBar =
        document.querySelector(".progress-bar");

    if (progressBar) {

        const progressObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            progressBar.classList.add(
                                "progress-loaded"
                            );

                            progressObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );

        progressObserver.observe(progressBar);

    }


    /* =====================================================
       EFECTO HOVER EN TARJETAS
       ===================================================== */

    document.querySelectorAll(
        ".learning-card, .eco-card"
    ).forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("card-hover");

        });

        card.addEventListener("mouseleave", () => {

            card.classList.remove("card-hover");

        });

    });


    /* =====================================================
       DETECTAR CAMBIO DE TAMAÑO
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            mobileMenu?.classList.remove("open");
            menuButton?.classList.remove("active");
            document.body.classList.remove("menu-open");

        }

    });


    /* =====================================================
       FALLBACK DE SEGURIDAD
       ===================================================== */

    /*
       Si por cualquier motivo algo falla después de cargar,
       el loader NO debe quedarse bloqueando la página.
    */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                finishLoader();
            }

        }, 100);

    });


    /* =====================================================
       READY
       ===================================================== */

    document.body.classList.add("js-loaded");

});
