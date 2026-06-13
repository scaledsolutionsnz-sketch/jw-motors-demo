/* JW Motors — interactions */
(function () {
  "use strict";

  // ---- Intro overlay ----
  var intro = document.getElementById("intro");
  if (intro) {
    window.addEventListener("load", function () {
      setTimeout(function () { intro.classList.add("done"); }, 1400);
    });
    // safety fallback
    setTimeout(function () { intro.classList.add("done"); }, 2600);
  }

  // ---- Sticky nav ----
  var nav = document.querySelector("header.nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---- Mobile menu ----
  var burger = document.querySelector(".burger");
  var links = document.querySelector(".nav-links");
  if (burger && links) {
    burger.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // ---- Rolling hero ----
  var slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      var i = 0;
      setInterval(function () {
        slides[i].classList.remove("active");
        i = (i + 1) % slides.length;
        slides[i].classList.add("active");
      }, 6000);
    }
  }

  // ---- Reveal on scroll ----
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.14 });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("in"); });
  }
})();
