/**
 * Sterling Medical Centre — Redesign JavaScript
 * Handles scroll animations, mobile menu, form validation,
 * count-up stats, progress bar, back-to-top, and active nav tracking.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========== Scroll-triggered fade-up animations ==========
  const fadeElements = document.querySelectorAll('.fade-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ========== Mobile menu ==========
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuClose = document.getElementById('menu-close');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

  function openMenu() {
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Focus trap: focus first link
    mobileLinks[0].focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuToggle.focus();
  }

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // Focus trap within mobile menu
  mobileMenu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    const focusableElements = mobileMenu.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  });

  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ========== Progress bar ==========
  const progressBar = document.getElementById('progressBar');
  
  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }

  // ========== Nav compact on scroll ==========
  const navbar = document.getElementById('navbar');
  
  function updateNav() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ========== Back to top ==========
  const backToTop = document.getElementById('backToTop');
  
  function updateBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== Active nav link tracking ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  // ========== Count-up stats ==========
  const statNumbers = document.querySelectorAll('.trust__number[data-count]');
  let statsAnimated = false;

  function animateCountUp(element) {
    const target = parseInt(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      
      element.textContent = current.toLocaleString() + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(el => animateCountUp(el));
      }
    });
  }, { threshold: 0.5 });

  const trustSection = document.getElementById('trust');
  if (trustSection) {
    statsObserver.observe(trustSection);
  }

  // ========== Form validation ==========
  const form = document.getElementById('booking-form');
  const formSuccess = document.getElementById('form-success');

  function showError(input, message) {
    input.classList.add('error');
    const errorId = input.id + '-error';
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearError(input) {
    input.classList.remove('error');
    const errorId = input.id + '-error';
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name validation
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your name');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Email validation
    const emailInput = document.getElementById('email');
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Please enter your email');
      isValid = false;
    } else if (!validateEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Phone validation (optional, but validate format if provided)
    const phoneInput = document.getElementById('phone');
    if (phoneInput.value.trim()) {
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,}$/;
      if (!phoneRegex.test(phoneInput.value.trim())) {
        showError(phoneInput, 'Please enter a valid phone number');
        isValid = false;
      } else {
        clearError(phoneInput);
      }
    } else {
      clearError(phoneInput);
    }

    // Message validation
    const messageInput = document.getElementById('message');
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Please enter a message');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      // Show success message
      formSuccess.hidden = false;
      form.reset();
      
      // Hide success after 5 seconds
      setTimeout(() => {
        formSuccess.hidden = true;
      }, 5000);
    }
  });

  // Clear errors on input
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });

  // ========== FAQ accordion ==========
  const faqTriggers = document.querySelectorAll('.faq__trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isOpen = item.classList.contains('open');

      // Close all other FAQ items
      document.querySelectorAll('.faq__item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq__trigger').setAttribute('aria-expanded', 'false');
          openItem.querySelector('.faq__answer').setAttribute('aria-hidden', 'true');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
      } else {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        answer.setAttribute('aria-hidden', 'false');
      }
    });
  });

  // ========== Button ripple effect ==========
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // ========== Smooth scroll with nav offset ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== Scroll event listener (throttled) ==========
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgressBar();
        updateNav();
        updateBackToTop();
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial calls
  updateProgressBar();
  updateNav();
  updateBackToTop();
  updateActiveNav();

  // ========== Copyright year ==========
  const yearElement = document.getElementById('copyright-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});