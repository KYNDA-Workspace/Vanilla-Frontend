// dashboard.js
// ==================== Component loader + slider controller ====================

// Load an external HTML fragment into an element by ID.
// Returns a Promise so you can await if needed.
function loadComponent(containerId, filePath) {
  return fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${filePath} (${response.status})`);
      return response.text();
    })
    .then(html => {
      const el = document.getElementById(containerId);
      if (!el) throw new Error(`#${containerId} not found in DOM`);
      el.innerHTML = html;
    })
    .catch(err => {
      // Don't crash the app — log a readable message
      console.error("Component load error:", err);
    });
}

// Utility: parse CSS length (px/rem/em/%) into pixels
function parseToPx(value, basisElement = document.documentElement, fallback = 16) {
  if (!value) return fallback;
  value = value.trim();
  if (value.endsWith("px")) return parseFloat(value);
  if (value.endsWith("rem")) {
    const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return parseFloat(value) * rootFont;
  }
  if (value.endsWith("em")) {
    const fontSize = parseFloat(getComputedStyle(basisElement).fontSize) || 16;
    return parseFloat(value) * fontSize;
  }
  if (value.endsWith("%")) {
    const pct = parseFloat(value) / 100;
    return (basisElement.clientWidth || window.innerWidth) * pct;
  }
  // fallback attempt
  return parseFloat(value) || fallback;
}

// Initialize all sliders that live inside a <section> with a .section-header and .slider-container
function initSliders() {
  // Find all section headers (each header contains the left/right buttons)
  const headers = document.querySelectorAll(".section-header");

  headers.forEach(header => {
    // find the ancestor section and its slider inside
    const section = header.closest("section");
    if (!section) return;

    const sliderContainer = section.querySelector(".slider-container");
    const slider = section.querySelector(".slider");
    if (!slider || !sliderContainer) return; // no slider in this section

    // Buttons are inside the header
    const leftBtn = header.querySelector(".slider-btn.left");
    const rightBtn = header.querySelector(".slider-btn.right");

    // If buttons aren't present, skip (some sections may not include arrow buttons)
    if (!leftBtn || !rightBtn) return;

    // Helper: compute approximate scroll step (card width + gap)
    function calcStep() {
      // prefer a direct child card (any of the expected card types)
      const firstCard =
        slider.querySelector(".card, .recommend-card, .tutor-card") ||
        slider.firstElementChild;

      const cardWidth = firstCard
        ? firstCard.getBoundingClientRect().width
        : sliderContainer.clientWidth * 0.8;

      // parse gap from computed styles (fallback to 16px)
      const gapStr = getComputedStyle(slider).gap || getComputedStyle(slider).columnGap || "16px";
      const gapPx = parseToPx(gapStr, slider, 16);

      return Math.round(cardWidth + gapPx);
    }

    // Update disabled state of arrows depending on scroll position
    function updateArrowState() {
      const max = slider.scrollWidth - slider.clientWidth;
      leftBtn.disabled = slider.scrollLeft <= 0;
      // small epsilon to avoid float rounding edge-case
      rightBtn.disabled = slider.scrollLeft >= Math.max(0, max - 1);
    }

    // Attach click handlers (scroll by one card)
    leftBtn.addEventListener("click", () => {
      const step = calcStep();
      slider.scrollBy({ left: -step, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      const step = calcStep();
      slider.scrollBy({ left: step, behavior: "smooth" });
    });

    // Update arrows on manual scroll
    slider.addEventListener("scroll", () => {
      updateArrowState();
    });

    // Update on resize (cards/gap may change)
    window.addEventListener("resize", () => {
      updateArrowState();
    });

    // initialize arrow state
    updateArrowState();

    // --- Optional: mouse/touch drag-to-scroll (grab) UX ---
    // pointer events implementation (works for mouse & touch)
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    slider.addEventListener("pointerdown", (e) => {
      isDown = true;
      slider.classList.add("dragging");
      startX = e.clientX;
      startScroll = slider.scrollLeft;
      // capture pointer so pointerup fires even if cursor leaves element
      try { slider.setPointerCapture(e.pointerId); } catch (err) {}
    });

    slider.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      const dx = startX - e.clientX;
      slider.scrollLeft = startScroll + dx;
    });

    function releasePointer(e) {
      if (!isDown) return;
      isDown = false;
      slider.classList.remove("dragging");
      try { slider.releasePointerCapture && slider.releasePointerCapture(e?.pointerId); } catch (err) {}
    }

    slider.addEventListener("pointerup", releasePointer);
    slider.addEventListener("pointercancel", releasePointer);
    slider.addEventListener("pointerleave", releasePointer);

    // Wheel to horizontal-scroll (nice UX on trackpad / mouse wheel)
    slider.addEventListener("wheel", (e) => {
      // If user is doing a horizontal scroll natively, let it pass.
      // Otherwise, convert vertical wheel into horizontal scroll.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      slider.scrollBy({ left: e.deltaY, behavior: "auto" });
    }, { passive: false });
  });
}

// DOM ready: load components and initialize behaviors
document.addEventListener("DOMContentLoaded", () => {
  // === Load navbar/footer components ===
  // NOTE: paths are relative to the HTML file location (not to this JS file).
  // If your components live in a different folder, change these paths.
  loadComponent("navbar", "../../../Components/studentsnavbar.html");
  loadComponent("footer", "../../../Components/footer.html");

  // === Initialize sliders (works with your current markup) ===
  // We don't need to wait for components to finish loading because sliders live in the page body.
  try {
    initSliders();
  } catch (err) {
    console.error("Slider init error:", err);
  }
});
