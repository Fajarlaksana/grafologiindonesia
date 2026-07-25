/* =========================================================
   Grafologi Indonesia — hero interactions
   Two rAF-driven animations (typewriter + counter) and the
   mobile nav toggle. No dependencies.
   ========================================================= */
(function () {
  "use strict";

  var CONFIG = {
    text: "Belajar Grafologi di Sini Terarah. Ilmiah. Bersertifikasi.",
    splitAt: 26,          // chars before the copy switches to purple
    typeSpeed: 35,        // ms per character
    typeDelay: 400,       // ms before the first character
    countTarget: 48,      // "48k+"
    countDelay: 1200,
    countDuration: 2000
  };

  var typeA = document.getElementById("typeA");
  var typeB = document.getElementById("typeB");
  var caret = document.getElementById("caret");
  var count = document.getElementById("count");

  var reduced = window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- final state, used by reduced motion and as a fallback ---------- */
  function settle() {
    if (typeA) typeA.textContent = CONFIG.text.slice(0, CONFIG.splitAt);
    if (typeB) typeB.textContent = CONFIG.text.slice(CONFIG.splitAt);
    if (caret) caret.style.display = "none";
    if (count) count.textContent = CONFIG.countTarget + "k+";
  }

  if (reduced) {
    settle();
  } else {
    if (caret) caret.style.display = "none";   // hidden until typing begins

    var start = performance.now();
    var typeDone = !typeA;
    var countDone = !count;

    (function frame(now) {
      // Typewriter — split into a black head and a purple tail.
      if (!typeDone) {
        var chars = Math.floor((now - start - CONFIG.typeDelay) / CONFIG.typeSpeed);
        chars = Math.max(0, Math.min(CONFIG.text.length, chars));

        var typed = CONFIG.text.slice(0, chars);
        typeA.textContent = typed.slice(0, CONFIG.splitAt);
        if (typeB) typeB.textContent = typed.slice(CONFIG.splitAt);

        if (caret) {
          var typing = now - start >= CONFIG.typeDelay && chars < CONFIG.text.length;
          caret.style.display = typing ? "" : "none";
        }
        if (chars >= CONFIG.text.length) typeDone = true;
      }

      // Counter — cubic ease-out from 0k+ to the target.
      if (!countDone) {
        var p = (now - start - CONFIG.countDelay) / CONFIG.countDuration;
        p = Math.max(0, Math.min(1, p));
        var eased = 1 - Math.pow(1 - p, 3);
        count.textContent = Math.round(eased * CONFIG.countTarget) + "k+";
        if (p >= 1) countDone = true;
      }

      if (!typeDone || !countDone) requestAnimationFrame(frame);
    })(performance.now());
  }

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }
})();
