// ==========================================================
// NicaLingo
// SCRIPT.JS
// Interactividad, animaciones y navegación
// ==========================================================


/* ==========================================================
   AÑO DEL FOOTER
   ========================================================== */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* ==========================================================
   HEADER AL HACER SCROLL
   ========================================================== */

const siteHeader = document.getElementById("siteHeader");

function updateHeader() {

    if (!siteHeader) return;

    if (window.scrollY > 30) {

        siteHeader.classList.add("is-scrolled");

    } else {

        siteHeader.classList.remove("is-scrolled");

    }
}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* ==========================================================
   MENÚ MOBILE
   ========================================================== */

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");


if (navToggle && mainNav) {

    navToggle.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("is-open");

        navToggle.classList.toggle(
            "active",
            isOpen
        );

        navToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    /* Cerrar menú cuando se selecciona un enlace */

    const navLinks =
        mainNav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("is-open");

            navToggle.classList.remove("active");

            navToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* ==========================================================
   SCROLL REVEAL
   ========================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

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
                threshold:0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add(
            "is-visible"
        );

    });

}


/* ==========================================================
   CURSOR GLOW
   ========================================================== */

(function cursorGlow(){

    const glow =
        document.getElementById("cursorGlow");

    if (!glow) return;


    /* No ejecutar en dispositivos táctiles */

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }


    let targetX =
        window.innerWidth / 2;

    let targetY =
        window.innerHeight / 2;

    let currentX = targetX;
    let currentY = targetY;


    window.addEventListener(
        "mousemove",
        event => {

            targetX =
                event.clientX;

            targetY =
                event.clientY;

            glow.classList.add(
                "is-active"
            );

        },
        { passive:true }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            glow.classList.remove(
                "is-active"
            );

        }
    );


    function animateGlow(){

        currentX +=
            (targetX - currentX) * 0.12;

        currentY +=
            (targetY - currentY) * 0.12;


        glow.style.transform =
            `translate(${currentX}px, ${currentY}px)`;


        requestAnimationFrame(
            animateGlow
        );
    }


    animateGlow();

})();


/* ==========================================================
   ANIMACIÓN DE TARJETAS AL PASAR EL MOUSE
   ========================================================== */

const cards =
    document.querySelectorAll(
        ".card, .skill-card, .dark-card"
    );


cards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.zIndex = "5";

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.zIndex = "";

        }
    );

});


/* ==========================================================
   EFECTO SUAVE EN EL MEDALLÓN DE COCO
   ========================================================== */

const medallion =
    document.querySelector(".medallion");


if (medallion) {

    medallion.addEventListener(
        "mousemove",
        event => {

            const rect =
                medallion.getBoundingClientRect();

            const centerX =
                rect.left + rect.width / 2;

            const centerY =
                rect.top + rect.height / 2;

            const rotateX =
                (event.clientY - centerY) / 35;

            const rotateY =
                (event.clientX - centerX) / 35;


            medallion.style.transform =
                `perspective(700px)
                 rotateX(${-rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    medallion.addEventListener(
        "mouseleave",
        () => {

            medallion.style.transform = "";

        }
    );

}


/* ==========================================================
   SMOOTH SCROLL PARA ENLACES INTERNOS
   ========================================================== */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            const headerHeight =
                siteHeader
                    ? siteHeader.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top
                +
                window.scrollY
                -
                headerHeight
                -
                10;


            window.scrollTo({

                top:targetPosition,

                behavior:"smooth"

            });

        }
    );

});


/* ==========================================================
   EFECTO DE ENTRADA DE LA BARRA DE PROGRESO
   ========================================================== */

const progressBar =
    document.querySelector(
        ".progress-fill"
    );


if (progressBar) {

    const progressObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        progressBar.style.animation =
                            "progressGrow 1.8s cubic-bezier(.2,.8,.2,1) both";

                    }

                });

            },

            {
                threshold:.5
            }

        );


    progressObserver.observe(
        progressBar
    );

}
