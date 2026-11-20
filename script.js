/* ==========================================================================
   GTA VI — Vanilla JavaScript
   Beginner-friendly, no build tools required, no email storage in browser.
   ========================================================================== */

// 1. Easy-to-edit site configuration
const SITE_CONFIG = {
  // Change this name to rename the site everywhere it uses [data-site-name]
  siteName: "MYGAME STORE",
  // Future backend endpoint (leave null in preview mode; never store API secrets here)
  newsletterEndpoint: null,
};

document.addEventListener("DOMContentLoaded", () => {
  applySiteName(SITE_CONFIG.siteName);
  initMobileNav();
  initScrollReveal();
  initHeroSlider();
  initNewsletterPreview();
});

/**
 * Updates all elements marked with [data-site-name] so renaming is effortless.
 */
function applySiteName(name) {
  const nameNodes = document.querySelectorAll("[data-site-name]");
  nameNodes.forEach((node) => {
    node.textContent = name;
  });
}

/**
 * Accessible mobile navigation toggle + close on link click / Escape key.
 */
function initMobileNav() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggleBtn || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggleBtn.focus();
    }
  });
}

/**
 * Subtle scroll-reveal animation, disabled automatically when user prefers reduced motion.
 */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

/**
 * Newsletter preview handler.
 * IMPORTANT: Never saves email addresses to localStorage, sessionStorage, or JS memory.
 */
function initNewsletterPreview() {
  const form = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("newsletter-email");
  const consentBox = document.getElementById("newsletter-consent");
  const statusEl = document.getElementById("newsletter-status");

  if (!form || !emailInput || !consentBox || !statusEl) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleNewsletterSubmit(emailInput.value.trim(), consentBox.checked, statusEl);
  });
}

function handleNewsletterSubmit(emailValue, hasConsent, statusEl) {
  if (!emailValue) {
    statusEl.textContent = "Please enter an email address to test the preview form.";
    return;
  }

  if (!hasConsent) {
    statusEl.textContent = "Please check the consent box before submitting.";
    return;
  }

  // Preview mode: do not save or send the email address anywhere.
  if (!SITE_CONFIG.newsletterEndpoint) {
    statusEl.textContent =
      "Newsletter signup is a preview and is not connected yet. Your email has not been saved.";
    return;
  }

  // Future integration hook:
  // When ready, send a POST request to your own secure backend or serverless function
  // (never put provider secret API keys in this frontend file).
}

/**
 * 5-slide Hero Showcase Carousel (pauses on hover/focus and respects reduced motion).
 */
function initHeroSlider() {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  const dots = Array.from(slider.querySelectorAll(".hero-slider__dot"));
  const prevBtn = slider.querySelector(".hero-slider__btn--prev");
  const nextBtn = slider.querySelector(".hero-slider__btn--next");
  if (!slides.length) return;

  let currentIndex = 0;
  let timerId = null;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === currentIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === currentIndex;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", String(active));
    });
  };

  const stopAuto = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  const startAuto = () => {
    if (prefersReducedMotion) return;
    stopAuto();
    timerId = setInterval(() => showSlide(currentIndex + 1), 5000);
  };

  prevBtn?.addEventListener("click", () => {
    showSlide(currentIndex - 1);
    startAuto();
  });

  nextBtn?.addEventListener("click", () => {
    showSlide(currentIndex + 1);
    startAuto();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startAuto();
    });
  });

  slider.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showSlide(currentIndex - 1);
      startAuto();
    } else if (event.key === "ArrowRight") {
      showSlide(currentIndex + 1);
      startAuto();
    }
  });

  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);
  slider.addEventListener("focusin", stopAuto);
  slider.addEventListener("focusout", startAuto);

  startAuto();
}
document.addEventListener("DOMContentLoaded", () => {
  const widget = document.getElementById("map-widget");
  const viewport = document.getElementById("map-viewport");
  const img = document.getElementById("map-image");
  const zoomInBtn = document.getElementById("map-zoom-in");
  const zoomOutBtn = document.getElementById("map-zoom-out");
  const fsBtn = document.getElementById("map-fullscreen");
  if (!widget || !viewport || !img) return;

  let scale = 1, x = 0, y = 0, dragging = false, startX = 0, startY = 0;

  const updateTransform = () => {
    img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  };

  zoomInBtn?.addEventListener("click", () => {
    scale = Math.min(scale + 0.35, 4);
    updateTransform();
  });

  zoomOutBtn?.addEventListener("click", () => {
    scale = Math.max(scale - 0.35, 1);
    if (scale === 1) { x = 0; y = 0; }
    updateTransform();
  });

  viewport.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.clientX - x;
    startY = e.clientY - y;
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    x = e.clientX - startX;
    y = e.clientY - startY;
    updateTransform();
  });

  window.addEventListener("mouseup", () => { dragging = false; });

  fsBtn?.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      widget.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const widget = document.getElementById("map-widget");
  const viewport = document.getElementById("map-viewport");
  const img = document.getElementById("map-image");
  const zoomInBtn = document.getElementById("map-zoom-in");
  const zoomOutBtn = document.getElementById("map-zoom-out");
  const fsBtn = document.getElementById("map-fullscreen");
  if (!widget || !viewport || !img) return;

  let scale = 1, x = 0, y = 0, dragging = false, startX = 0, startY = 0;

  const updateTransform = () => {
    img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  };

  zoomInBtn?.addEventListener("click", () => {
    scale = Math.min(scale + 0.35, 4);
    updateTransform();
  });

  zoomOutBtn?.addEventListener("click", () => {
    scale = Math.max(scale - 0.35, 1);
    if (scale === 1) { x = 0; y = 0; }
    updateTransform();
  });

  viewport.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.clientX - x;
    startY = e.clientY - y;
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    x = e.clientX - startX;
    y = e.clientY - startY;
    updateTransform();
  });

  window.addEventListener("mouseup", () => { dragging = false; });

  fsBtn?.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      widget.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
});
// Mouse wheel / trackpad scroll zoom
  viewport.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault(); // keeps the whole page from scrolling while zooming
      const step = e.deltaY < 0 ? 0.25 : -0.25;
      scale = Math.min(Math.max(scale + step, 1), 4);
      if (scale === 1) {
        x = 0;
        y = 0;
      }
      updateTransform();
    },
    { passive: false }
  );