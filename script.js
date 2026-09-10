/* ═══════════════════════════════════════════════════════════════════
   INSEAD SKI — teaser page

   ┌───────────────────────────────────────────────────────────────┐
   │  EDIT ONLY THIS BLOCK.  Everything on the page reads from it. │
   │  All values below are PLACEHOLDERS — nothing here is          │
   │  confirmed. Swap them for the real trip details.              │
   └───────────────────────────────────────────────────────────────┘
   ═══════════════════════════════════════════════════════════════════ */

const CONFIG = {
  // ── identity ───────────────────────────────────────────────────
  cohort:     "MIM28",
  yearShort:  "28",                        // shown after the wordmark
  resort:     "Val Thorens",               // PLACEHOLDER
  country:    "French Alps",               // PLACEHOLDER
  altitude:   "2,300 m",                   // PLACEHOLDER

  // ── dates ──────────────────────────────────────────────────────
  // startISO drives the countdown. Local time, 24h, with UTC offset.
  startISO:   "2028-01-08T08:00:00+01:00", // PLACEHOLDER — first full week of Jan
  datesLong:  "Sat 8 – Sat 15 January 2028", // PLACEHOLDER

  // ── scale ──────────────────────────────────────────────────────
  statPeople: "120+",                      // PLACEHOLDER
  statKm:     "600 km",                    // PLACEHOLDER
  statLifts:  "160",                       // PLACEHOLDER
  statNights: "7",                         // PLACEHOLDER

  // ── money ──────────────────────────────────────────────────────
  priceEarly:    "€690",                   // PLACEHOLDER
  priceStd:      "€790",                   // PLACEHOLDER
  priceGear:     "€120",                   // PLACEHOLDER
  earlyDeadline: "31 Oct 2027",            // PLACEHOLDER

  // ── calls to action ────────────────────────────────────────────
  spotsNote:    "Nothing is confirmed yet — this page exists to count hands.",
  signupUrl:    "",                        // Google Form / Typeform URL
  contactEmail: "ski@example.com",         // PLACEHOLDER

  // ── hero footage ───────────────────────────────────────────────
  // Streamed from Wikimedia Commons (CC BY-SA 4.0, credited in the footer).
  // To self-host instead, drop the files in assets/ and point these there.
  video720:   "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/0d/Skiing_in_Engelberg_Titlis.webm/Skiing_in_Engelberg_Titlis.webm.720p.vp9.webm",
  video480:   "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/0d/Skiing_in_Engelberg_Titlis.webm/Skiing_in_Engelberg_Titlis.webm.480p.vp9.webm",
  videoPoster:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Skiing_in_Engelberg_Titlis.webm/1280px--Skiing_in_Engelberg_Titlis.webm.jpg",
};

/* ═══════════════ nothing below needs editing ═══════════════ */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root    = document.documentElement;
const clamp   = (v, a = 0, b = 1) => v < a ? a : v > b ? b : v;
const lerp    = (a, b, t) => a + (b - a) * t;
// smoothstep keeps every ramp eased at both ends, so nothing starts or
// stops abruptly when it enters or leaves the viewport
const smooth  = t => (t = clamp(t)) * t * (3 - 2 * t);

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

// The CSS start-states live behind `.motion`. Adding it here means a
// blocked script, an old browser that throws, or a reduced-motion
// preference all leave a plain, fully visible document instead of a
// blank one waiting for JS that never arrives.
if (!reduced) root.classList.add("motion");

/* ── 1. config → DOM ─────────────────────────────────────── */
$$("[data-cfg]").forEach(el => {
  const v = CONFIG[el.dataset.cfg];
  if (v != null) el.textContent = v;
});
document.title = `INSEAD Ski ${CONFIG.yearShort} — ${CONFIG.cohort}`;

{
  const subject = encodeURIComponent(`INSEAD Ski ${CONFIG.yearShort} — I'm interested`);
  const body = encodeURIComponent(
    `Hi,\n\nCount me in for the ${CONFIG.cohort} ski trip to ${CONFIG.resort}.\n\n` +
    `Name:\nSki level (never / beginner / intermediate / advanced):\n` +
    `Gear rental needed (y/n):\nBringing a +1 (y/n):\n\nThanks!`
  );
  const btn = $("#signupBtn");
  if (CONFIG.signupUrl) {
    btn.href = CONFIG.signupUrl;
  } else {
    btn.href = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
    btn.removeAttribute("target");
    btn.textContent = "Email the organisers";
  }
  $("#mailLink").href = `mailto:${CONFIG.contactEmail}`;
}

