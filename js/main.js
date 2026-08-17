/* =========================================================================
   Chinyere Clara Mmiliogu — Portfolio
   Interactivity: mobile nav, navbar scroll state, scroll-spy, reveal
   animations, animated counters, back-to-top, offset smooth scroll.
   ========================================================================= */
(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('menu-open-icon');
  const closeIcon = document.getElementById('menu-close-icon');
  const backToTop = document.getElementById('back-to-top');
  const navHeight = 72;

  /* ----------------------------------------------------------------------
     Footer year
     ---------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------------------
     Mobile menu toggle
     ---------------------------------------------------------------------- */
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('hidden');
    openIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    if (!mobileMenu) return;
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    openIcon.classList.toggle('hidden', isHidden);
    closeIcon.classList.toggle('hidden', !isHidden);
    menuToggle.setAttribute('aria-expanded', String(isHidden));
  }
  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);

  // Close the mobile menu after tapping a link
  document.querySelectorAll('#mobile-menu a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ----------------------------------------------------------------------
     Navbar solid state + back-to-top visibility on scroll
     ---------------------------------------------------------------------- */
  function onScroll() {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('nav-scrolled', y > 40);
    if (backToTop) backToTop.classList.toggle('is-visible', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------------------
     Smooth scroll with fixed-navbar offset for all in-page anchors
     ---------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (navHeight - 2);
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------------------
     Scroll-spy — highlight the nav link for the section in view
     ---------------------------------------------------------------------- */
  const sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  const navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link, .mobile-link'));

  function linksFor(id) {
    return navLinks.filter(function (l) { return l.getAttribute('href') === '#' + id; });
  }

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); });
          linksFor(entry.target.id).forEach(function (l) { l.classList.add('is-active'); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ----------------------------------------------------------------------
     Reveal-on-scroll animations
     ---------------------------------------------------------------------- */
  const revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // No IntersectionObserver support → show everything
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----------------------------------------------------------------------
     Animated number counters (fires once when the stat scrolls into view)
     ---------------------------------------------------------------------- */
  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(easeOutCubic(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const counters = Array.prototype.slice.call(document.querySelectorAll('.stat-number'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    // Skip the animation but still show the final values
    counters.forEach(function (el) {
      el.textContent = (el.getAttribute('data-count') || '0') + (el.getAttribute('data-suffix') || '');
    });
  } else if ('IntersectionObserver' in window && counters.length) {
    const countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObserver.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = (el.getAttribute('data-count') || '0') + (el.getAttribute('data-suffix') || '');
    });
  }
})();
