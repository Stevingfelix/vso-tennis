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

    updateTrail();
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

  /* ---------- Oversized ghost typography ---------- */
  (function ghosts() {
    var GHOST = {
      story:     { text: "1970s",  size: 23, css: "bottom:-3%;right:-1%" },
      programme: { text: "PLAY",   size: 31, css: "top:50%;right:-2%;transform:translateY(-50%)" },
      videos:    { text: "REPLAY", size: 23, css: "bottom:-5%;left:-2%" },
      gallery:   { text: "RALLY",  size: 27, css: "top:-3%;right:-2%" },
      champions: { text: "FOR ALL", size: 24, mods: "lite", css: "bottom:-4%;left:-2%" },
      contact:   { text: "PLAY",   size: 30, css: "top:36%;left:-2%" }
    };
    Object.keys(GHOST).forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec) return;
      var g = GHOST[id];
      sec.insertAdjacentHTML(
        "beforeend",
        '<span class="ghost ' + (g.mods || "") + '" aria-hidden="true" style="font-size:' + g.size + 'vw;' + g.css + '">' + g.text + "</span>"
      );
    });
  })();

  /* ---------- Travelling ball + trail ---------- */
  var SVGNS = "http://www.w3.org/2000/svg";
  var trail = null, trailPath = null, trailBall = null;
  var trailH = 0, trailCx = 0, trailAmp = 0, trailWaves = 6;

  function svgCircle(cx, cy, r, cls) {
    var c = document.createElementNS(SVGNS, "circle");
    c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", r);
    c.setAttribute("class", cls);
    return c;
  }
  function buildTrail() {
    if (reduce) return;
    var W = document.documentElement.clientWidth;
    var H = document.documentElement.scrollHeight;
    trailH = H; trailCx = W / 2;
    trailAmp = Math.min(W * 0.3, 380);
    trailWaves = Math.max(4, Math.min(9, Math.round(H / (window.innerHeight * 1.15))));

    var steps = 90, d = "";
    for (var i = 0; i <= steps; i++) {
      var t = i / steps, y = t * H;
      var x = trailCx + trailAmp * Math.sin(t * Math.PI * trailWaves);
      d += (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
    }
    if (!trail) {
      trail = document.createElementNS(SVGNS, "svg");
      trail.setAttribute("class", "trail-svg");
      trail.setAttribute("preserveAspectRatio", "none");
      trail.setAttribute("aria-hidden", "true");
      trailPath = document.createElementNS(SVGNS, "path");
      trailPath.setAttribute("class", "trail-path");
      trailPath.setAttribute("pathLength", "1");
      trailPath.setAttribute("stroke-dasharray", "1 1");
      var g = document.createElementNS(SVGNS, "g");
      g.appendChild(svgCircle(0, 0, 22, "trail-ball-glow"));
      g.appendChild(svgCircle(0, 0, 8, "trail-ball"));
      g.appendChild(svgCircle(-2.4, -2.4, 2.4, "trail-ball-core"));
      trailBall = g;
      trail.appendChild(trailPath);
      trail.appendChild(g);
      document.body.insertBefore(trail, document.body.firstChild);
    }
    trail.setAttribute("viewBox", "0 0 " + W + " " + H);
    trail.setAttribute("width", W);
    trail.setAttribute("height", H);
    trail.style.height = H + "px";
    trailPath.setAttribute("d", d.trim());
    updateTrail();
  }
  function updateTrail() {
    if (reduce || !trail) return;
    var ballY = Math.max(0, Math.min(trailH, window.scrollY + window.innerHeight * 0.5));
    var frac = trailH ? ballY / trailH : 0;
    trailPath.setAttribute("stroke-dashoffset", (1 - frac).toFixed(4));
    var x = trailCx + trailAmp * Math.sin(frac * Math.PI * trailWaves);
    trailBall.setAttribute("transform", "translate(" + x.toFixed(1) + "," + ballY.toFixed(1) + ")");
  }
  buildTrail();
  window.addEventListener("load", buildTrail);
  window.addEventListener("resize", buildTrail);
  setTimeout(buildTrail, 1200);
  setTimeout(buildTrail, 2600);

  /* ---------- Year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
