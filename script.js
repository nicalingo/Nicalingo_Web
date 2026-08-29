const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const heroArt = document.querySelector("#heroArt");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    navLinks.classList.toggle("mobile-open", !open);
  });
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("mobile-open");
    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

/* Parallax muy sutil del hero. No mueve el logo de forma exagerada. */
if (heroArt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroArt.addEventListener("pointermove", (e) => {
    const rect = heroArt.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroArt.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0)`;
  });
  heroArt.addEventListener("pointerleave", () => {
    heroArt.style.transform = "";
  });
}

/* Tarjetas con inclinación ligera al pasar el cursor */
document.querySelectorAll(".module-card, .value").forEach(card => {
  card.addEventListener("pointermove", (e) => {
    if (window.innerWidth < 900) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateY(-8px)`;
  });
  card.addEventListener("pointerleave", () => card.style.transform = "");
});

/* Cierra cualquier menú al cambiar a escritorio */
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    navLinks?.classList.remove("mobile-open");
    menuBtn?.setAttribute("aria-expanded", "false");
  }
});
