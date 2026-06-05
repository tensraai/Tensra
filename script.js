/**
 * Tensra AI Engineering — Main Script
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

// ── EmailJS configuration ────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
// 2. Create an Email Service (Gmail, Outlook, etc.) → copy the Service ID
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}},
//    {{service}}, {{budget}}, {{message}}, {{reply_to}}
//    Set the "To Email" in the template to: aunarose184@gmail.com
// 4. Copy your Public Key from Account → API Keys and paste it in index.html
// 5. Replace the two IDs below with your own values
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz456'
// ─────────────────────────────────────────────────────────────

if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) return;

  setSubmitState('loading');

  // Collect form data
  const formData = new FormData(contactForm);
  const data     = Object.fromEntries(formData.entries());

  // Build the template params that match your EmailJS template variables
  const templateParams = {
    from_name:  data.name    || '',
    from_email: data.email   || '',
    service:    data.service || 'Not specified',
    budget:     data.budget  || 'Not specified',
    message:    data.message || '',
    reply_to:   data.email   || '',
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      showSuccess();
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
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
    if (btnText) btnText.textContent = 'Sending…';
    if (btnIcon) btnIcon.style.display = 'none';
  } else if (state === 'error') {
    submitBtn.disabled = false;
    if (btnText) btnText.textContent = 'Send Failed — Try Again';
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

// ============================================================
// 7. TESTIMONIAL CAROUSEL (MOBILE) & KPI COUNTERS
// ============================================================

function initTestimonials() {
  initKpiCounters();
  initCarousel();
}

/** Animate KPI stat cards on scroll into view */
function initKpiCounters() {
  const cards = document.querySelectorAll('.t-kpi-value');
  if (!cards.length || !('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el       = entry.target;
      const target   = parseFloat(el.dataset.target);
      const suffix   = el.dataset.suffix || '';
      const duration = 1400;
      const start    = performance.now();
      const isInt    = Number.isInteger(target);

      // Special case: 162/162
      if (el.dataset.suffix === '/162') {
        let count = 0;
        const step = () => {
          count = Math.min(count + 4, 162);
          el.textContent = `${count}/162`;
          if (count < 162) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
        return;
      }

      // Special case: already 0
      if (target === 0) {
        el.textContent = '0' + suffix;
        obs.unobserve(el);
        return;
      }

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const value    = eased * target;
        el.textContent = (isInt ? Math.round(value) : value.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(update);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });

  cards.forEach(el => obs.observe(el));
}

/** Mobile swipe carousel for testimonial cards */
function initCarousel() {
  const grid     = document.getElementById('t-grid');
  const prevBtn  = document.getElementById('t-prev');
  const nextBtn  = document.getElementById('t-next');
  const dotsEl   = document.getElementById('t-dots');

  if (!grid || !prevBtn || !nextBtn || !dotsEl) return;

  const cards    = Array.from(grid.querySelectorAll('.t-card'));
  let current    = 0;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 't-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.setAttribute('aria-selected', String(i === 0));
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    current = (index + cards.length) % cards.length;

    // Only scroll in mobile (carousel) mode
    if (window.innerWidth < 768) {
      const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(grid).gap || '0');
      grid.scrollTo({ left: current * cardWidth, behavior: 'smooth' });
    }

    // Update dots
    dotsEl.querySelectorAll('.t-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-selected', String(i === current));
    });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Sync dots with native scroll
  grid.addEventListener('scroll', () => {
    if (window.innerWidth >= 768) return;
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(grid).gap || '0');
    const idx = Math.round(grid.scrollLeft / cardWidth);
    if (idx !== current) {
      current = idx;
      dotsEl.querySelectorAll('.t-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }
  }, { passive: true });
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
  initTestimonials();

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
