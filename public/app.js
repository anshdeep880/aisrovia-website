(() => {
  "use strict";

  const manifest = window.FRAME_MANIFEST;
  const loader = document.querySelector("#loader");
  const loaderBar = document.querySelector("#loaderBar");
  const loaderCount = document.querySelector("#loaderCount");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const usesCanvas = window.matchMedia("(min-width: 768px)").matches && !reducedMotion;
  const portfolioProjects = [
    {
      id: "commerce-ops",
      title: "Commerce Ops Dashboard",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=82",
      category: "Analytics",
      liveUrl: "#contact",
      shape: "landscape"
    },
    {
      id: "mobile-workflow",
      title: "Mobile Workflow App",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=82",
      category: "Mobile",
      liveUrl: "#contact",
      shape: "portrait"
    },
    {
      id: "ai-support",
      title: "AI Support Console",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1100&q=82",
      category: "Automation",
      liveUrl: "#contact",
      shape: "square"
    },
    {
      id: "erp-control",
      title: "ERP Control Room",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=82",
      category: "ERP",
      liveUrl: "#contact",
      shape: "tall"
    },
    {
      id: "desktop-tools",
      title: "Desktop Operations Suite",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1200&q=82",
      category: "Desktop",
      liveUrl: "#contact",
      shape: "landscape"
    },
    {
      id: "delivery-platform",
      title: "Delivery Platform",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=82",
      category: "Web platform",
      liveUrl: "#contact",
      shape: "portrait"
    },
    {
      id: "inventory-system",
      title: "Inventory Intelligence",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1100&q=82",
      category: "Systems",
      liveUrl: "#contact",
      shape: "square"
    },
    {
      id: "finance-reporting",
      title: "Finance Reporting Layer",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=82",
      category: "Reporting",
      liveUrl: "#contact",
      shape: "tall"
    }
  ];

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

  const setProgress = (complete, total) => {
    const percentage = total ? Math.round((complete / total) * 100) : 100;
    loaderBar.style.width = `${percentage}%`;
    loaderCount.textContent = `${String(percentage).padStart(3, "0")}%`;
  };

  const loadImage = (source) => new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = source;
  });

  async function preloadFrames() {
    const sources = [...manifest.hero, ...manifest.projects, ...(manifest.globe || [])];
    let complete = 0;
    const images = await Promise.all(sources.map(async (source) => {
      const image = await loadImage(source);
      complete += 1;
      setProgress(complete, sources.length);
      return image;
    }));
    const heroLen = manifest.hero.length;
    const projLen = manifest.projects.length;
    return {
      hero: images.slice(0, heroLen),
      projects: images.slice(heroLen, heroLen + projLen),
      globe: images.slice(heroLen + projLen)
    };
  }

  function drawCover(canvas, image) {
    if (!image) return;
    const context = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const targetWidth = Math.round(width * dpr);
    const targetHeight = Math.round(height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
  }

  function createSequence({ sceneId, canvasId, images, onProgress }) {
    const scene = document.querySelector(sceneId);
    const canvas = document.querySelector(canvasId);
    const state = { target: 0, current: 0, drawn: -1, running: false };

    const getProgress = () => {
      const bounds = scene.getBoundingClientRect();
      const scrollRange = scene.offsetHeight - window.innerHeight;
      return Math.max(0, Math.min(1, -bounds.top / Math.max(scrollRange, 1)));
    };

    const paint = () => {
      state.current += (state.target - state.current) * 0.13;
      if (Math.abs(state.target - state.current) < 0.002) state.current = state.target;
      const index = Math.round(state.current * (images.length - 1));
      if (index !== state.drawn) {
        drawCover(canvas, images[index]);
        state.drawn = index;
      }
      if (onProgress) onProgress(state.current);
      if (state.current !== state.target) {
        requestAnimationFrame(paint);
      } else {
        state.running = false;
      }
    };

    const update = () => {
      state.target = getProgress();
      if (!state.running) {
        state.running = true;
        requestAnimationFrame(paint);
      }
    };

    const resize = () => {
      state.drawn = -1;
      drawCover(canvas, images[Math.round(state.current * (images.length - 1))]);
    };

    update();
    window.addEventListener("resize", resize, { passive: true });
    return { update, resize };
  }

  function setupLenis(update) {
    if (!window.Lenis || reducedMotion) return;
    const lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true, smoothTouch: false });
    window.lenis = lenis;
    lenis.on("scroll", update);
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  function enableProjectReveals(progress) {
    document.querySelectorAll("[data-reveal]").forEach((element) => {
      element.classList.toggle("is-visible", progress >= Number(element.dataset.reveal));
    });
  }

  // Accumulating stat reveal — each stat has its own scroll threshold.
  // Stats 0–5 are spread evenly across [0, 1] scroll progress.
  // Once a stat passes its threshold it stays visible; scrolling back up hides it again.
  const STAT_COUNT = 6;

  // Threshold at which stat i becomes visible (fraction of total scroll progress)
  function getStatThreshold(i) {
    // Give each stat a slightly offset entry point so they don't all fire at once.
    // Stat 0 appears early (~12%), stat 5 appears at ~62%.
    return (i / STAT_COUNT) * 0.75 + 0.08;
  }

  function enableGlobeStats(progress) {
    const stats = document.querySelectorAll(".globe-stat");
    const dots = document.querySelectorAll(".globe-carousel__dot");
    if (!stats.length) return;

    let highestVisible = -1;

    stats.forEach((stat) => {
      const i = Number(stat.dataset.statIndex);
      const threshold = getStatThreshold(i);
      const shouldShow = progress >= threshold;
      stat.classList.toggle("is-visible", shouldShow);
      if (shouldShow && i > highestVisible) highestVisible = i;
    });

    // Dot indicator tracks the furthest-revealed stat
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === highestVisible));
  }

  // Mobile: auto-reveal stats sequentially (staggered) since there's no scroll driver
  function setupGlobeMobile(images) {
    if (!images || !images.length) return;
    const canvas = document.getElementById("globeCanvas");
    if (!canvas) return;

    let frameIndex = 0;
    let lastTime = 0;
    const INTERVAL = 1000 / 12; // ~12 fps

    drawCover(canvas, images[0]);

    const tick = (timestamp) => {
      if (timestamp - lastTime >= INTERVAL) {
        lastTime = timestamp;
        frameIndex = (frameIndex + 1) % images.length;
        drawCover(canvas, images[frameIndex]);
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Reveal stats one at a time, accumulating — each 1.8s after the previous
    const stats = document.querySelectorAll(".globe-stat");
    const dots = document.querySelectorAll(".globe-carousel__dot");
    if (!stats.length) return;

    // Sort by data-stat-index ascending so they reveal in order 0→5
    const sorted = [...stats].sort((a, b) => Number(a.dataset.statIndex) - Number(b.dataset.statIndex));
    let highestVisible = -1;

    sorted.forEach((stat, idx) => {
      setTimeout(() => {
        stat.classList.add("is-visible");
        highestVisible = Number(stat.dataset.statIndex);
        dots.forEach((dot, i) => dot.classList.toggle("is-active", i === highestVisible));
      }, idx * 1800);
    });
  }

  function setupContactForm() {
    document.querySelector("#contactForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.querySelector("#email").value.trim();
      if (!email) return;
      const subject = encodeURIComponent("Project enquiry from " + email);
      const body = encodeURIComponent("Hi Anshdeep,\n\nI would like to discuss a project. You can reply to me at: " + email + "\n\n");
      window.location.href = `mailto:contact@aisrovia.com?subject=${subject}&body=${body}`;
    });
  }

  function setupPortfolioGallery() {
    const rowsContainer = document.querySelector("#portfolioGalleryRows");
    if (!rowsContainer) return;

    const midpoint = Math.ceil(portfolioProjects.length / 2);
    const rows = [portfolioProjects.slice(0, midpoint), portfolioProjects.slice(midpoint)];
    const renderCard = (project, isDuplicate = false) => `
      <a class="portfolio-card" href="${escapeHtml(project.liveUrl)}" aria-label="View ${escapeHtml(project.title)}"${isDuplicate ? ' aria-hidden="true" tabindex="-1"' : ""}>
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy" decoding="async" />
        <span class="portfolio-card__overlay" aria-hidden="true">
          <span class="portfolio-card__category">${escapeHtml(project.category)}</span>
          <span class="portfolio-card__title">${escapeHtml(project.title)}</span>
        </span>
      </a>
    `;

    rowsContainer.innerHTML = rows.map((row, index) => `
      <div class="portfolio-marquee-row is-${index % 2 === 0 ? "right" : "left"}">
        <div class="portfolio-marquee-track">
          <div class="portfolio-marquee-group">${row.map((project) => renderCard(project)).join("")}</div>
          <div class="portfolio-marquee-group" aria-hidden="true">${row.map((project) => renderCard(project, true)).join("")}</div>
        </div>
      </div>
    `).join("");
  }

  function setupSectionAnimations() {
    if (reducedMotion || !window.gsap || !window.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    const stackOffset = () => window.matchMedia("(max-width: 767px)").matches ? 96 : 128;
    document.querySelectorAll("[data-service-card]").forEach((card, index, cards) => {
      const nextCard = cards[index + 1];
      if (!nextCard) return;
      gsap.to(card, {
        scale: 0.92,
        "--stack-dim": 0.28,
        ease: "none",
        scrollTrigger: {
          trigger: nextCard.parentElement,
          start: "top bottom-=32",
          end: () => `top top+=${stackOffset()}`,
          scrub: 0.3,
          invalidateOnRefresh: true
        }
      });
    });

    const aboutContent = document.querySelector("[data-about-reveal]");
    if (aboutContent) {
      const paragraph = aboutContent.querySelector("p");
      const stackLabel = aboutContent.querySelector(".stack-label");
      const stack = aboutContent.querySelector(".stack");
      gsap.from([paragraph, stackLabel, stack], {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: aboutContent, start: "top 78%", once: true }
      });
    }
  }

  function setupSiteEnhancements() {
    // Mobile Menu Toggle
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileDropdown = document.getElementById("mobileDropdown");
    const siteHeader = document.querySelector(".site-header");

    if (hamburgerBtn && mobileDropdown) {
      const toggleMenu = () => {
        const isOpen = mobileDropdown.classList.toggle("is-open");
        hamburgerBtn.classList.toggle("is-active", isOpen);
        hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
        if (siteHeader) {
          siteHeader.classList.toggle("menu-is-open", isOpen);
        }
      };

      hamburgerBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
      });

      // Close menu when clicking outside
      document.addEventListener("click", (event) => {
        if (mobileDropdown.classList.contains("is-open") && !mobileDropdown.contains(event.target) && !hamburgerBtn.contains(event.target)) {
          toggleMenu();
        }
      });

      // Close menu when clicking a link
      mobileDropdown.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          if (mobileDropdown.classList.contains("is-open")) {
            toggleMenu();
          }
        });
      });
    }

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const sectionMap = [
      ["heroScene", false], ["walkScene", false], ["services", true],
      ["globeScene", true],
      ["portfolioGallery", false],
      ["about", true], ["contact", true]
    ];
    const indicatorLinks = document.querySelectorAll("[data-section-link]");
    const setActiveSection = (id, isLight) => {
      document.body.classList.toggle("is-light-section", isLight);
      indicatorLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
    };

    indicatorLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    if (window.gsap && window.ScrollTrigger) {
      const { gsap, ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);
      sectionMap.forEach(([id, isLight]) => {
        const section = document.getElementById(id);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 52%",
          end: "bottom 52%",
          onEnter: () => setActiveSection(id, isLight),
          onEnterBack: () => setActiveSection(id, isLight)
        });
      });
      setActiveSection("heroScene", false);

    }

    if (!finePointer || reducedMotion) return;
    document.body.classList.add("has-custom-cursor");
    const dot = document.querySelector(".custom-cursor--dot");
    const ring = document.querySelector(".custom-cursor--ring");
    let targetX = 0; let targetY = 0; let ringX = 0; let ringY = 0;
    window.addEventListener("pointermove", (event) => { targetX = event.clientX; targetY = event.clientY; dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`; }, { passive: true });
    const drawCursor = () => { ringX += (targetX - ringX) * 0.16; ringY += (targetY - ringY) * 0.16; ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`; requestAnimationFrame(drawCursor); };
    requestAnimationFrame(drawCursor);
    document.querySelectorAll(".magnetic, .site-header nav a").forEach((element) => {
      element.addEventListener("pointermove", (event) => { const box = element.getBoundingClientRect(); element.style.setProperty("--magnetic-x", `${(event.clientX - box.left - box.width / 2) * 0.12}px`); element.style.setProperty("--magnetic-y", `${(event.clientY - box.top - box.height / 2) * 0.12}px`); });
      element.addEventListener("pointerleave", () => { element.style.setProperty("--magnetic-x", "0px"); element.style.setProperty("--magnetic-y", "0px"); });
    });
  }

  async function init() {
    if (!manifest || !manifest.hero?.length || !manifest.projects?.length || !manifest.globe?.length) {
      loaderCount.textContent = "ASSET ERROR";
      return;
    }

    const images = await preloadFrames();
    document.body.classList.add("is-loaded");
    loader.classList.add("is-hidden");
    setupContactForm();
    setupPortfolioGallery();
    setupSectionAnimations();
    setupSiteEnhancements();

    if (!usesCanvas) {
      document.querySelector(".hero-copy").classList.add("is-visible");
      document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
      setupGlobeMobile(images.globe);
      return;
    }

    const heroCopy = document.querySelector(".hero-copy");
    const hero = createSequence({
      sceneId: "#heroScene", canvasId: "#heroCanvas", images: images.hero,
      onProgress: (progress) => heroCopy.classList.toggle("is-visible", progress > 0.08)
    });
    const walk = createSequence({
      sceneId: "#walkScene", canvasId: "#projectsCanvas", images: images.projects,
      onProgress: enableProjectReveals
    });
    const globe = createSequence({
      sceneId: "#globeScene", canvasId: "#globeCanvas", images: images.globe,
      onProgress: enableGlobeStats
    });
    const update = () => { hero.update(); walk.update(); globe.update(); };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    setupLenis(update);
  }

  init();
})();
