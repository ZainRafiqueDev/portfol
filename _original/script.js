const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const hero = document.querySelector(".hero");
const stackField = document.querySelector(".stack-field");
const stackNodes = document.querySelectorAll(".stack-node");

const setScrolledState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeMenu = () => {
  header.classList.remove("menu-open");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", setScrolledState, { passive: true });
setScrolledState();

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${visible.target.id}`
      );
    });
  },
  {
    rootMargin: "-25% 0px -55% 0px",
    threshold: [0.1, 0.25, 0.5, 0.75],
  }
);

sections.forEach((section) => observer.observe(section));

/* Hero mouse parallax */
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canHover && !reducedMotion && hero && stackField) {
  let rafId = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const animateParallax = () => {
    currentX += (targetX - currentX) * 0.085;
    currentY += (targetY - currentY) * 0.085;

    stackField.style.setProperty("--mouse-x", `${currentX * 0.35}px`);
    stackField.style.setProperty("--mouse-y", `${currentY * 0.35}px`);

    stackNodes.forEach((node) => {
      const depth = Number(node.dataset.depth || 1);
      node.style.setProperty("--parallax-x", `${currentX * depth * 0.13}px`);
      node.style.setProperty("--parallax-y", `${currentY * depth * 0.13}px`);
    });

    rafId = requestAnimationFrame(animateParallax);
  };

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 36;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 28;

    if (!rafId) rafId = requestAnimationFrame(animateParallax);
  });

  hero.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
  });
}


/* Subtle cursor spotlight */
if (canHover && !reducedMotion && hero) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty("--spot-x", `${x}%`);
    hero.style.setProperty("--spot-y", `${y}%`);
  });

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--spot-x", "50%");
    hero.style.setProperty("--spot-y", "50%");
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) closeMenu();
});


const socialProfiles = document.querySelectorAll(".magnetic-social");

if (canHover && !reducedMotion) {
  socialProfiles.forEach((link) => {
    link.addEventListener("pointermove", (event) => {
      const rect = link.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      link.style.setProperty("--social-x", `${x}%`);
      link.style.setProperty("--social-y", `${y}%`);
    });

    link.addEventListener("pointerleave", () => {
      link.style.setProperty("--social-x", "50%");
      link.style.setProperty("--social-y", "50%");
    });
  });
}



/* =========================================================
   STEP 3 — STATS + ABOUT INTERACTIONS
   ========================================================= */

const revealItems = document.querySelectorAll(".reveal-on-scroll");
const countItems = document.querySelectorAll(".count-up");

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const delay = Number(entry.target.dataset.delay || 0);
        entry.target.style.setProperty("--reveal-delay", `${delay}ms`);
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (countItems.length) {
  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.target || 0);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const duration = 1250;
        const start = performance.now();

        const format = (value) => {
          if (Number.isInteger(target)) return Math.round(value);
          return value.toFixed(1);
        };

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${prefix}${format(target * eased)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  countItems.forEach((item) => countObserver.observe(item));
}


/* Timeline draw + subtle About panel pointer motion */
const timelinePanel = document.querySelector(".about-panel--timeline");
const mainAboutPanel = document.querySelector(".about-panel--main");

if (timelinePanel) {
  const timelineObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        timelinePanel.style.setProperty("--timeline-progress", "1");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  timelineObserver.observe(timelinePanel);
}

if (canHover && !reducedMotion && mainAboutPanel) {
  mainAboutPanel.addEventListener("pointermove", (event) => {
    const rect = mainAboutPanel.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    mainAboutPanel.style.transform =
      `perspective(1200px) rotateX(${py * -1.6}deg) rotateY(${px * 1.8}deg) translateY(-3px)`;
  });

  mainAboutPanel.addEventListener("pointerleave", () => {
    mainAboutPanel.style.transform = "";
  });
}


/* =========================================================
   STEP 4 — SERVICES INTERACTIONS
   ========================================================= */

const serviceCards = document.querySelectorAll(".service-card");

if (serviceCards.length && canHover && !reducedMotion) {
  serviceCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      const x = (px - 0.5) * 100;
      const y = (py - 0.5) * 100;

      card.style.setProperty("--card-glow-x", `${px * 100}%`);
      card.style.setProperty("--card-glow-y", `${py * 100}%`);

      const rotateY = (px - 0.5) * 4.5;
      const rotateX = (py - 0.5) * -3.5;
      card.style.transform =
        `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

      card.style.setProperty("--pointer-x", `${x}%`);
      card.style.setProperty("--pointer-y", `${y}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.style.setProperty("--card-glow-x", "50%");
      card.style.setProperty("--card-glow-y", "50%");
    });
  });
}

/* Make service card stagger delays reliable from their data-delay values. */
document.querySelectorAll(".services-section .reveal-on-scroll").forEach((item) => {
  const delay = Number(item.dataset.delay || 0);
  item.style.setProperty("--reveal-delay", `${delay}ms`);
});




/* =========================================================
   STEP 5 — 3D COVERFLOW INTERACTION
   ========================================================= */

const coverStage = document.getElementById("coverflow-stage");
const coverCards = Array.from(document.querySelectorAll(".cover-card"));
const coverPrev = document.querySelector(".coverflow-arrow--prev");
const coverNext = document.querySelector(".coverflow-arrow--next");
const coverCount = document.getElementById("cover-count");
const coverControlLine = document.querySelector(".cover-control-line::after");

if (coverStage && coverCards.length) {
  let activeIndex = 0;
  let startX = 0;
  let dragging = false;
  let dragDelta = 0;

  const total = coverCards.length;

  const wrap = (value) => ((value % total) + total) % total;

  const renderCoverflow = () => {
    coverCards.forEach((card, index) => {
      let offset = index - activeIndex;

      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const abs = Math.abs(offset);

      if (abs === 0) {
        card.style.setProperty("--x", "0px");
        card.style.setProperty("--z", "70px");
        card.style.setProperty("--rot", "0deg");
        card.style.setProperty("--scale", "1");
        card.style.setProperty("--opacity", "1");
        card.style.setProperty("--blur", "0px");
        card.style.setProperty("--layer", "8");
      } else if (abs === 1) {
        card.style.setProperty("--x", `${offset * 245}px`);
        card.style.setProperty("--z", "-10px");
        card.style.setProperty("--rot", `${offset * -28}deg`);
        card.style.setProperty("--scale", ".82");
        card.style.setProperty("--opacity", ".78");
        card.style.setProperty("--blur", "0px");
        card.style.setProperty("--layer", "6");
      } else if (abs === 2) {
        card.style.setProperty("--x", `${offset * 420}px`);
        card.style.setProperty("--z", "-160px");
        card.style.setProperty("--rot", `${offset * -38}deg`);
        card.style.setProperty("--scale", ".67");
        card.style.setProperty("--opacity", ".42");
        card.style.setProperty("--blur", "1px");
        card.style.setProperty("--layer", "4");
      } else if (abs === 3) {
        card.style.setProperty("--x", `${offset * 540}px`);
        card.style.setProperty("--z", "-260px");
        card.style.setProperty("--rot", `${offset * -43}deg`);
        card.style.setProperty("--scale", ".57");
        card.style.setProperty("--opacity", ".18");
        card.style.setProperty("--blur", "2px");
        card.style.setProperty("--layer", "2");
      } else {
        card.style.setProperty("--x", `${Math.sign(offset) * 620}px`);
        card.style.setProperty("--z", "-320px");
        card.style.setProperty("--rot", `${Math.sign(offset) * -45}deg`);
        card.style.setProperty("--scale", ".5");
        card.style.setProperty("--opacity", "0");
        card.style.setProperty("--blur", "4px");
        card.style.setProperty("--layer", "1");
      }

      card.style.pointerEvents = abs <= 1 ? "auto" : "none";
    });

    if (coverCount) {
      coverCount.textContent =
        `${String(activeIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    }

    const progress = ((activeIndex + 1) / total) * 100;
    coverStage.style.setProperty("--cover-progress", `${progress}%`);
    const controlLine = document.querySelector(".cover-control-line");
    if (controlLine) {
      controlLine.style.setProperty("--progress", `${progress}%`);
    }
  };

  const goTo = (index) => {
    activeIndex = wrap(index);
    renderCoverflow();
  };

  coverPrev?.addEventListener("click", () => goTo(activeIndex - 1));
  coverNext?.addEventListener("click", () => goTo(activeIndex + 1));

  coverCards.forEach((card, index) => {
    card.addEventListener("click", (event) => {
      if (Math.abs(dragDelta) > 8) {
        event.preventDefault();
        dragDelta = 0;
        return;
      }

      if (index !== activeIndex) {
        event.preventDefault();
        goTo(index);
      }
    });
  });

  coverStage.addEventListener("pointerdown", (event) => {
    dragging = true;
    startX = event.clientX;
    dragDelta = 0;
    coverStage.setPointerCapture?.(event.pointerId);
  });

  coverStage.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    dragDelta = event.clientX - startX;
  });

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;

    if (Math.abs(dragDelta) > 55) {
      goTo(activeIndex + (dragDelta < 0 ? 1 : -1));
    }

    dragDelta = 0;
  };

  coverStage.addEventListener("pointerup", endDrag);
  coverStage.addEventListener("pointercancel", endDrag);
  coverStage.addEventListener("pointerleave", endDrag);

  coverStage.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  });

  renderCoverflow();
}


