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
const reveals =
document.querySelectorAll(".reveal");
/*
Primero nos aseguramos de que todos
puedan ser mostrados por JavaScript.
*/
/*
Antes se marcaba will-change en TODOS los .reveal desde el
arranque (a veces 20-30 elementos en toda la página), lo que
reserva memoria de GPU de más en equipos modestos. Ahora solo
se activa justo antes de que el elemento entre en pantalla y
se quita cuando termina su propia transición.
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
const el = entry.target;
el.style.willChange =
"opacity, transform";
el.classList
.add("is-visible");
el.addEventListener(
"transitionend",
() => {
el.style.willChange = "";
},
{ once: true }
);
observer.unobserve(el);
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
/*
Antes: cada micro-movimiento del mouse llamaba
getBoundingClientRect() y aplicaba el transform de
inmediato (sin transición ni límite de frecuencia),
lo que puede saturar el hilo principal en equipos
modestos. Ahora el cálculo se agenda con
requestAnimationFrame (máximo una actualización por
frame) y el rect se toma una sola vez al entrar el
mouse, no en cada movimiento.
*/
const magneticElements =
document.querySelectorAll(
".magnetic"
);
magneticElements.forEach(element => {
let rect = null;
let rafId = null;
let pendingX = 0;
let pendingY = 0;
element.addEventListener(
"pointerenter",
() => {
if (window.innerWidth < 850) return;
rect = element.getBoundingClientRect();
element.classList.add("is-tracking");
}
);
element.addEventListener(
"pointermove",
event => {
if (window.innerWidth < 850 || !rect)
return;
pendingX =
event.clientX -
rect.left -
rect.width / 2;
pendingY =
event.clientY -
rect.top -
rect.height / 2;
if (rafId) return;
rafId = requestAnimationFrame(() => {
element.style.transform =
`translate(${pendingX * 0.15}px, ${pendingY * 0.15}px)`;
rafId = null;
});
},
{ passive: true }
);
element.addEventListener(
"pointerleave",
() => {
if (rafId) {
cancelAnimationFrame(rafId);
rafId = null;
}
rect = null;
element.classList.remove("is-tracking");
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
let rect = null;
let rafId = null;
let pendingRotateX = 0;
let pendingRotateY = 0;
card.addEventListener(
"pointerenter",
() => {
if (window.innerWidth < 900) return;
rect = card.getBoundingClientRect();
}
);
card.addEventListener(
"pointermove",
event => {
if (window.innerWidth < 900 || !rect)
return;
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
pendingRotateX = y * -4;
pendingRotateY = x * 4;
if (rafId) return;
rafId = requestAnimationFrame(() => {
card.style.transform =
`perspective(900px) rotateX(${pendingRotateX}deg) rotateY(${pendingRotateY}deg) translateY(-7px)`;
rafId = null;
});
},
{ passive: true }
);
card.addEventListener(
"pointerleave",
() => {
if (rafId) {
cancelAnimationFrame(rafId);
rafId = null;
}
rect = null;
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
let glowRaf = null;
let glowX = 0;
let glowY = 0;
window.addEventListener(
"pointermove",
event => {
glowX = event.clientX;
glowY = event.clientY;
if (glowRaf) return;
glowRaf = requestAnimationFrame(() => {
cursorGlow.style.left = `${glowX}px`;
cursorGlow.style.top = `${glowY}px`;
glowRaf = null;
});
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
let heroRect = null;
let heroRaf = null;
let pendingHeroX = 0;
let pendingHeroY = 0;
heroVisual.addEventListener(
"pointerenter",
() => {
if (window.innerWidth < 900) return;
heroRect = heroVisual.getBoundingClientRect();
}
);
heroVisual.addEventListener(
"pointermove",
event => {
if (window.innerWidth < 900 || !heroRect)
return;
const x =
(event.clientX -
heroRect.left) /
heroRect.width -
0.5;
const y =
(event.clientY -
heroRect.top) /
heroRect.height -
0.5;
pendingHeroX = x * 8;
pendingHeroY = y * 6;
if (heroRaf) return;
heroRaf = requestAnimationFrame(() => {
heroVisual.style.transform =
`translate(${pendingHeroX}px, ${pendingHeroY}px)`;
heroRaf = null;
});
},
{ passive: true }
);
heroVisual.addEventListener(
"pointerleave",
() => {
if (heroRaf) {
cancelAnimationFrame(heroRaf);
heroRaf = null;
}
heroRect = null;
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
/*
Antes había un mouseenter/mouseleave en JS que agregaba
la clase "node-focus", pero esa clase nunca tuvo estilo
en el CSS — era idéntico a no hacer nada, porque
":hover" en CSS ya cubre el mismo efecto (el escalado del
nodo). Se quita para no ejecutar JS de más en cada
movimiento del mouse.
*/
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
