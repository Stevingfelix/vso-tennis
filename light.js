/* ==========================================================================
   VSO Table Tennis — light.js (light concept)
   Custom cursor · showreel scroll-parallax · hover-preview videos ·
   photo gallery + lightbox · scroll reveals · nav.
   ========================================================================== */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Media data ---------- */
  var IMAGES = [
    { cat: "action", src: "assets/img/action/womens-singles-rally.jpg", tag: "Match", caption: "Women's singles rally at a VSO tournament" },
    { cat: "action", src: "assets/img/action/mens-singles-serve.jpg", tag: "Match", caption: "Serving in a men's singles match" },
    { cat: "action", src: "assets/img/action/vintage-doubles-match.jpg", tag: "Heritage", caption: "Table tennis, the way it always was" },
    { cat: "training", src: "assets/img/training/coach-teaching-grip.jpg", tag: "Coaching", caption: "Coach guiding a young player's grip" },
    { cat: "training", src: "assets/img/training/schoolkids-rackets-raised.jpg", tag: "Schools", caption: "Schoolchildren ready to play, rackets raised" },
    { cat: "training", src: "assets/img/training/kids-session-hands-raised.jpg", tag: "Schools", caption: "A buzzing school session" },
    { cat: "training", src: "assets/img/training/coach-with-schoolkids.jpg", tag: "Schools", caption: "Coach with students at a VSO-provided table" },
    { cat: "training", src: "assets/img/training/kids-mini-table-demo.jpg", tag: "Schools", caption: "Learning the game on a mini table" },
    { cat: "training", src: "assets/img/training/coach-handing-racket.jpg", tag: "Schools", caption: "Putting rackets into young hands" },
    { cat: "training", src: "assets/img/training/schoolkids-rackets-raised-2.jpg", tag: "Schools", caption: "A new generation of players" },
    { cat: "training", src: "assets/img/training/coach-with-kids.jpg", tag: "Schools", caption: "Grassroots coaching in action" },
    { cat: "endorsements", src: "assets/img/endorsements/governor-adeleke-handover-hires.jpg", tag: "Honours", caption: "Presenting the Osun State Table Tennis Youth Programme plaque to Governor Adeleke" },
    { cat: "endorsements", src: "assets/img/endorsements/medal-presentation.jpg", tag: "Honours", caption: "Medal presentation at a championship" },
    { cat: "endorsements", src: "assets/img/endorsements/medal-winner-handshake.jpg", tag: "Honours", caption: "Congratulating a medal winner" },
    { cat: "endorsements", src: "assets/img/endorsements/awards-handshake-trophies.jpg", tag: "Honours", caption: "Awards day — trophies on the line" },
    { cat: "endorsements", src: "assets/img/endorsements/coach-girl-dignitary.jpg", tag: "Honours", caption: "A young player honoured alongside dignitaries" },
    { cat: "portraits", src: "assets/img/portraits/coach-tournament-hall.jpg", tag: "Team", caption: "Coach Laja at a tournament hall" },
    { cat: "portraits", src: "assets/img/portraits/coach-with-female-player.jpg", tag: "Team", caption: "Coach with a young player" },
    { cat: "portraits", src: "assets/img/portraits/mens-group-around-table.jpg", tag: "Team", caption: "The community around the table" },
    { cat: "portraits", src: "assets/img/portraits/coach-with-girl.jpg", tag: "Team", caption: "Encouraging the next generation" },
    { cat: "portraits", src: "assets/img/portraits/coach-group-selfie.jpg", tag: "Team", caption: "Players and officials together" }
  ];
  var VIDEOS = [
    { src: "assets/video/vso-clip-03.mp4", poster: "assets/img/action/womens-singles-rally.jpg", title: "Match-day rally", caption: "Match-day rally" },
    { src: "assets/video/vso-clip-01.mp4", poster: "assets/img/training/coach-teaching-grip.jpg", title: "Coaching", caption: "VSO in motion — coaching" },
    { src: "assets/video/vso-clip-02.mp4", poster: "assets/img/action/mens-singles-serve.jpg", title: "On the table", caption: "On the table" },
    { src: "assets/video/vso-clip-04.mp4", poster: "assets/img/training/schoolkids-rackets-raised.jpg", title: "School programme", caption: "School programme highlights" },
    { src: "assets/video/vso-clip-05.mp4", poster: "assets/img/portraits/coach-tournament-hall.jpg", title: "Tournament", caption: "Tournament atmosphere" },
    { src: "assets/video/vso-clip-06.mp4", poster: "assets/img/training/kids-session-hands-raised.jpg", title: "Grassroots", caption: "Grassroots energy" }
  ];

  /* Lightbox playlist = videos first, then images */
  var LB = VIDEOS.map(function (v) { return { type: "video", src: v.src, poster: v.poster, caption: v.caption }; })
    .concat(IMAGES.map(function (i) { return { type: "image", src: i.src, caption: i.caption }; }));
  var IMG_OFFSET = VIDEOS.length;

  /* ---------- Build videos section ---------- */
  var videoGrid = document.getElementById("videoGrid");
  VIDEOS.forEach(function (v, i) {
    var card = document.createElement("button");
    card.className = "video-card";
    card.type = "button";
    card.setAttribute("data-media", "Play");
    card.setAttribute("aria-label", "Play: " + v.title);

    var img = document.createElement("img");
    img.src = v.poster; img.alt = v.title; img.loading = "lazy";
    card.appendChild(img);

    var vid = document.createElement("video");
    vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = "none";
    vid.poster = v.poster;
    card.appendChild(vid);

    var meta = document.createElement("div");
    meta.className = "v-meta";
    meta.innerHTML = '<span class="v-title">' + v.title + '</span><span class="v-play"></span>';
    card.appendChild(meta);

    // hover preview (desktop, fine pointer, motion ok)
    if (fine && !reduce) {
      var loaded = false;
      card.addEventListener("mouseenter", function () {
        if (!loaded) { vid.src = v.src; loaded = true; }
        card.classList.add("playing");
        var p = vid.play(); if (p && p.catch) p.catch(function () {});
      });
      card.addEventListener("mouseleave", function () {
        card.classList.remove("playing");
        vid.pause();
      });
    }
    card.addEventListener("click", function () { openLightbox(i); });
    videoGrid.appendChild(card);
  });

  /* ---------- Build photo gallery ---------- */
  var masonry = document.getElementById("masonry");
  IMAGES.forEach(function (item, i) {
    var tile = document.createElement("button");
    tile.className = "tile";
    tile.type = "button";
    tile.setAttribute("data-cat", item.cat);
    tile.setAttribute("data-lb", IMG_OFFSET + i);
    tile.setAttribute("data-media", "View");
    tile.setAttribute("aria-label", "View: " + item.caption);
    var img = document.createElement("img");
    img.loading = "lazy"; img.src = item.src; img.alt = item.caption;
    tile.appendChild(img);
    var tag = document.createElement("span");
    tag.className = "tile-tag"; tag.textContent = item.tag;
    tile.appendChild(tag);
    tile.addEventListener("click", function () { openLightbox(IMG_OFFSET + i); });
    masonry.appendChild(tile);
  });

  /* ---------- Gallery filters ---------- */
  var filters = document.getElementById("galleryFilters");
  filters.addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    filters.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
    btn.classList.add("is-active");
    var f = btn.getAttribute("data-filter");
    masonry.querySelectorAll(".tile").forEach(function (t) {
      t.classList.toggle("is-hidden", !(f === "all" || t.getAttribute("data-cat") === f));
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var stage = document.getElementById("lbStage");
  var cap = document.getElementById("lbCaption");
  var current = 0;

  function render(i) {
    var item = LB[i];
    stage.innerHTML = "";
    var el;
    if (item.type === "video") {
      el = document.createElement("video");
      el.src = item.src; el.controls = true; el.autoplay = true; el.playsInline = true;
      if (item.poster) el.poster = item.poster;
    } else {
      el = document.createElement("img"); el.src = item.src; el.alt = item.caption;
    }
    stage.appendChild(el);
    cap.textContent = item.caption;
    current = i;
  }
  function openLightbox(i) {
    render(i); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; stage.innerHTML = "";
  }
  function step(dir) { render((current + dir + LB.length) % LB.length); }

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

  /* ---------- Showreel: scroll parallax + progress ---------- */
  var reel = document.getElementById("reel");
  var reelVideo = document.getElementById("showreelVideo");
  var reelProgress = document.getElementById("reelProgress");
  var reelToggle = document.getElementById("reelToggle");
  var reelTrack = document.querySelector(".showreel-track");

  if (reelToggle && reel) {
    var ico = reelToggle.querySelector(".reel-ico");
    var lbl = reelToggle.querySelector(".reel-label");
    function setReel(playing) {
      ico.setAttribute("data-state", playing ? "pause" : "play");
      lbl.textContent = playing ? "Pause" : "Watch";
    }
    reelToggle.addEventListener("click", function () {
      if (reel.paused) { reel.play(); setReel(true); } else { reel.pause(); setReel(false); }
    });
    // autoplay muted when the reel scrolls into view (desktop / motion ok)
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !reduce) {
            if (!reel.src && !reel.querySelector("source").src) { /* source already set */ }
            var p = reel.play(); if (p && p.then) p.then(function () { setReel(true); }).catch(function () {});
          } else { reel.pause(); setReel(false); }
        });
      }, { threshold: 0.5 }).observe(reelVideo);
    }
  }

  /* ---------- Parallax engine (rAF, scroll-linked) ---------- */
  var parallaxEls = [].slice.call(document.querySelectorAll("[data-parallax]"));
  var ticking = false;

  function onScroll() {
    if (!ticking) { window.requestAnimationFrame(updateParallax); ticking = true; }
  }
  function updateParallax() {
    ticking = false;
    var vh = window.innerHeight;

    // generic parallax elements
    if (!reduce) {
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-speed")) || -0.1;
        var rect = el.getBoundingClientRect();
        var offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
    }

    // showreel: scale video + drive progress bar across the sticky track
    if (reelTrack) {
      var tr = reelTrack.getBoundingClientRect();
      var total = tr.height - vh;
      var prog = total > 0 ? Math.min(1, Math.max(0, -tr.top / total)) : 0;
      if (reelProgress) reelProgress.style.width = (prog * 100).toFixed(1) + "%";
      if (reelVideo && !reduce) {
        var scale = 1.18 - prog * 0.18; // 1.18 → 1.00 as you scroll through
        reelVideo.style.transform = "scale(" + scale.toFixed(3) + ")";
      }
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateParallax();

  /* ---------- Custom cursor ---------- */
  if (fine) {
    document.body.classList.add("has-cursor");
    var dot = document.createElement("div"); dot.className = "cursor-dot";
    var ring = document.createElement("div"); ring.className = "cursor-ring";
    ring.innerHTML = '<span class="cursor-label">View</span>';
    document.body.appendChild(dot); document.body.appendChild(ring);
    var ringLabel = ring.querySelector(".cursor-label");

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var rx = mx, ry = my;
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
    });
    (function follow() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = "translate3d(" + rx.toFixed(2) + "px," + ry.toFixed(2) + "px,0)";
      window.requestAnimationFrame(follow);
    })();

    document.addEventListener("mouseover", function (e) {
      var media = e.target.closest("[data-media]");
      var link = e.target.closest('a, button, .chip, input, select, textarea, label');
      document.body.classList.toggle("cur-media", !!media);
      document.body.classList.toggle("cur-link", !media && !!link);
      if (media) ringLabel.textContent = media.getAttribute("data-media") || "View";
    });
    document.addEventListener("mouseleave", function () { document.body.classList.add("cur-hidden"); });
    document.addEventListener("mouseenter", function () { document.body.classList.remove("cur-hidden"); });
  }

  /* ---------- Reveals (with stagger) ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var sibs = [].slice.call(entry.target.parentElement.querySelectorAll(":scope > [data-reveal]"));
          var idx = Math.max(0, sibs.indexOf(entry.target));
          entry.target.style.transitionDelay = (idx % 6) * 70 + "ms";
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Hero word reveal ---------- */
  var hero = document.getElementById("hero");
  if (hero) {
    var words = hero.querySelectorAll(".hero-title .w");
    words.forEach(function (w, i) { w.style.transitionDelay = (i * 70 + 120) + "ms"; });
    requestAnimationFrame(function () { hero.classList.add("in"); });
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });

  /* ---------- Header state ---------- */
  var header = document.querySelector(".site-header");
  function headerState() { header.classList.toggle("scrolled", window.scrollY > 24); }
  headerState();
  window.addEventListener("scroll", headerState, { passive: true });

  /* ---------- Decorative doodles ---------- */
  (function doodles() {
    var SPRITE =
      '<svg class="doodle-defs" aria-hidden="true">' +
      // ball-trajectory arc (seam connector)
      '<symbol id="dl-arc" viewBox="0 0 260 130"><g fill="none" stroke="currentColor" stroke-linecap="round">' +
      '<path d="M8 116 C 64 10 192 6 250 78" stroke-width="3" stroke-dasharray="0.5 13"/>' +
      '<circle cx="250" cy="80" r="8" stroke-width="3"/></g></symbol>' +
      // paddle / racket
      '<symbol id="dl-paddle" viewBox="0 0 120 152"><g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M60 7 C 31 5 13 28 13 55 C 13 83 35 104 60 104 C 85 104 107 84 107 56 C 107 29 89 9 60 7 Z"/>' +
      '<path d="M51 103 L47 142 C 47 149 73 149 73 142 L69 103"/></g></symbol>' +
      // ball with motion lines
      '<symbol id="dl-ball" viewBox="0 0 92 60"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">' +
      '<circle cx="64" cy="30" r="16"/><path d="M6 17 H33"/><path d="M2 31 H30"/><path d="M9 45 H32"/></g></symbol>' +
      // double underline swoosh
      '<symbol id="dl-underline" viewBox="0 0 240 28"><g fill="none" stroke="currentColor" stroke-linecap="round">' +
      '<path d="M6 15 C 64 6 156 7 234 12" stroke-width="4"/><path d="M12 23 C 74 16 162 17 228 21" stroke-width="3" opacity=".7"/></g></symbol>' +
      // loose scribbled circle
      '<symbol id="dl-scribble" viewBox="0 0 132 122"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">' +
      '<path d="M88 18 C 42 4 16 42 20 72 C 24 102 74 116 102 100 C 128 85 124 40 92 27 C 62 15 35 32 34 58"/></g></symbol>' +
      // four-point spark
      '<symbol id="dl-star" viewBox="0 0 60 60"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' +
      '<path d="M30 5 C 33 22 38 27 55 30 C 38 33 33 38 30 55 C 27 38 22 33 5 30 C 22 27 27 22 30 5 Z"/></g></symbol>' +
      // squiggle
      '<symbol id="dl-squiggle" viewBox="0 0 150 24"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">' +
      '<path d="M5 13 Q 23 1 41 13 T 77 13 T 113 13 T 146 12"/></g></symbol>' +
      // table net
      '<symbol id="dl-net" viewBox="0 0 132 52"><g fill="none" stroke="currentColor" stroke-linecap="round">' +
      '<path d="M5 7 H127 M5 45 H127" stroke-width="3"/>' +
      '<path d="M16 7 V45 M32 7 V45 M48 7 V45 M64 7 V45 M80 7 V45 M96 7 V45 M112 7 V45" stroke-width="1.8" opacity=".65"/></g></symbol>' +
      // hand-drawn arrow
      '<symbol id="dl-arrow" viewBox="0 0 120 84"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M8 14 C 52 6 96 22 104 60"/><path d="M86 52 L106 62 L102 42"/></g></symbol>' +
      '</svg>';
    document.body.insertAdjacentHTML("afterbegin", SPRITE);

    var RATIO = { arc: 2, paddle: 0.79, ball: 1.53, underline: 8.57, scribble: 1.08, star: 1, squiggle: 6.25, net: 2.54, arrow: 1.43 };
    var PLACE = {
      hero: [
        { sym: "squiggle", w: 112, css: "top:104px;left:6%", rot: -4, mods: "red hide-sm" },
        { sym: "ball", w: 76, css: "bottom:13%;left:1.5%", rot: -6, mods: "float hide-sm" },
        { sym: "underline", w: 168, css: "bottom:29%;left:6%", rot: -2, mods: "red hide-sm" }
      ],
      story: [
        { sym: "scribble", w: 96, css: "top:9%;left:-1%", rot: 0, mods: "hide-sm" },
        { sym: "star", w: 40, css: "bottom:15%;left:46%", rot: 0, mods: "red" },
        { sym: "arc", w: 236, css: "bottom:-44px;right:7%", rot: 7, mods: "hide-sm" }
      ],
      programme: [
        { sym: "net", w: 120, css: "top:13%;right:3%", rot: -6, mods: "hide-sm" },
        { sym: "ball", w: 70, css: "bottom:9%;left:1%", rot: 8, mods: "float alt hide-sm" }
      ],
      videos: [
        { sym: "star", w: 46, css: "top:15%;right:6%", rot: 0, mods: "red hide-sm" },
        { sym: "squiggle", w: 128, css: "bottom:7%;left:3%", rot: 4, mods: "hide-sm" },
        { sym: "arc", w: 230, css: "bottom:-42px;left:10%", rot: -6, mods: "hide-sm" }
      ],
      gallery: [
        { sym: "paddle", w: 74, css: "top:11%;left:1.5%", rot: -12, mods: "float hide-sm" },
        { sym: "star", w: 38, css: "bottom:20%;right:4%", rot: 0, mods: "red" }
      ],
      join: [
        { sym: "star", w: 46, css: "top:20%;left:9%", rot: 0, mods: "lite hide-sm" },
        { sym: "ball", w: 66, css: "top:24%;right:9%", rot: -8, mods: "lite hide-sm" },
        { sym: "arc", w: 230, css: "bottom:-40px;right:12%", rot: 8, mods: "lite hide-sm" }
      ],
      champions: [
        { sym: "ball", w: 64, css: "top:9%;right:6%", rot: 0, mods: "lite hide-sm" },
        { sym: "squiggle", w: 120, css: "top:7%;left:3%", rot: -3, mods: "red hide-sm" }
      ],
      contact: [
        { sym: "scribble", w: 90, css: "top:11%;right:4%", rot: 0, mods: "hide-sm" },
        { sym: "arrow", w: 108, css: "bottom:34%;left:39%", rot: 0, mods: "red hide-sm" },
        { sym: "star", w: 36, css: "top:22%;left:3%", rot: 0, mods: "" }
      ]
    };

    Object.keys(PLACE).forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec) return;
      PLACE[id].forEach(function (it) {
        var h = Math.round(it.w / (RATIO[it.sym] || 1));
        var style = "width:" + it.w + "px;height:" + h + "px;" + it.css + ";--rot:" + it.rot + "deg";
        sec.insertAdjacentHTML(
          "beforeend",
          '<svg class="doodle ' + (it.mods || "") + '" style="' + style + '" aria-hidden="true"><use href="#dl-' + it.sym + '"/></svg>'
        );
      });
    });
  })();

  /* ---------- Year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