/* =========================================================
   STEP 7 — EXPERIENCE TIMELINE INTERACTIONS
   ========================================================= */

const experienceTimeline = document.getElementById("experience-timeline");

if (experienceTimeline) {
  const timelineObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        experienceTimeline.classList.add("is-drawn");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  timelineObserver.observe(experienceTimeline);
}

const experienceItems = document.querySelectorAll(".experience-item");
if (experienceItems.length) {
  const experienceObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.delay || 0);
        entry.target.style.setProperty("--reveal-delay", `${delay}ms`);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.22, rootMargin: "0px 0px -6% 0px" }
  );

  experienceItems.forEach((item) => experienceObserver.observe(item));
}


/* Experience card micro-interaction */
const experienceCards = document.querySelectorAll(".experience-card");

if (canHover && !reducedMotion) {
  experienceCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform =
        `perspective(1100px) rotateX(${py * -1.2}deg) rotateY(${px * 1.6}deg) translateY(-5px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}


/* =========================================================
   STEP 8 — AI AUTOMATION INTERACTIONS
   ========================================================= */

const automationWorkflow = document.getElementById("automation-workflow");
const automationCards = document.querySelectorAll(".automation-node-card, .automation-result-card");

if (automationWorkflow && canHover && !reducedMotion) {
  automationCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      if (!card.classList.contains("automation-result-card")) {
        card.style.transform =
          `perspective(1000px) rotateX(${py * -2}deg) rotateY(${px * 2.4}deg) translateY(-7px)`;
      }
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

const automationObserver = document.querySelectorAll(".ai-automation-section .reveal-on-scroll");
if (automationObserver.length) {
  const aiReveal = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
  );

  automationObserver.forEach((item) => aiReveal.observe(item));
}

/* STEP 11 — CONTACT INTERACTION */
const contactPrimary = document.querySelector(".contact-primary");
if (contactPrimary && canHover && !reducedMotion) {
  contactPrimary.addEventListener("pointermove", (event) => {
    const rect = contactPrimary.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    contactPrimary.style.transform = `translate(${px * 5}px,${py * 4}px)`;
  });
  contactPrimary.addEventListener("pointerleave", () => {
    contactPrimary.style.transform = "";
  });
}