/* ── 2. hero video ───────────────────────────────────────
   Attached only once the page is up, and skipped entirely on a
   metered connection or with reduced motion, where a 4 MB decorative
   background is a cost with no benefit. The poster and the starfield
   underneath mean the hero is complete without it. */
{
  const v = $("#heroVideo");
  const conn = navigator.connection || {};
  const cheap = conn.saveData || /^(slow-)?2g$/.test(conn.effectiveType || "");

  if (reduced || cheap || !v.canPlayType("video/webm")) {
    v.remove();
  } else {
    v.poster = CONFIG.videoPoster;
    const src = (url, media) => {
      const s = document.createElement("source");
      s.src = url; s.type = "video/webm";
      if (media) s.media = media;
      return s;
    };
    v.append(src(CONFIG.video480, "(max-width: 800px)"), src(CONFIG.video720));
    v.preload = "auto";
    v.load();

    const show = () => { v.classList.add("is-ready"); root.classList.add("has-video"); };
    v.addEventListener("loadeddata", show, { once: true });
    v.addEventListener("error", () => v.remove(), { once: true });
    // Autoplay is refused in some settings; the poster frame stays, which
    // is a perfectly good still. Never surface this as an error.
    v.play?.().catch(() => {});
  }
}

/* ── 3. countdown ────────────────────────────────────────── */
{
  const target = new Date(CONFIG.startISO).getTime();
  const out = { d: $("#c-d"), h: $("#c-h"), m: $("#c-m"), s: $("#c-s") };
  const pad = n => String(n).padStart(2, "0");
  const tick = () => {
    if (Number.isNaN(target)) { $("#count").hidden = true; return; }
    const left = target - Date.now();
    if (left <= 0) { $("#count").innerHTML = '<p class="count__live">WE ARE ON THE MOUNTAIN. 🏔️</p>'; return; }
    const s = Math.floor(left / 1000);
    out.d.textContent = Math.floor(s / 86400);
    out.h.textContent = pad(Math.floor(s / 3600) % 24);
    out.m.textContent = pad(Math.floor(s / 60) % 60);
    out.s.textContent = pad(s % 60);
  };
  tick();
  setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════════════════════
   4. THE SCROLL ENGINE

   One rAF loop, one layout read per frame, then writes only. Every
   moving thing on the page is a pure function of scroll position —
   no timed transitions, no one-shot triggers — which is what makes
   scrolling back up play everything in reverse and makes each
   section's exit double as the next one's entrance.
   ═══════════════════════════════════════════════════════════ */
if (!reduced) {

  const pins  = $$("[data-pin]");
  const flows = $$(".flow");
  const glow  = $("[data-glow]");
  const bar   = $("#progressBar");
  const track = $("#weekTrack");
  const meter = $("#weekMeter");
  const cards = $$(".wcard");
  const mq    = $("#marquee");
  const mqTrack = mq && $(".marquee__track", mq);

  let vh = 0, vw = 0, docH = 0;
  let weekSpan = 0;               // horizontal distance the week rail travels
  let mx = 0;                     // marquee offset, in px
  let mqHalf = 1;                 // half the marquee track: the loop point
  let lastY = scrollY, vel = 0;

  /* Layout is measured here and nowhere else, so the frame loop never
     mixes reads with writes and forces a synchronous reflow. */
  const measure = () => {
    vh = innerHeight; vw = innerWidth;

    if (track) {
      // How far the rail must travel for the last card's right edge to
      // reach the right edge of the screen — measured, never assumed, so
      // adding a card in the HTML just works.
      track.style.height = "";
      const pad = parseFloat(getComputedStyle(track).paddingInlineStart) || 0;
      weekSpan = Math.max(0, track.scrollWidth - vw + pad);
      // The pinned section must be tall enough to supply that travel.
      const week = $("#week");
      if (week) week.style.height = (vh + weekSpan * 1.15) + "px";
    }
    if (mqTrack) mqHalf = mqTrack.scrollWidth / 2 || 1;
    for (const p of pins) p._box = null;

    // Read the page height LAST: sizing the pinned section above changes it,
    // and a stale value leaves the progress bar short of the end.
    docH = document.documentElement.scrollHeight;
  };

  const frame = () => {
    const y = scrollY;
    vel = lerp(vel, y - lastY, .18);
    lastY = y;

    /* page progress hairline */
    if (bar) bar.style.setProperty("--sp", clamp(y / Math.max(1, docH - vh)).toFixed(4));

    /* pinned sections → --p */
    for (const el of pins) {
      const box = el._box || (el._box = { top: el.offsetTop, h: el.offsetHeight });
      const span = Math.max(1, box.h - vh);
      const p = clamp((y - box.top) / span);
      el.style.setProperty("--p", p.toFixed(4));

      if (el.id === "week") {
        const e = smooth(p);
        if (track) track.style.setProperty("--tx", (e * weekSpan).toFixed(2));
        if (meter) meter.style.setProperty("--wp", p.toFixed(4));
        // per-card emphasis: 1 when the card is centred on screen
        for (const c of cards) {
          const r = c.getBoundingClientRect();
          const d = Math.abs((r.left + r.width / 2) - vw / 2) / (vw / 2);
          c.style.setProperty("--c", smooth(1 - clamp(d)).toFixed(3));
        }
      }
    }

    /* every .flow element → its own --e entry progress */
    for (const el of flows) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;   // far away: skip
      const k = +(el.style.getPropertyValue("--k") || 0);
      // starts as the element's top crosses 92% of the viewport, finishes
      // by 55%; --k slides each sibling's window a little later
      const raw = (vh * .92 - r.top) / (vh * .37);
      el.style.setProperty("--e", smooth(raw - k * .07).toFixed(3));
    }

    /* signup glow tracks the section coming into frame */
    if (glow) {
      const r = glow.getBoundingClientRect();
      glow.style.setProperty("--g", smooth((vh - r.top) / vh).toFixed(3));
    }

    /* marquee drifts on its own and surges with scroll velocity */
    if (mqTrack) {
      mx = (mx + .55 + vel * .28) % mqHalf;
      if (mx < 0) mx += mqHalf;
      mqTrack.style.setProperty("--mx", mx.toFixed(2));
    }

    requestAnimationFrame(frame);
  };

  addEventListener("resize", measure, { passive: true });
  addEventListener("orientationchange", measure);
  // Late-loading fonts and the video change layout; re-measure when they land
  document.fonts?.ready.then(measure);
  addEventListener("load", measure);

  measure();
  requestAnimationFrame(frame);
}

