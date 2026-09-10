/* ═══════════════════════════════════════════════════════════════════
   INSEAD SKI — teaser page

   ┌───────────────────────────────────────────────────────────────┐
   │  EDIT ONLY THIS BLOCK.  Everything on the page reads from it. │
   │  All values below are PLACEHOLDERS — nothing here is          │
   │  confirmed. Swap them for the real trip details.             │
   └───────────────────────────────────────────────────────────────┘
   ═══════════════════════════════════════════════════════════════════ */

const CONFIG = {
  // ── identity ───────────────────────────────────────────────────
  cohort:     "MIM28",
  yearShort:  "27",                       // shown after the wordmark
  resort:     "Val Thorens",              // PLACEHOLDER
  country:    "French Alps",              // PLACEHOLDER
  altitude:   "2,300 m",                  // PLACEHOLDER

  // ── dates ──────────────────────────────────────────────────────
  // startISO drives the countdown. Local time, 24h.
  startISO:   "2027-01-23T08:00:00+01:00", // PLACEHOLDER — Sat 23 Jan 2027
  datesLong:  "Sat 23 – Sat 30 January 2027", // PLACEHOLDER

  // ── scale ──────────────────────────────────────────────────────
  statPeople: "120+",                     // PLACEHOLDER
  statKm:     "600 km",                   // PLACEHOLDER
  statLifts:  "160",                      // PLACEHOLDER
  statNights: "7",                        // PLACEHOLDER

  // ── money ──────────────────────────────────────────────────────
  priceEarly:     "€690",                 // PLACEHOLDER
  priceStd:       "€790",                 // PLACEHOLDER
  priceGear:      "€120",                 // PLACEHOLDER
  earlyDeadline:  "31 Oct 2026",           // PLACEHOLDER

  // ── calls to action ────────────────────────────────────────────
  spotsNote:    "Nothing is confirmed yet — this page exists to count hands.",
  // Paste the Google Form / Typeform URL here. Left empty, the button
  // falls back to a pre-filled email to contactEmail.
  signupUrl:    "",
  contactEmail: "ski@example.com",        // PLACEHOLDER
};

/* ═══════════════ nothing below needs editing ═══════════════ */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Only now do the reveal start-states in the CSS apply. If this script is
// blocked or throws before this line, the page renders fully visible instead
// of blank.
document.documentElement.classList.add("js");

/* ── 1. inject config into the page ──────────────────────── */
$$("[data-cfg]").forEach(el => {
  const v = CONFIG[el.dataset.cfg];
  if (v != null) el.textContent = v;
});

document.title = `INSEAD Ski ${CONFIG.yearShort} — ${CONFIG.cohort}`;

{
  const subject = encodeURIComponent(`INSEAD Ski ${CONFIG.yearShort} — I'm interested`);
  const body    = encodeURIComponent(
    `Hi,\n\nCount me in for the ${CONFIG.cohort} ski trip to ${CONFIG.resort}.\n\n` +
    `Name:\nSki level (never / beginner / intermediate / advanced):\n` +
    `Gear rental needed (y/n):\nBringing a +1 (y/n):\n\nThanks!`
  );
  const mailto = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;

  const btn = $("#signupBtn");
  if (CONFIG.signupUrl) {
    btn.href = CONFIG.signupUrl;
  } else {
    btn.href = mailto;
    btn.removeAttribute("target");
    btn.textContent = "Email the organisers";
  }
  $("#mailLink").href = `mailto:${CONFIG.contactEmail}`;
}

/* ── 2. countdown ────────────────────────────────────────── */
{
  const target = new Date(CONFIG.startISO).getTime();
  const out = { d: $("#c-d"), h: $("#c-h"), m: $("#c-m"), s: $("#c-s") };
  const pad = n => String(n).padStart(2, "0");

  const tick = () => {
    const left = target - Date.now();
    if (Number.isNaN(target)) { $("#count").hidden = true; return; }
    if (left <= 0) {
      $("#count").innerHTML = '<p class="count__live">WE ARE ON THE MOUNTAIN. 🏔️</p>';
      return;
    }
    const s = Math.floor(left / 1000);
    out.d.textContent = Math.floor(s / 86400);
    out.h.textContent = pad(Math.floor(s / 3600) % 24);
    out.m.textContent = pad(Math.floor(s / 60) % 60);
    out.s.textContent = pad(s % 60);
  };
  tick();
  setInterval(tick, 1000);
}

/* ── 3. nav background once scrolled ─────────────────────── */
{
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-stuck", scrollY > 40);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });
}

/* ── 4. scroll reveal ────────────────────────────────────── */
{
  const items = $$(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-in"));
  } else {
    // stagger siblings inside a shared container
    items.forEach(el => {
      if (!el.style.getPropertyValue("--i") && el.parentElement) {
        const sibs = [...el.parentElement.children].filter(n => n.classList.contains("reveal"));
        if (sibs.length > 1) el.style.setProperty("--i", sibs.indexOf(el));
      }
    });
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        // `boundingClientRect.top < 0` catches anything a fast scroll jumped
        // clean over: it is now above the viewport, so it must already show.
        if (!e.isIntersecting && e.boundingClientRect.top >= 0) return;
        e.target.classList.add("is-in");
        obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    items.forEach(el => io.observe(el));
  }
}

/* ── 5. ridgeline parallax ───────────────────────────────── */
if (!reduced) {
  const ridges = $$(".ridge");
  let queued = false;
  const draw = () => {
    const y = scrollY;
    ridges.forEach(r => {
      r.style.transform = `translate3d(0, ${y * +r.dataset.depth}px, 0)`;
    });
    queued = false;
  };
  addEventListener("scroll", () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(draw);
  }, { passive: true });
  draw();
}

/* ── 6. snowfall ─────────────────────────────────────────── */
if (!reduced) {
  const cv  = $("#snow");
  const ctx = cv.getContext("2d");
  let w, h, dpr, flakes = [];

  const rand = (a, b) => a + Math.random() * (b - a);

  const build = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = cv.width  = innerWidth  * dpr;
    h = cv.height = innerHeight * dpr;
    const count = Math.round(Math.min(innerWidth, 1600) / 9);   // ~160 max
    flakes = Array.from({ length: count }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(.6, 2.3) * dpr,
      vy: rand(.25, 1.0) * dpr,
      vx: rand(-.22, .22) * dpr,
      a: rand(.2, .85),
      sw: rand(0, Math.PI * 2),          // sway phase
      ss: rand(.004, .014),              // sway speed
    }));
  };

  const frame = () => {
    ctx.clearRect(0, 0, w, h);
    for (const f of flakes) {
      f.sw += f.ss;
      f.y += f.vy;
      f.x += f.vx + Math.sin(f.sw) * .35 * dpr;
      if (f.y - f.r > h) { f.y = -f.r; f.x = rand(0, w); }
      if (f.x < -10) f.x = w + 10;
      if (f.x > w + 10) f.x = -10;
      ctx.globalAlpha = f.a;
      ctx.fillStyle = "#dfe9ff";
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
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
