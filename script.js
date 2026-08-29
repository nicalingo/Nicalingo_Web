document.getElementById('year').textContent = new Date().getFullYear();

(function cursorGlow(){
  const glow = document.getElementById('cursorGlow');
  if(!glow) return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // sin mouse real, no molestar

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let x = targetX, y = targetY;
  let active = false;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    if(!active){ active = true; glow.classList.add('is-active'); }
  }, { passive: true });

  window.addEventListener('mouseleave', () => glow.classList.remove('is-active'));

  function raf(){

    x += (targetX - x) * 0.12;
    y += (targetY - y) * 0.12;
    glow.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(raf);
  }
  raf();
})();


(function headerScroll(){
  const header = document.getElementById('siteHeader');
  if(!header) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


(function mobileNav(){
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if(!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();


(function scrollReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;

  if(!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
})();
