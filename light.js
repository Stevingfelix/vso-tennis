/* ==========================================================================
   VSO Table Tennis — light.js (light concept)
   Custom cursor · showreel scroll-parallax · hover-preview videos ·
   photo gallery + lightbox · scroll reveals · nav.
   ========================================================================== */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Preloader (every page) — covers until the page has loaded ---------- */
  var intro = document.getElementById("intro");
  if (intro) {
    document.body.classList.add("intro-lock");
    intro.addEventListener("transitionend", function () {
      if (intro.parentNode) intro.parentNode.removeChild(intro);
    });
    var minMs = reduce ? 800 : 1700;   // keep the splash clearly visible on every load
    var maxMs = 6000;                   // safety cap if something hangs
    var t0 = Date.now();
    var done = false;
    function hideIntro() {
      if (done) return; done = true;
      var wait = Math.max(0, minMs - (Date.now() - t0));
      setTimeout(function () {
        intro.classList.add("intro--done");
        document.body.classList.remove("intro-lock");
      }, wait);
    }
    if (document.readyState === "complete") hideIntro();
    else window.addEventListener("load", hideIntro);
    setTimeout(hideIntro, maxMs);
  }

  /* ---------- Media data ---------- */
  var IMAGES = [
    { cat: "action", src: "assets/img/action/womens-singles-rally.jpg", tag: "Match", caption: "Women's singles rally at a VSO tournament" },
    { cat: "action", src: "assets/img/action/mens-singles-serve.jpg", tag: "Match", caption: "Serving in a men's singles match" },
    { cat: "action", src: "assets/img/action/director-usa-michigan.jpg", tag: "Heritage", caption: "The Director of Value Sports One (VSO) in the United States during his playing days — he represented Michigan State after leaving Nigeria." },
    { cat: "action", src: "assets/img/action/tajudeen-oladokun-michigan.jpg", tag: "Heritage", caption: "Tajudeen Oladokun, Team Mate Of The Director Of Value Sports One In Michigan State." },
    { cat: "training", src: "assets/img/training/coach-teaching-grip.jpg", tag: "Coaching", caption: "Coach guiding a young player's grip" },
    { cat: "training", src: "assets/img/training/schoolkids-rackets-raised.jpg", tag: "Schools", caption: "Schoolchildren ready to play, rackets raised" },
    { cat: "training", src: "assets/img/training/kids-session-hands-raised.jpg", tag: "Schools", caption: "A buzzing school session" },
    { cat: "training", src: "assets/img/training/coach-with-schoolkids.jpg", tag: "Schools", caption: "Coach with students at a VSO-provided table" },
    { cat: "training", src: "assets/img/training/kids-mini-table-demo.jpg", tag: "Schools", caption: "Learning the game on a mini table" },
    { cat: "training", src: "assets/img/training/coach-handing-racket.jpg", tag: "Schools", caption: "Putting rackets into young hands" },
    { cat: "training", src: "assets/img/training/schoolkids-rackets-raised-2.jpg", tag: "Schools", caption: "A new generation of players" },
    { cat: "training", src: "assets/img/training/coach-with-kids.jpg", tag: "Schools", caption: "Grassroots coaching in action" },
    { cat: "endorsements", src: "assets/img/endorsements/governor-adeleke-handover-hires.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) presenting the Osun State Table Tennis Youth Programme plaque to Governor Adeleke." },
    { cat: "endorsements", src: "assets/img/endorsements/coach-with-cosmas-maduka.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Dr. Cosmas Maduka — President of the Coscharis Group, former President of the Nigeria Table Tennis Federation (NTTA) and a former member of the International Table Tennis Federation (ITTF)." },
    { cat: "endorsements", src: "assets/img/endorsements/commissioner-gbenga-omotoso.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Gbenga Omotoso — Lagos State Commissioner for Information and Strategy." },
    { cat: "endorsements", src: "assets/img/endorsements/gbenga-omotoso-2.jpg", tag: "Honours", caption: "This is the honourable Commissioner of Lagos State for Information and Strategies Gbenga Omotoso, with Director, VSO." },
    { cat: "endorsements", src: "assets/img/endorsements/toriola-and-ojebode.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Quadri Aruna — Africa Table Tennis Champion and Nigeria's current number one." },
    { cat: "endorsements", src: "assets/img/endorsements/toriola-and-ojebode-2.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Segun Toriola — former Africa and Commonwealth Table Tennis Champion and seven-time Olympian — and Michael Oyebode, Nigeria's Olympic table tennis coach." },
    { cat: "endorsements", src: "assets/img/endorsements/osun-deputy-governor-champions.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with the Deputy Governor of Osun State, Kasali Lasisi (former Africa Table Tennis Champion), Bose Kafo (former Africa Women's Table Tennis Champion and five-time Olympian) and Barrister Wahab Shitu (SAN)." },
    { cat: "endorsements", src: "assets/img/endorsements/dr-femi-olugbile.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Dr. Femi Olugbile — member of the ITTF Sports Science Committee." },
    { cat: "endorsements", src: "assets/img/endorsements/kabiyesi-elemuren-of-emuren.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with the Kabiyesi, the Elemuren of Emuren Land." },
    { cat: "endorsements", src: "assets/img/endorsements/sunday-eboh-wahed-ekun.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Sunday Eboh, former Africa Table Tennis Champion, and Wahed Ekun — winner of the first National Sports Festival (1973), who defeated Eboh in the intermediate boys' singles final." },
    { cat: "endorsements", src: "assets/img/endorsements/lekan-fatodu-dg-lagos-sports.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Hon. Lekan Fatodu — Lagos State Commissioner for Sports." },
    { cat: "endorsements", src: "assets/img/endorsements/commissioner-ogunlende-youth.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Hon. Mobolaji Abubakre Ogunlende — Commissioner, Lagos State Ministry of Youth & Social Development." },
    { cat: "endorsements", src: "assets/img/endorsements/prince-kola-adewusi-deputy-gov.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Prince Kola Adewusi, Deputy Governor of Osun State." },
    { cat: "endorsements", src: "assets/img/endorsements/atanda-musa.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Atanda Musa (aka 'Mansa Musa') — former Africa and Commonwealth Table Tennis Champion." },
    { cat: "endorsements", src: "assets/img/endorsements/kamoru-ajisafe-pdp.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Hon. Kamoru Ajisafe — Chairman, PDP South-West." },
    { cat: "endorsements", src: "assets/img/endorsements/chief-waheed-ekun.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Chief Waheed Ekun." },
    { cat: "endorsements", src: "assets/img/endorsements/wahab-shittu.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Barrister Wahab Shittu (SAN), former table tennis player." },
    { cat: "endorsements", src: "assets/img/endorsements/prince-wale-eletu.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Prince Wale Eletu." },
    { cat: "endorsements", src: "assets/img/endorsements/francis-sule-kasali-lasisi.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Francis Sule — Nigeria's first professional table tennis player — and Kasali Lasisi, former Africa Table Tennis Champion." },
    { cat: "endorsements", src: "assets/img/endorsements/majekodunmi-and-oshinaike.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Olawunmi 'Majek' Majekodunmi and Funke Oshonaike — both former Africa Table Tennis Champions." },
    { cat: "endorsements", src: "assets/img/endorsements/majekodunmi-champions.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with Dr. Adesoji Tayo, President of the Nigeria Table Tennis Federation (NTTF), and Barrister Ramoni Shitta." },
    { cat: "endorsements", src: "assets/img/endorsements/coach-with-guests-championship.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) with guests at a table tennis championship." },
    { cat: "endorsements", src: "assets/img/endorsements/medal-presentation.jpg", tag: "Honours", caption: "Medal presentation at a championship" },
    { cat: "endorsements", src: "assets/img/endorsements/medal-winner-handshake.jpg", tag: "Honours", caption: "Congratulating a medal winner" },
    { cat: "endorsements", src: "assets/img/endorsements/awards-handshake-trophies.jpg", tag: "Honours", caption: "Awards day — trophies on the line" },
    { cat: "endorsements", src: "assets/img/endorsements/coach-girl-dignitary.jpg", tag: "Honours", caption: "Director, Value Sports One (VSO) and a young player with Atanda Musa (aka 'Mansa Musa') — former Africa and Commonwealth Table Tennis Champion." },
    { cat: "portraits", src: "assets/img/portraits/coach-tournament-hall.jpg", tag: "Team", caption: "Director, Value Sports One (VSO) at a tournament hall" },
    { cat: "portraits", src: "assets/img/portraits/coach-with-female-player.jpg", tag: "Team", caption: "Funke Oshonaike — former Africa Women's Champion, seven-time Olympian and current Olympic Athletes' Representative." },
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
    { src: "assets/video/vso-clip-06.mp4", poster: "assets/img/training/kids-session-hands-raised.jpg", title: "Grassroots", caption: "Grassroots energy" },
    { src: "assets/video/vso-clip-07.mp4", poster: "assets/img/training/vso-clip-07-poster.jpg", title: "Coaching session", caption: "Director, Value Sports One (VSO) playing table tennis with a boy child." }
  ];

  /* Lightbox playlist = videos first, then images */
  var LB = VIDEOS.map(function (v) { return { type: "video", src: v.src, poster: v.poster, caption: v.caption }; })
    .concat(IMAGES.map(function (i) { return { type: "image", src: i.src, caption: i.caption }; }));
  var IMG_OFFSET = VIDEOS.length;

  /* ---------- Build videos section ---------- */
  /* data-preview="N" on the grid => show only the first N (homepage teaser);
     omit it on the dedicated page to show everything */
  var videoGrid = document.getElementById("videoGrid");
  if (videoGrid) {
  var vPreview = parseInt(videoGrid.getAttribute("data-preview"), 10);
  (isNaN(vPreview) ? VIDEOS : VIDEOS.slice(0, vPreview)).forEach(function (v, i) {
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
  }

  /* ---------- Build photo gallery ---------- */
  var masonry = document.getElementById("masonry");
  if (masonry) {
  var gPreview = parseInt(masonry.getAttribute("data-preview"), 10);
  (isNaN(gPreview) ? IMAGES : IMAGES.slice(0, gPreview)).forEach(function (item, i) {
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
  }

  /* ---------- Gallery filters ---------- */
  var filters = document.getElementById("galleryFilters");
  if (filters && masonry) {
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
  }

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

  if (lb) {
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
  }

  /* ---------- Showreel: scroll parallax + progress ---------- */
  var reel = document.getElementById("reel");
  var reelVideo = document.getElementById("showreelVideo");
  var reelProgress = document.getElementById("reelProgress");
  var reelToggle = document.getElementById("reelToggle");
  var reelTrack = document.querySelector(".showreel-track");

  // autoplay the muted loop while the reel is in view; pause when it leaves
  if (reel && reelVideo && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !reduce) {
          var p = reel.play(); if (p && p.catch) p.catch(function () {});
        } else { reel.pause(); }
      });
    }, { threshold: 0.4 }).observe(reelVideo);
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
      if (reelVideo && !reduce && window.innerWidth > 760) {
        var scale = 1.14 - prog * 0.14; // cinematic zoom (desktop full-bleed only)
        reelVideo.style.transform = "scale(" + scale.toFixed(3) + ")";
      } else if (reelVideo) {
        reelVideo.style.transform = "none";
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
    var rx = mx, ry = my, rafId = null;
    function follow() {
      rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
      ring.style.transform = "translate3d(" + rx.toFixed(2) + "px," + ry.toFixed(2) + "px,0)";
      if (Math.abs(mx - rx) + Math.abs(my - ry) < 0.5) { rafId = null; return; } // settled — stop
      rafId = window.requestAnimationFrame(follow);
    }
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
      if (rafId === null) rafId = window.requestAnimationFrame(follow); // wake on movement
    });

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

  /* ---------- Champions: pop images in from their frame ----------
     Observe the (un-clipped) feature row, not the shot — the shot's
     clip-path collapses its width so its intersectionRatio reads 0.    */
  var champFeatures = document.querySelectorAll(".champ-feature");
  if ("IntersectionObserver" in window && champFeatures.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var shot = entry.target.querySelector(".champ-shot");
          if (shot) shot.classList.add("in");
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    champFeatures.forEach(function (el) { cio.observe(el); });
  } else {
    document.querySelectorAll(".champ-shot").forEach(function (el) { el.classList.add("in"); });
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
  function setMenu(open) {
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
  var navBackdrop = document.getElementById("navBackdrop");
  var navClose = document.getElementById("navClose");
  if (navBackdrop) navBackdrop.addEventListener("click", function () { setMenu(false); });
  if (navClose) navClose.addEventListener("click", function () { setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) setMenu(false);
  });

  /* ---------- Contact form → WhatsApp (no backend) ---------- */
  var contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = function (n) { var el = contactForm.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ""; };
      var lines = [
        "Hello VSO, I'd like to enquire.",
        "Name: " + val("name"),
        val("organisation") ? "School/Org: " + val("organisation") : "",
        "Phone/Email: " + val("contact"),
        "Interested in: " + val("interest"),
        val("message") ? "Message: " + val("message") : ""
      ].filter(Boolean);
      window.open("https://wa.me/2348103337049?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
    });
  }

  /* ---------- Header state ---------- */
  var header = document.querySelector(".site-header");
  /* pages without a dark hero (gallery.html / videos.html) keep the solid header */
  var hasHero = !!document.querySelector(".hero");
  function headerState() { header.classList.toggle("scrolled", !hasHero || window.scrollY > 24); }
  headerState();
  window.addEventListener("scroll", headerState, { passive: true });

  /* ---------- Oversized ghost typography ---------- */
  (function ghosts() {
    var GHOST = {
      story:     { text: "1970s",  size: 23, css: "bottom:-3%;right:-1%" },
      programme: { text: "PLAY",   size: 31, css: "top:50%;right:-2%;transform:translateY(-50%)" },
      videos:    { text: "REPLAY", size: 23, css: "bottom:-5%;left:-2%" },
      gallery:   { text: "RALLY",  size: 27, css: "top:-3%;right:-2%" },
      benefits:  { text: "MIND",   size: 30, css: "bottom:-4%;right:-2%" },
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

  /* ---------- Magnetic primary buttons (desktop, fine pointer) ---------- */
  if (fine && !reduce) {
    Array.prototype.forEach.call(document.querySelectorAll(".btn-primary, .btn-on-brand"), function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        btn.style.transform = "translate(" + (mx * 0.2).toFixed(1) + "px," + (my * 0.32).toFixed(1) + "px) scale(1.05)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });
  }

  /* ---------- Back to top ---------- */
  /* #top sits on the fixed header, so a plain anchor jump scrolls nowhere */
  document.querySelectorAll('a[href="#top"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  });

  /* ---------- Year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
