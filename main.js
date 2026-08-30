/* ============================================================
   ZWAG ZONE — main.js
   Todo aquí es progresivo: el sitio funciona sin JS.
   ============================================================ */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- nav activa según la página actual ---------- */
  function markActiveNav() {
    var path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a, .mobile-panel a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        a.classList.add("active");
      }
    });
  }

  /* ---------- menú móvil ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector(".nav-toggle");
    var panel = document.querySelector(".mobile-panel");
    if (!toggle || !panel) return;
    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("no-scroll", isOpen);
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        panel.classList.remove("open");
        toggle.classList.remove("open");
        document.body.classList.remove("no-scroll");
      });
    });
  }

  /* ---------- gate de entrada (solo Home, una vez por sesión) ---------- */
  function initGate() {
    var gate = document.getElementById("gate");
    if (!gate) return;

    var already = sessionStorage.getItem("zz_entered");
    if (already || reducedMotion) {
      gate.remove();
      return;
    }

    document.body.classList.add("gate-active");
    var enterBtn = gate.querySelector("#enterZone");
    if (enterBtn) {
      enterBtn.addEventListener("click", function () {
        sessionStorage.setItem("zz_entered", "1");
        gate.classList.add("hidden");
        document.body.classList.remove("gate-active");
        burstConfetti(enterBtn, 10);
        setTimeout(function () { gate.remove(); }, 900);
      });
    }
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- parallax suave para decoraciones flotantes ---------- */
  function initParallax() {
    if (reducedMotion) return;
    var layer = document.querySelectorAll("[data-parallax]");
    if (!layer.length) return;
    window.addEventListener("mousemove", function (e) {
      var x = (e.clientX / window.innerWidth - 0.5);
      var y = (e.clientY / window.innerHeight - 0.5);
      layer.forEach(function (el) {
        var depth = parseFloat(el.getAttribute("data-parallax")) || 10;
        el.style.transform = "translate(" + (x * depth) + "px," + (y * depth) + "px)";
      });
    }, { passive: true });
  }

  /* ---------- progress bar (How it works) ---------- */
  function initProgress() {
    var fill = document.querySelector(".progress-fill");
    if (!fill) return;
    var target = fill.getAttribute("data-target") || "35";
    if (reducedMotion || !("IntersectionObserver" in window)) {
      fill.style.width = target + "%";
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          fill.style.width = target + "%";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    io.observe(fill);
  }

  /* ---------- filtro de gallery ---------- */
  function initGalleryFilter() {
    var tags = document.querySelectorAll(".filter-tag");
    var items = document.querySelectorAll(".gallery-item");
    if (!tags.length || !items.length) return;
    tags.forEach(function (tag) {
      tag.addEventListener("click", function () {
        tags.forEach(function (t) { t.classList.remove("is-active"); });
        tag.classList.add("is-active");
        var filter = tag.getAttribute("data-filter");
        items.forEach(function (item) {
          var show = filter === "all" || (item.getAttribute("data-tag") || "").indexOf(filter) > -1;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- filtro de staff por rango ---------- */
  function initStaffFilter() {
    var tabs = document.querySelectorAll(".rank-tab");
    var cards = document.querySelectorAll(".staff-card");
    if (!tabs.length || !cards.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("is-active"); });
        tab.classList.add("is-active");
        var rank = tab.getAttribute("data-rank");
        cards.forEach(function (card) {
          var show = rank === "all" || card.getAttribute("data-rank") === rank;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- confeti de stickers al hacer click ---------- */
  var CONFETTI_CHARS = ["★", "✦", "◇", "●"];
  function burstConfetti(originEl, count) {
    if (reducedMotion) return;
    var rect = originEl.getBoundingClientRect();
    for (var i = 0; i < count; i++) {
      var piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.textContent = CONFETTI_CHARS[i % CONFETTI_CHARS.length];
      piece.style.left = (rect.left + rect.width / 2) + "px";
      piece.style.top = (rect.top + rect.height / 2) + "px";
      piece.style.color = i % 2 === 0 ? "#4D769C" : "#16283A";
      document.body.appendChild(piece);
      var angle = Math.random() * Math.PI * 2;
      var dist = 60 + Math.random() * 90;
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist;
      piece.animate([
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: "translate(" + dx + "px," + dy + "px) rotate(" + (Math.random() * 360) + "deg)", opacity: 0 }
      ], { duration: 700 + Math.random() * 400, easing: "cubic-bezier(.2,.8,.2,1)" });
      (function (p) { setTimeout(function () { p.remove(); }, 1200); })(piece);
    }
  }

  function initConfettiButtons() {
    document.querySelectorAll(".btn-confetti").forEach(function (btn) {
      btn.addEventListener("click", function () { burstConfetti(btn, 8); });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    markActiveNav();
    initMobileMenu();
    initGate();
    initReveal();
    initParallax();
    initProgress();
    initGalleryFilter();
    initStaffFilter();
    initConfettiButtons();
  });
})();
