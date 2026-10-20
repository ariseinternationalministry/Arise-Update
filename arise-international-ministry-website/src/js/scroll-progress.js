/* ==========================================================================
   Arise International Ministry — src/js/scroll-progress.js
   Gold reading-progress bar at the top of the page.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const bar = document.getElementById("spb");
  let ticking = 0;

  function update() {
    ticking = 0;
    if (!bar) return;
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, scrollY / h) : 0) + ")";
  }

  if (bar) {
    addEventListener("scroll", () => { if (!ticking) ticking = requestAnimationFrame(update); }, { passive: true });
    addEventListener("resize", update, { passive: true });
    update();
  }

  /* make sure the Amharic translator has seen late-added text */
  if (window.Arise && typeof window.Arise.xl === "function") window.Arise.xl();
});
