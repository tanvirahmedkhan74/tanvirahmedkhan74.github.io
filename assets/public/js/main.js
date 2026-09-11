/* Tanvir Ahmed Khan — academic portfolio
   Small vanilla JS: mobile nav, scroll-spy, gentle reveals.
   Everything degrades gracefully when JS is disabled. */
(function () {
  'use strict';

  /* ----- Mobile navigation ----- */
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('is-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Menu');
    }
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    });

    menu.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1023) closeMenu();
    });
  }

  /* ----- Scroll-spy: highlight active section in nav ----- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('main section[id]')
  );
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-menu a[href^="#"]')
  );

  function setActive(id) {
    navLinks.forEach(function (link) {
      var target = link.getAttribute('href').replace('#', '');
      if (target === id) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ----- Gentle section reveals ----- */
  var revealables = Array.prototype.slice.call(
    document.querySelectorAll(
      '.direction, .project, .publication, .note, .exp-item, .skills-list li, .about-body p'
    )
  );

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealAll() {
    revealables.forEach(function (el) {
      el.classList.add('is-revealable');
      el.classList.add('is-revealed');
    });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    revealables.forEach(function (el) {
      el.classList.add('is-revealable');
      io.observe(el);
    });

    /* Printing should never print hidden content */
    window.addEventListener('beforeprint', revealAll);
  }

  /* Content inside the collapsed (closed) <details> must reveal on open */
  document.querySelectorAll('.project-extra').forEach(function (details) {
    details.addEventListener('toggle', function () {
      if (!details.open) return;
      details.querySelectorAll('.is-revealable').forEach(function (el) {
        el.classList.add('is-revealed');
      });
    });
  });
})();
