/**
 * Tensra AI — Main Script
 * Navigation · scroll effects · reveal animations · form submission · scrollspy
 */
'use strict';

/* ===== 1. NAVIGATION ===== */
const navHeader = document.getElementById('nav-header');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

function handleNavScroll() {
  if (window.scrollY > 30) navHeader.classList.add('scrolled');
  else navHeader.classList.remove('scrolled');
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

function closeMenu() {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      closeMenu();
    }
  });
}

/* ===== 2. SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ===== 3. SCROLL REVEAL ===== */
const REVEAL_SELECTORS = [
  '.section-header', '.about-content', '.pillar-card', '.service-card',
  '.process-step', '.wl-content', '.wl-benefit-card', '.retainer-card',
  '.contact-info', '.contact-form-wrapper', '.stat-block'
];

function addRevealClasses() {
  REVEAL_SELECTORS.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (el.classList.contains('reveal')) return;
      el.classList.add('reveal');
      const parent = el.parentElement;
      if (parent) {
        const siblings = parent.querySelectorAll(':scope > .reveal');
        const pos = Array.from(siblings).indexOf(el);
        if (pos > 0 && pos <= 4) el.classList.add(`reveal-delay-${pos}`);
      }
    });
  });
}

function createRevealObserver() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ===== 4. CONTACT FORM ===== */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn   = document.getElementById('submit-btn');

if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  if (!validateForm()) return;
  setSubmitState('loading');

  fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(contactForm) })
    .then(r => r.json())
    .then(data => {
      if (data.success) { showSuccess(); contactForm.reset(); }
      else { console.error('Web3Forms error:', data); setSubmitState('error'); }
    })
    .catch(err => { console.error('Submission error:', err); setSubmitState('error'); });
}

function validateForm() {
  let valid = true;
  contactForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  if (!name.value.trim()) { name.classList.add('error'); name.focus(); valid = false; }
  if (!email.value.trim() || !isValidEmail(email.value)) { if (valid) email.focus(); email.classList.add('error'); valid = false; }
  if (!message.value.trim()) { if (valid) message.focus(); message.classList.add('error'); valid = false; }
  return valid;
}

function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function setSubmitState(state) {
  if (!submitBtn) return;
  const text = submitBtn.querySelector('.btn-text');
  const icon = submitBtn.querySelector('.btn-icon');
  if (state === 'loading') {
    submitBtn.disabled = true;
    if (text) text.textContent = 'Sending…';
    if (icon) icon.style.display = 'none';
  } else if (state === 'error') {
    submitBtn.disabled = false;
    if (text) text.textContent = 'Try again';
    if (icon) icon.style.display = '';
  }
}

function showSuccess() {
  if (contactForm && formSuccess) {
    contactForm.hidden = true;
    formSuccess.hidden = false;
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/* ===== 5. SCROLLSPY ===== */
function initScrollSpy() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const links = document.querySelectorAll('.nav-link');
  const OFFSET = 90;
  if (!sections.length || !links.length) return;

  function activeId() {
    let id = sections[0].id;
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= OFFSET + 10) id = s.id;
    }
    return id;
  }
  function update() {
    const id = activeId();
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* ===== 7. HERO GRADIENT CANVAS (abstract 3D render) ===== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let w, h, t = 0;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  // floating metaballs — soft glowing orbs that drift and morph
  const blobs = [
    { x: .30, y: .42, r: .42, hue: [24, 210, 255],  sx: .00021, sy: .00017, px: 0,    py: 1.7 },
    { x: .68, y: .38, r: .38, hue: [91, 107, 255],   sx: .00018, sy: .00023, px: 2.1,  py: .6 },
    { x: .52, y: .60, r: .34, hue: [60, 170, 255],   sx: .00025, sy: .00015, px: 4.0,  py: 3.2 },
    { x: .42, y: .30, r: .26, hue: [130, 90, 255],   sx: .00020, sy: .00020, px: 1.0,  py: 5.0 }
  ];

  function resize() {
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * DPR; canvas.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function draw() {
    t += 1;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    for (const b of blobs) {
      const cx = (b.x + Math.sin(t * b.sx + b.px) * 0.10) * w;
      const cy = (b.y + Math.cos(t * b.sy + b.py) * 0.10) * h;
      const rad = b.r * Math.min(w, h) * (1 + Math.sin(t * 0.0006 + b.px) * 0.08);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      const [r, gr, bl] = b.hue;
      g.addColorStop(0,   `rgba(${r},${gr},${bl},0.55)`);
      g.addColorStop(0.4, `rgba(${r},${gr},${bl},0.18)`);
      g.addColorStop(1,   `rgba(${r},${gr},${bl},0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  draw();
}

/* ===== 8. INIT ===== */
function init() {
  addRevealClasses();
  createRevealObserver();
  initScrollSpy();
  initHeroCanvas();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();