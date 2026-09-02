/**
 * Tensra AI — Main Script
 * Navigation · scroll effects · reveal animations · form submission · scrollspy · hero globe parallax
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
  '.process-step',
  '.contact-info', '.contact-form-wrapper', '.stat-block',
  '.brikline-main', '.brikline-flow', '.project-card', '.use-case-item'
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

/* ===== 6. HERO GLOBE SCROLL PARALLAX ===== */
// The hero globe is position:fixed in CSS so it stays put while the page
// scrolls over it, like a persistent background element rather than
// something that scrolls away with the hero section. This function fades
// it out and adds a subtle rotation/scale drift as the user scrolls past
// the hero, so it reads as "the globe stays behind, the page moves past
// it" — matching the reference site's behavior.
function initGlobeParallax() {
  const scene = document.querySelector('.hero-globe-scene');
  if (!scene) return;

  function update() {
    // The globe belongs to the hero only. It stays still (no rotation) and
    // fades out over roughly one viewport of scroll, so it's fully gone
    // well before the next section — it does not persist down the page.
    const fadeDistance = window.innerHeight * 0.85;
    const progress = Math.min(window.scrollY / fadeDistance, 1);
    const opacity = 0.9 * (1 - progress);

    scene.style.opacity = opacity.toFixed(3);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

/* ===== 8. INIT ===== */
function init() {
  addRevealClasses();
  createRevealObserver();
  initScrollSpy();
  initGlobeParallax();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();