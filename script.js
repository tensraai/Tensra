/**
 * Tensra AI — Main Script
 * Handles: navigation, scroll effects, reveal animations, form submission
 */

'use strict';

// ============================================================
// 1. NAVIGATION
// ============================================================

const navHeader  = document.getElementById('nav-header');
const navToggle  = document.getElementById('nav-toggle');
const navLinks   = document.getElementById('nav-links');

/**
 * Sticky nav: add .scrolled class when user scrolls past the fold
 */
function handleNavScroll() {
  if (window.scrollY > 40) {
    navHeader.classList.add('scrolled');
  } else {
    navHeader.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run on load

/**
 * Mobile hamburger toggle
 */
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ============================================================
// 2. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ============================================================
// 3. SCROLL REVEAL ANIMATIONS
// ============================================================

/**
 * Add .reveal class to elements we want to animate on scroll.
 * This is applied dynamically so that if JS is disabled the
 * elements remain visible.
 */
const REVEAL_SELECTORS = [
  '.pillar-card',
  '.service-card',
  '.process-step',
  '.wl-benefit-card',
  '.retainer-feature',
  '.founder-card',
  '.about-content',
  '.about-pillars',
  '.section-header',
  '.wl-content',
  '.wl-benefits',
  '.retainer-card',
  '.contact-info',
  '.contact-form-wrapper',
  '.trust-bar',
];

function addRevealClasses() {
  REVEAL_SELECTORS.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        // Stagger delay for grid children
        const parent = el.parentElement;
        if (parent) {
          const siblings = parent.querySelectorAll(':scope > .reveal');
          const position = Array.from(siblings).indexOf(el);
          if (position > 0 && position <= 4) {
            el.classList.add(`reveal-delay-${position}`);
          }
        }
      }
    });
  });
}

function createRevealObserver() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================================
// 4. METRIC COUNTER ANIMATION
// ============================================================

/**
 * Animate number counters in the hero metrics section
 */
function animateCounter(el, target, suffix = '', duration = 1500) {
  const start = performance.now();
  const isDecimal = String(target).includes('.');
  const decimals  = isDecimal ? String(target).split('.')[1].length : 0;

  function update(timestamp) {
    const elapsed  = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;

    el.textContent = value.toFixed(decimals) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const metricValues = document.querySelectorAll('.metric-value');

  if (!('IntersectionObserver' in window)) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el   = entry.target;
        const text = el.textContent.trim();

        // Parse each metric
        if (text === '162/162') {
          let count = 0;
          const total = 162;
          const step = () => {
            count = Math.min(count + 3, total);
            el.textContent = `${count}/${total}`;
            if (count < total) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        } else if (text === '90.9') {
          animateCounter(el, 90.9, '', 1400);
        } else if (text === '200') {
          animateCounter(el, 200, '', 1200);
        } else if (text === '0') {
          // already 0, just ensure it shows
          el.textContent = '0';
        }

        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  metricValues.forEach(el => counterObserver.observe(el));
}

// ============================================================
// 5. CONTACT FORM
// ============================================================

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn   = document.getElementById('submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) return;

  setSubmitState('loading');

  const formData = new FormData(contactForm);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showSuccess();
        contactForm.reset();
      } else {
        console.error('Web3Forms error:', data);
        setSubmitState('error');
      }
    })
    .catch(err => {
      console.error('Submission error:', err);
      setSubmitState('error');
    });
}

function validateForm() {
  let valid = true;

  // Clear previous errors
  contactForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const message = document.getElementById('message');

  if (!name.value.trim()) {
    name.classList.add('error');
    name.focus();
    valid = false;
  }

  if (!email.value.trim() || !isValidEmail(email.value)) {
    if (valid) email.focus();
    email.classList.add('error');
    valid = false;
  }

  if (!message.value.trim()) {
    if (valid) message.focus();
    message.classList.add('error');
    valid = false;
  }

  return valid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setSubmitState(state) {
  if (!submitBtn) return;

  const btnText = submitBtn.querySelector('.btn-text');
  const btnIcon = submitBtn.querySelector('.btn-icon');

  if (state === 'loading') {
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Sent';
    if (btnIcon) btnIcon.style.display = 'none';
  } else if (state === 'error') {
    submitBtn.disabled = false;
    if (btnText) btnText.textContent = 'Try Again';
    if (btnIcon) btnIcon.style.display = '';
  }
}

function showSuccess() {
  if (contactForm && formSuccess) {
    contactForm.hidden = true;
    formSuccess.hidden = false;
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ============================================================
// 6. ACTIVE NAV HIGHLIGHTING (SCROLLSPY)
// ============================================================

function initScrollSpy() {
  const sections    = Array.from(document.querySelectorAll('section[id]'));
  const navLinkEls  = document.querySelectorAll('.nav-link');
  const NAV_HEIGHT  = 80; // px offset from top

  if (!sections.length || !navLinkEls.length) return;

  function getActiveId() {
    // Work backwards — the last section whose top edge is at or above
    // the nav offset is the "active" one
    let activeId = sections[0].id;
    for (const section of sections) {
      const top = section.getBoundingClientRect().top;
      if (top <= NAV_HEIGHT + 10) {
        activeId = section.id;
      }
    }
    return activeId;
  }

  function updateActiveLink() {
    const activeId = getActiveId();
    navLinkEls.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${activeId}`);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink(); // set on load
}


function initCardTilt() {
  const cards = document.querySelectorAll('.service-card, .pillar-card, .founder-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const tiltX  = ((y - cy) / cy) * 3;  // max 3deg
      const tiltY  = ((cx - x) / cx) * 3;

      card.style.transform = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ============================================================
// 8. INIT
// ============================================================

function init() {
  addRevealClasses();
  createRevealObserver();
  initCounters();
  initScrollSpy();

  // Only enable tilt on non-touch devices
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    initCardTilt();
  }
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
