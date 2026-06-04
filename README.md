# VSO Table Tennis — Website

Marketing website for **Value Sports One (VSO) Table Tennis**, a Lagos-based grassroots
table-tennis promotion outfit — developing the game from the grassroots through free school
equipment & coaching, competitions, the Table Tennis School League, private coaching and
equipment sales.

🌐 Production domain: **www.vsotabletennis.com**

## Tech

Plain static site — **HTML + CSS + vanilla JS, no build step**. Cheap to host anywhere
(Netlify, Vercel, GitHub Pages, cPanel).

```
index.html      single-page site: hero · about · what-we-do · gallery · benefits · champions · endorsement · contact · footer
styles.css      dark-mode theme; tokens in :root
main.js         gallery + photo/video lightbox, filters, mobile nav, scroll reveal
favicon.svg     brand mark
assets/img/     photography (action, training, endorsements, portraits, equipment, branding, social-proof)
assets/video/   match & training clips
```

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

No dependencies, no install step.

## Features

- Responsive, mobile-first (verified across iPhone / Android / iPad — no horizontal scroll, ≥44px tap targets)
- Photo **and** video gallery with click-to-enlarge lightbox + category filters
- Lazy-loaded images; videos load only on demand
- WhatsApp click-to-chat + enquiry form

## Contact

- WhatsApp: +234 810 333 7049 · +234 705 874 2253
- Email: info@vsotabletennis.com
- Value Sports One — RC 652757 · Lagos, Nigeria

---
Built by [247Kraft Technologies](https://github.com/Stevingfelix).
