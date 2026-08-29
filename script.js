/* ============================================================
   NICALINGO — INTERACTIONS
============================================================ */


/* ============================================================
   LOADER
============================================================ */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1900);

});


/* ============================================================
   CURSOR GLOW
============================================================ */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {

    window.addEventListener("mousemove", (event) => {

        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;

    });

}


/* ============================================================
   NAVBAR SCROLL
============================================================ */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* ============================================================
   REVEAL ON SCROLL
============================================================ */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .12
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ============================================================
   MAGNETIC BUTTONS
============================================================ */

const magneticElements =
    document.querySelectorAll(".magnetic");

magneticElements.forEach((element) => {

    element.addEventListener("mousemove", (event) => {

        const rect =
            element.getBoundingClientRect();

        const x =
            event.clientX - rect.left - rect.width / 2;

        const y =
            event.clientY - rect.top - rect.height / 2;

        element.style.transform =
            `translate(${x * .12}px, ${y * .12}px)`;

    });


    element.addEventListener("mouseleave", () => {

        element.style.transform = "";

    });

});


/* ============================================================
   MOBILE MENU
============================================================ */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

        menuButton.classList.toggle("active");

    });

}


document
    .querySelectorAll(".mobile-menu a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

        });

    });


/* ============================================================
   PARALLAX HERO
============================================================ */

const heroVisual =
    document.querySelector(".hero-visual");

if (heroVisual) {

    window.addEventListener("mousemove", (event) => {

        const x =
            (window.innerWidth / 2 - event.clientX) / 60;

        const y =
            (window.innerHeight / 2 - event.clientY) / 60;

        heroVisual.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}


/* ============================================================
   CARD TILT
============================================================ */

const tiltCards =
    document.querySelectorAll(
        ".learning-card, .eco-card"
    );


tiltCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - .5) * -6;

        const rotateY =
            ((x / rect.width) - .5) * 6;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-12px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ============================================================
   MOUSE PARALLAX FOR FLOATING SYMBOLS
============================================================ */

const symbols =
    document.querySelectorAll(".floating-symbol");


window.addEventListener("mousemove", (event) => {

    const x =
        (event.clientX / window.innerWidth - .5);

    const y =
        (event.clientY / window.innerHeight - .5);


    symbols.forEach((symbol, index) => {

        const strength =
            (index + 1) * 12;

        symbol.style.transform =
            `translate(
                ${x * strength}px,
                ${y * strength}px
            )`;

    });

});


/* ============================================================
   NUMBER COUNTER
============================================================ */

function animateCounter(element, target) {

    let current = 0;

    const duration = 1200;

    const start = performance.now();

    function update(time) {

        const progress =
            Math.min(
                (time - start) / duration,
                1
            );

        current =
            Math.floor(
                progress * target
            );

        element.textContent =
            current.toLocaleString();

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}


/* ============================================================
   LEVEL NODE INTERACTION
============================================================ */

const levelNodes =
    document.querySelectorAll(".level-node");


levelNodes.forEach((node, index) => {

    node.addEventListener("mouseenter", () => {

        levelNodes.forEach((other) => {

            other.style.opacity =
                other === node ? "1" : ".45";

        });

    });


    node.addEventListener("mouseleave", () => {

        levelNodes.forEach((other) => {

            other.style.opacity = "1";

        });

    });

});


/* ============================================================
   SCROLL PROGRESS
============================================================ */

const scrollProgress =
    document.createElement("div");

scrollProgress.style.position = "fixed";
scrollProgress.style.top = "0";
scrollProgress.style.left = "0";
scrollProgress.style.height = "3px";
scrollProgress.style.width = "0%";
scrollProgress.style.background =
    "var(--yellow)";
scrollProgress.style.zIndex = "10001";
scrollProgress.style.transition =
    "width .1s linear";

document.body.appendChild(scrollProgress);


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        (scrollTop / documentHeight) * 100;

    scrollProgress.style.width =
        `${percentage}%`;

});


/* ============================================================
   IMAGE HOVER MAGNIFICATION
============================================================ */

const logo =
    document.querySelectorAll(
        ".nav-logo img, .cta-logo img, .footer-top img"
    );


logo.forEach((image) => {

    image.addEventListener("mouseenter", () => {

        image.style.transform =
            "scale(1.06) rotate(-2deg)";

    });


    image.addEventListener("mouseleave", () => {

        image.style.transform = "";

    });

});


/* ============================================================
   BUTTON RIPPLE
============================================================ */

document
    .querySelectorAll(
        ".primary-button, .cta-button"
    )
    .forEach((button) => {

        button.addEventListener("click", function(event) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                button.getBoundingClientRect();

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            button.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 700);

        });

    });


/* ============================================================
   ACTIVE SECTION NAVIGATION
============================================================ */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },

        {
            rootMargin:
                "-40% 0px -50% 0px"
        }

    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* ============================================================
   SMOOTH ANCHOR
============================================================ */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

        anchor.addEventListener("click", function(event) {

            const targetId =
                this.getAttribute("href");

            if (
                targetId === "#" ||
                !targetId
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


/* ============================================================
   KONAMI / SECRET EASTER EGG
============================================================ */

let secretCode = [];

const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight"
];


document.addEventListener("keydown", (event) => {

    secretCode.push(event.key);

    if (secretCode.length > konamiCode.length) {

        secretCode.shift();

    }

    if (
        secretCode.join(",") ===
        konamiCode.join(",")
    ) {

        document.body.classList.add(
            "coco-party"
        );

        setTimeout(() => {

            document.body.classList.remove(
                "coco-party"
            );

        }, 5000);

    }

});
