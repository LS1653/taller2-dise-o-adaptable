/* ==========================================================
   ZZZ LANDING PAGE — script.js
   Funciones:
   - menú móvil
   - navegación suave
   - sección activa en navbar
   - slider horizontal de Characters
   - arrastre con mouse/touch
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("main section[id]")];

  // ---------------------------
  // Mobile navigation
  // ---------------------------
  navToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // ---------------------------
  // Active section in navbar
  // ---------------------------
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      links.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${visible.target.id}`
        );
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((section) => observer.observe(section));

  // ---------------------------
  // Characters horizontal slider
  // ---------------------------
  const track = document.querySelector(".character-track");
  const prevButton = document.querySelector('[data-scroll="prev"]');
  const nextButton = document.querySelector('[data-scroll="next"]');

  if (track) {
    const getScrollAmount = () => {
      const card = track.querySelector(".character-card");
      return card ? card.getBoundingClientRect().width + 18 : 400;
    };

    // ---------------------------
    // Flecha izquierda
    // ---------------------------
    prevButton?.addEventListener("click", () => {
      track.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    });

    // ---------------------------
    // Flecha derecha
    // ---------------------------
    nextButton?.addEventListener("click", () => {
      track.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    });

    // ---------------------------
    // Mouse / touch drag
    // ---------------------------

    let isDragging = false;
    let startX = 0;
    let startScroll = 0;

    track.addEventListener("pointerdown", (event) => {
      // Solo usamos click izquierdo cuando es mouse
      if (event.pointerType === "mouse" && event.button !== 0) return;

      isDragging = true;

      startX = event.clientX;
      startScroll = track.scrollLeft;

      track.classList.add("is-dragging");

      track.setPointerCapture?.(event.pointerId);
    });

    track.addEventListener("pointermove", (event) => {
      if (!isDragging) return;

      const distance = event.clientX - startX;

      track.scrollLeft = startScroll - distance;
    });

    const stopDragging = () => {
      isDragging = false;
      track.classList.remove("is-dragging");
    };

    track.addEventListener("pointerup", stopDragging);
    track.addEventListener("pointercancel", stopDragging);
    track.addEventListener("pointerleave", stopDragging);
  }

  // ---------------------------
  // Small entrance animation
  // ---------------------------

  const animatedElements = document.querySelectorAll(
    ".glass-panel, .character-card, .bangboo-card, .combat-media"
  );

  const revealObserver = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
    }
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";

    element.style.transform =
      "translateY(22px)";

    element.style.transition =
      "opacity .6s ease, transform .6s cubic-bezier(.2,.8,.2,1)";

    revealObserver.observe(element);
  });
});