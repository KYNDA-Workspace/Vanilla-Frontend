// dashboard.js
// ==================== Component loader + slider controller ====================

// Load an external HTML fragment into an element by ID with fixed asset paths.
function loadComponent(containerId, filePath, baseDir) {
  return fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${filePath} (${response.status})`);
      return response.text();
    })
    .then(html => {
      // Fix relative src/href paths (for CSS, JS, images inside the component)
      html = html.replace(
        /(src|href)="(?!https?:\/\/)(?!\/)([^"]+)"/g,
        `$1="${baseDir}/$2"`
      );

      const el = document.getElementById(containerId);
      if (!el) throw new Error(`#${containerId} not found in DOM`);
      el.innerHTML = html;

      // Re-execute any inline <script> tags inside the loaded component
      el.querySelectorAll("script").forEach(oldScript => {
        const newScript = document.createElement("script");
        if (oldScript.src) {
          newScript.src = oldScript.src; // preserve external src
        } else {
          newScript.textContent = oldScript.textContent; // preserve inline script
        }
        document.body.appendChild(newScript); // execute
        oldScript.remove(); // cleanup
      });
    })
    .catch(err => {
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
  return parseFloat(value) || fallback;
}

// Initialize all sliders inside sections
function initSliders() {
  const headers = document.querySelectorAll(".section-header");

  headers.forEach(header => {
    const section = header.closest("section");
    if (!section) return;

    const sliderContainer = section.querySelector(".slider-container");
    const slider = section.querySelector(".slider");
    if (!slider || !sliderContainer) return;

    const leftBtn = header.querySelector(".slider-btn.left");
    const rightBtn = header.querySelector(".slider-btn.right");
    if (!leftBtn || !rightBtn) return;

    function calcStep() {
      const firstCard =
        slider.querySelector(".card, .recommend-card, .tutor-card") ||
        slider.firstElementChild;

      const cardWidth = firstCard
        ? firstCard.getBoundingClientRect().width
        : sliderContainer.clientWidth * 0.8;

      const gapStr = getComputedStyle(slider).gap || getComputedStyle(slider).columnGap || "16px";
      const gapPx = parseToPx(gapStr, slider, 16);

      return Math.round(cardWidth + gapPx);
    }

    function updateArrowState() {
      const max = slider.scrollWidth - slider.clientWidth;
      leftBtn.disabled = slider.scrollLeft <= 0;
      rightBtn.disabled = slider.scrollLeft >= Math.max(0, max - 1);
    }

    leftBtn.addEventListener("click", () => {
      const step = calcStep();
      slider.scrollBy({ left: -step, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      const step = calcStep();
      slider.scrollBy({ left: step, behavior: "smooth" });
    });

    slider.addEventListener("scroll", updateArrowState);
    window.addEventListener("resize", updateArrowState);

    updateArrowState();

    // Pointer drag to scroll
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    slider.addEventListener("pointerdown", (e) => {
      isDown = true;
      slider.classList.add("dragging");
      startX = e.clientX;
      startScroll = slider.scrollLeft;
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
      try { slider.releasePointerCapture(e?.pointerId); } catch (err) {}
    }

    slider.addEventListener("pointerup", releasePointer);
    slider.addEventListener("pointercancel", releasePointer);
    slider.addEventListener("pointerleave", releasePointer);

    slider.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      slider.scrollBy({ left: e.deltaY, behavior: "auto" });
    }, { passive: false });
  });
}

// DOM ready
document.addEventListener("DOMContentLoaded", () => {
  // === Load new navbar/footer components ===
  loadComponent("navbar",
    "../../../Components/StudentNavigationBar/navigationbar.html",
    "/Components/StudentNavigationBar"
  );

  loadComponent("footer",
    "../../../Components/Footer/footer.html",
    "/Components/Footer"
  );

  // === Initialize sliders ===
  try {
    initSliders();
  } catch (err) {
    console.error("Slider init error:", err);
  }
});


document.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const halfway = docHeight / 2;

 

  // 2️⃣ Hide after halfway
  if (scrollTop > 100) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }
});


