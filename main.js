/* ==========================================================================
   VSO Table Tennis — main.js
   Gallery + lightbox (photo & video), nav, scroll reveal, header state.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Gallery data ----------
     type: "image" | "video"
     cat:  filter key used by the chips (action | training | endorsements | portraits | video)
     For videos, `poster` is the still shown in the grid.                     */
  var ITEMS = [
    // Matches / action
    { type: "image", cat: "action", src: "assets/img/action/womens-singles-rally.jpg", tag: "Match", caption: "Women's singles rally at a VSO tournament" },
    { type: "image", cat: "action", src: "assets/img/action/mens-singles-serve.jpg", tag: "Match", caption: "Serving in a men's singles match" },
    { type: "image", cat: "action", src: "assets/img/action/vintage-doubles-match.jpg", tag: "Heritage", caption: "Table tennis, the way it always was" },

    // Coaching & schools
    { type: "image", cat: "training", src: "assets/img/training/coach-teaching-grip.jpg", tag: "Coaching", caption: "Coach guiding a young player's grip" },
    { type: "image", cat: "training", src: "assets/img/training/schoolkids-rackets-raised.jpg", tag: "Schools", caption: "Schoolchildren ready to play, rackets raised" },
    { type: "image", cat: "training", src: "assets/img/training/kids-session-hands-raised.jpg", tag: "Schools", caption: "A buzzing school session" },
    { type: "image", cat: "training", src: "assets/img/training/coach-with-schoolkids.jpg", tag: "Schools", caption: "Coach with students at a VSO-provided table" },
    { type: "image", cat: "training", src: "assets/img/training/kids-mini-table-demo.jpg", tag: "Schools", caption: "Learning the game on a mini table" },
    { type: "image", cat: "training", src: "assets/img/training/coach-handing-racket.jpg", tag: "Schools", caption: "Putting rackets into young hands" },
    { type: "image", cat: "training", src: "assets/img/training/schoolkids-rackets-raised-2.jpg", tag: "Schools", caption: "A new generation of players" },
    { type: "image", cat: "training", src: "assets/img/training/coach-with-kids.jpg", tag: "Schools", caption: "Grassroots coaching in action" },

    // Honours / endorsements
    { type: "image", cat: "endorsements", src: "assets/img/endorsements/governor-adeleke-handover-hires.jpg", tag: "Honours", caption: "Presenting the Osun State Table Tennis Youth Programme plaque to Governor Adeleke" },
    { type: "image", cat: "endorsements", src: "assets/img/endorsements/governor-adeleke-handover.jpg", tag: "Honours", caption: "Recognition at state level" },
    { type: "image", cat: "endorsements", src: "assets/img/endorsements/medal-presentation.jpg", tag: "Honours", caption: "Medal presentation at a championship" },
    { type: "image", cat: "endorsements", src: "assets/img/endorsements/medal-winner-handshake.jpg", tag: "Honours", caption: "Congratulating a medal winner" },
    { type: "image", cat: "endorsements", src: "assets/img/endorsements/awards-handshake-trophies.jpg", tag: "Honours", caption: "Awards day — trophies on the line" },
    { type: "image", cat: "endorsements", src: "assets/img/endorsements/coach-girl-dignitary.jpg", tag: "Honours", caption: "A young player honoured alongside dignitaries" },

    // Team / portraits
    { type: "image", cat: "portraits", src: "assets/img/portraits/coach-tournament-hall.jpg", tag: "Team", caption: "Coach Laja at a tournament hall" },
    { type: "image", cat: "portraits", src: "assets/img/portraits/coach-with-female-player.jpg", tag: "Team", caption: "Coach with a young player" },
    { type: "image", cat: "portraits", src: "assets/img/portraits/mens-group-around-table.jpg", tag: "Team", caption: "The community around the table" },
    { type: "image", cat: "portraits", src: "assets/img/portraits/coach-with-girl.jpg", tag: "Team", caption: "Encouraging the next generation" },
    { type: "image", cat: "portraits", src: "assets/img/portraits/coach-tournament-hall-2.jpg", tag: "Team", caption: "Inside a JOOLA-branded tournament" },
    { type: "image", cat: "portraits", src: "assets/img/portraits/coach-group-selfie.jpg", tag: "Team", caption: "Players and officials together" },
    { type: "image", cat: "portraits", src: "assets/img/portraits/coach-with-colleague.jpg", tag: "Team", caption: "Coach Laja with a colleague" },

    // Video
    { type: "video", cat: "video", src: "assets/video/vso-clip-01.mp4", poster: "assets/img/training/coach-teaching-grip.jpg", tag: "Video", caption: "VSO in motion" },
    { type: "video", cat: "video", src: "assets/video/vso-clip-02.mp4", poster: "assets/img/action/mens-singles-serve.jpg", tag: "Video", caption: "On the table" },
    { type: "video", cat: "video", src: "assets/video/vso-clip-03.mp4", poster: "assets/img/action/womens-singles-rally.jpg", tag: "Video", caption: "Match-day rally" },
    { type: "video", cat: "video", src: "assets/video/vso-clip-04.mp4", poster: "assets/img/training/schoolkids-rackets-raised.jpg", tag: "Video", caption: "School programme highlights" },
    { type: "video", cat: "video", src: "assets/video/vso-clip-05.mp4", poster: "assets/img/portraits/coach-tournament-hall.jpg", tag: "Video", caption: "Tournament atmosphere" },
    { type: "video", cat: "video", src: "assets/video/vso-clip-06.mp4", poster: "assets/img/training/kids-session-hands-raised.jpg", tag: "Video", caption: "Grassroots energy" }
  ];

  var masonry = document.getElementById("masonry");

  /* ---------- Build gallery tiles ---------- */
  ITEMS.forEach(function (item, i) {
    var tile = document.createElement("button");
    tile.className = "tile";
    tile.type = "button";
    tile.setAttribute("data-cat", item.cat);
    tile.setAttribute("data-index", i);
    tile.setAttribute("aria-label", "View: " + item.caption);

    var img = document.createElement("img");
    img.loading = "lazy";
    img.src = item.type === "video" ? item.poster : item.src;
    img.alt = item.caption;
    tile.appendChild(img);

    var tag = document.createElement("span");
    tag.className = "tile-tag";
    tag.textContent = item.tag;
    tile.appendChild(tag);

    if (item.type === "video") {
      var play = document.createElement("span");
      play.className = "tile-play";
      play.innerHTML = "<span></span>";
      tile.appendChild(play);
    }

    tile.addEventListener("click", function () { openLightbox(i); });
    masonry.appendChild(tile);
  });

  /* ---------- Filters ---------- */
  var filters = document.getElementById("galleryFilters");
  filters.addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    filters.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
    btn.classList.add("is-active");
    var f = btn.getAttribute("data-filter");
    masonry.querySelectorAll(".tile").forEach(function (t) {
      var show = f === "all" || t.getAttribute("data-cat") === f;
      t.classList.toggle("is-hidden", !show);
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var stage = document.getElementById("lbStage");
  var cap = document.getElementById("lbCaption");
  var current = 0;

  function visibleIndexes() {
    return ITEMS.map(function (_, i) { return i; }).filter(function (i) {
      return !masonry.querySelector('.tile[data-index="' + i + '"]').classList.contains("is-hidden");
    });
  }

  function render(i) {
    var item = ITEMS[i];
    stage.innerHTML = "";
    var el;
    if (item.type === "video") {
      el = document.createElement("video");
      el.src = item.src;
      el.controls = true;
      el.autoplay = true;
      el.playsInline = true;
      if (item.poster) el.poster = item.poster;
    } else {
      el = document.createElement("img");
      el.src = item.src;
      el.alt = item.caption;
    }
    stage.appendChild(el);
    cap.textContent = item.caption;
    current = i;
  }

  function openLightbox(i) {
    render(i);
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    stage.innerHTML = "";
  }

  function step(dir) {
    var vis = visibleIndexes();
    if (!vis.length) return;
    var pos = vis.indexOf(current);
    var next = (pos + dir + vis.length) % vis.length;
    render(vis[next]);
  }

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbNext").addEventListener("click", function () { step(1); });
  document.getElementById("lbPrev").addEventListener("click", function () { step(-1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  });

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Header scrolled state ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 24); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