/* ── 5. nav background ───────────────────────────────────── */
{
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-stuck", scrollY > 40);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });
}

/* ── 6. stat counters ────────────────────────────────────
   Counts up once, the first time the tile is reached. This one is
   deliberately NOT scroll-linked: a number that runs backwards when
   you scroll up reads as a glitch rather than an effect. */
if (!reduced && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      obs.unobserve(e.target);
      const el = e.target;
      const m  = /^([\d,.]+)(.*)$/.exec(el.textContent.trim());
      if (!m) continue;
      const to = parseFloat(m[1].replace(/,/g, ""));
      if (!Number.isFinite(to)) continue;
      const tail = m[2], t0 = performance.now(), dur = 1100;
      const step = now => {
        const t = smooth((now - t0) / dur);
        el.textContent = Math.round(to * t).toLocaleString("en-GB") + tail;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, { threshold: .45 });
  $$("[data-count]").forEach(el => io.observe(el));
}

/* ── 7. snowfall ─────────────────────────────────────────── */
if (!reduced) {
  const cv = $("#snow"), ctx = cv.getContext("2d");
  let w, h, dpr, flakes = [], drift = 0;
  const rand = (a, b) => a + Math.random() * (b - a);

  const build = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = cv.width = innerWidth * dpr;
    h = cv.height = innerHeight * dpr;
    flakes = Array.from({ length: Math.round(Math.min(innerWidth, 1600) / 9) }, () => ({
      x: rand(0, w), y: rand(0, h), r: rand(.6, 2.3) * dpr,
      vy: rand(.25, 1.0) * dpr, vx: rand(-.22, .22) * dpr,
      a: rand(.2, .85), sw: rand(0, Math.PI * 2), ss: rand(.004, .014),
    }));
  };

  let prevY = scrollY;
  const frame = () => {
    // scrolling drags the snow with it — the page feels like it has air in it
    drift = lerp(drift, (scrollY - prevY) * .5, .1);
    prevY = scrollY;

    ctx.clearRect(0, 0, w, h);
    for (const f of flakes) {
      f.sw += f.ss;
      f.y += f.vy - drift * dpr * .35;
      f.x += f.vx + Math.sin(f.sw) * .35 * dpr;
      if (f.y - f.r > h) { f.y = -f.r; f.x = rand(0, w); }
      if (f.y + f.r < 0) { f.y = h + f.r; f.x = rand(0, w); }
      if (f.x < -10) f.x = w + 10;
      if (f.x > w + 10) f.x = -10;
      ctx.globalAlpha = f.a;
      ctx.fillStyle = "#e4f5ea";
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  };

  build();
  addEventListener("resize", build);
  requestAnimationFrame(frame);
} else {
  $("#snow").remove();
}
