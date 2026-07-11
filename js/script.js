/* ============================================
   Sterling Medical Centre — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Dynamic Year ---
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Dark Mode Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  function applyDark(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    applyDark(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = !document.documentElement.classList.contains('dark');
      applyDark(isDark);
    });
  }

  // --- Navbar Scroll ---
  const nav = document.querySelector('.nav');
  const progressBar = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (currentScroll / docHeight) * 100 : 0;

    if (currentScroll > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }

    if (backToTop) {
      backToTop.classList.toggle('back-to-top--visible', currentScroll > 400);
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Active nav link on scroll ---
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = [];

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) sections.push({ el: section, link: link });
    }
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('nav__link--active'));
        const match = sections.find(s => s.el === entry.target);
        if (match) match.link.classList.add('nav__link--active');
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '-80px 0px 0px 0px'
  });

  sections.forEach(s => sectionObserver.observe(s.el));

  // --- Mobile Menu ---
  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  const closeBtn = document.getElementById('menu-close');

  function openMenu() {
    mobileMenu.classList.add('mobile-menu--open');
    overlay.classList.add('mobile-menu__overlay--open');
    toggleBtn.classList.add('nav__toggle--open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('mobile-menu--open');
    overlay.classList.remove('mobile-menu__overlay--open');
    toggleBtn.classList.remove('nav__toggle--open');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close mobile menu on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- Scroll-triggered animations (Intersection Observer) ---
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up--visible');
        animObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.fade-up').forEach(el => {
    animObserver.observe(el);
  });

  // --- Form Submission ---
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {

    // Inline validation helpers
    const requiredInputs = bookingForm.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (!input.value.trim()) {
          input.classList.add('form__input--error');
        } else {
          input.classList.remove('form__input--error');
          input.classList.add('form__input--valid');
        }
      });
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          input.classList.remove('form__input--error');
          input.classList.add('form__input--valid');
        } else {
          input.classList.remove('form__input--valid');
        }
      });
    });

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('form__input--error');
          hasError = true;
        } else {
          input.classList.remove('form__input--error');
          input.classList.add('form__input--valid');
        }
      });

      if (hasError) return;

      const btn = bookingForm.querySelector('.btn--submit');
      btn.textContent = 'Booking...';
      btn.disabled = true;

      const existingMsg = bookingForm.querySelector('.form__success');
      if (existingMsg) existingMsg.remove();

      setTimeout(() => {
        btn.style.display = 'none';

        const successMsg = document.createElement('p');
        successMsg.className = 'form__success';
        successMsg.textContent = 'Your visit request has been received. We\'ll reach out within 24 hours to confirm.';
        btn.parentNode.insertBefore(successMsg, btn);

        bookingForm.reset();
        requiredInputs.forEach(input => {
          input.classList.remove('form__input--valid', 'form__input--error');
        });

        const dismissForm = () => {
          successMsg.remove();
          btn.style.display = '';
          btn.textContent = 'Book Your Visit';
          btn.disabled = false;
          bookingForm.removeEventListener('focusin', dismissForm);
          bookingForm.removeEventListener('change', dismissForm);
        };
        bookingForm.addEventListener('focusin', dismissForm, { once: true });
        bookingForm.addEventListener('change', dismissForm, { once: true });
      }, 1500);
    });
  }

  // --- Smooth scroll with offset ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });

});
