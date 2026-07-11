/* ============================================
   Sterling Medical Centre — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Dynamic Year ---
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--open')) {
      closeMenu();
    }
  });

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

  // --- Count-up animation for stats ---
  const countEls = document.querySelectorAll('[data-count]');
  if (countEls.length) {
    const countObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 1500;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = target >= 1000
            ? current.toLocaleString() + '+'
            : current;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });

    countEls.forEach(el => countObserver.observe(el));
  }

  // --- Form Submission ---
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {

    function getOrCreateError(input) {
      let err = input.parentNode.querySelector('.form__error');
      if (!err) {
        err = document.createElement('span');
        err.className = 'form__error';
        err.id = 'error-' + input.id;
        err.setAttribute('role', 'alert');
        input.setAttribute('aria-describedby', err.id);
        input.parentNode.appendChild(err);
      }
      return err;
    }

    function validateField(input) {
      const err = getOrCreateError(input);
      const val = input.value.trim();

      if (!val) {
        input.classList.add('form__input--error');
        input.classList.remove('form__input--valid');
        err.textContent = 'This field is required';
        return false;
      }

      if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        input.classList.add('form__input--error');
        input.classList.remove('form__input--valid');
        err.textContent = 'Enter a valid email address';
        return false;
      }

      if (input.type === 'tel' && !/^[\d\s\+\-\(\)]{7,20}$/.test(val)) {
        input.classList.add('form__input--error');
        input.classList.remove('form__input--valid');
        err.textContent = 'Enter a valid phone number';
        return false;
      }

      input.classList.remove('form__input--error');
      input.classList.add('form__input--valid');
      err.textContent = '';
      return true;
    }

    // Inline validation helpers
    const requiredInputs = bookingForm.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          input.classList.remove('form__input--error');
          input.classList.add('form__input--valid');
          const err = input.parentNode.querySelector('.form__error');
          if (err) err.textContent = '';
        } else {
          input.classList.remove('form__input--valid');
        }
      });
    });

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      requiredInputs.forEach(input => {
        if (!validateField(input)) hasError = true;
      });

      if (hasError) {
        const firstErr = bookingForm.querySelector('.form__input--error');
        if (firstErr) firstErr.focus();
        return;
      }

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
          const err = input.parentNode.querySelector('.form__error');
          if (err) err.textContent = '';
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
