/* Kronos — theme toggle + mobile menu. No dependencies, ~1KB. */
(function () {
  "use strict";

  var root = document.documentElement;
  var KEY = "kronos-theme";

  function applySyntaxTheme(theme) {
    var light = document.getElementById("kronos-syntax-light");
    var dark = document.getElementById("kronos-syntax-dark");
    if (!light || !dark) return;
    light.media = theme === "dark" ? "not all" : "all";
    dark.media = theme === "dark" ? "all" : "not all";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    applySyntaxTheme(theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* Mobile drawer */
  var menuBtn = document.getElementById("menu-toggle");
  var drawer = document.getElementById("mobile-nav");
  if (menuBtn && drawer) {
    var setOpen = function (open) {
      drawer.setAttribute("data-open", open ? "true" : "false");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    menuBtn.addEventListener("click", function () {
      setOpen(drawer.getAttribute("data-open") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    /* Collapse when we grow past the mobile breakpoint. */
    if (window.matchMedia) {
      window.matchMedia("(min-width: 48rem)").addEventListener("change", function (e) {
        if (e.matches) setOpen(false);
      });
    }
  }

  /* Wrap wide tables so they scroll instead of breaking the layout. */
  Array.prototype.forEach.call(
    document.querySelectorAll(".post-content table"),
    function (table) {
      if (table.parentElement.classList.contains("table-wrap")) return;
      var wrap = document.createElement("div");
      wrap.className = "table-wrap";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    }
  );
})();
