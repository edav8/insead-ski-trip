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
  resort:     "Les Menuires",
  country:    "French Alps",               // PLACEHOLDER
  altitude:   "1,850 m",                   // Les Menuires village
  residence:  "Résidence Adonis",          // per the contracts (the 2023 brochure says Les Lys — unconfirmed)
  domain:     "3 Vallées",

  // ── dates ──────────────────────────────────────────────────────
  // startISO drives the countdown. Local time, 24h, with UTC offset.
  startISO:   "2027-01-02T18:00:00+01:00", // earliest coach departure (6-night option)
  datesLong:  "2 – 9 January 2027",

  // ── scale ──────────────────────────────────────────────────────
  statPeople: "120+",                      // PLACEHOLDER
  statKm:     "600 km",                    // PLACEHOLDER
  statLifts:  "160",                       // PLACEHOLDER
  statNights: "7",                         // PLACEHOLDER

  // ── money ──────────────────────────────────────────────────────
  // Cheapest and dearest of the four lengths, for the headline.
  priceFrom:     "€519",
  priceTo:       "€719",
  priceNote:     "per person, coach + apartment + lift pass + ski rental + insurance",

  // ── calls to action ────────────────────────────────────────────
  spotsNote:    "Nothing is confirmed yet — this page exists to count hands.",
  // Where the on-page form POSTs. Paste the URL from whichever backend
  // you set up (see SETUP-FORM.md). Leave it empty and the form still
  // works — it falls back to opening a pre-filled email instead, so the
  // page is never broken while this is being arranged.
  formEndpoint: "",
  // OR: a plain Google Form. Create one with short-answer questions, send the
  // link to whoever maintains this, and they fill `action` and the entry ids
  // (see SETUP-FORM.md, Option A). Answers land in the Form's Responses tab
  // and its linked Sheet. Takes precedence over formEndpoint when set.
  googleForm: {
    action:  "",                           // https://docs.google.com/forms/d/e/<id>/formResponse
    entries: { name:"", email:"", arrival:"", transport:"", material:"", note:"", serious:"" },
  },
  signupUrl:    "",                        // external form, if you'd rather link out
  contactEmail: "elisabeth.vandehout@insead.edu",

  // ── arrival options ────────────────────────────────────────────
  // The whole point of the form: everyone LEAVES together, but people
  // join on different days, so the only variable is the arrival date.
  // `nights` is counted to the morning of Sun 10 Jan.
  // Straight off the Yoonly contracts. Nights == ski days at every length:
  // the coach travels overnight, so the coach night is never a hotel night,
  // and the last ski day is always Friday 8 Jan whichever option you pick.
  // `quoted` = a price printed in a contract. `estimated` = interpolated,
  // NOT an offer — 4 and 6 nights have never been quoted by Yoonly.
  arrivalDates: [
    { value: "2027-01-02", label: "Sat 2 Jan", nights: 6, ski: "Sun 3 – Fri 8",
      price: 719, quoted: false, range: "€669–759" },
    { value: "2027-01-03", label: "Sun 3 Jan", nights: 5, ski: "Mon 4 – Fri 8",
      price: 619, quoted: true },
    { value: "2027-01-04", label: "Mon 4 Jan", nights: 4, ski: "Tue 5 – Fri 8",
      price: 599, quoted: false, range: "€569–619" },
    { value: "2027-01-05", label: "Tue 5 Jan", nights: 3, ski: "Wed 6 – Fri 8",
      price: 519, quoted: true },
  ],
  returnNote: "Whichever you pick, the coach leaves Fontainebleau that evening " +
              "and you ski from the next morning. Everyone skis until Friday 8 Jan, " +
              "checks out Saturday morning and is back in Fontainebleau on " +
              "Saturday 9 Jan evening.",

  // Rental grades as the shop quotes them. Platinum is deliberately not
  // offered — it is race kit nobody on this trip needs.
  // ECO is bundled into every price. ARGENT/OR are the contract's own grade
  // names and supplements; the € shown is the 5-night figure, which is the
  // ceiling — shorter stays cost less. Snowboards only exist from ARGENT up.
  materialOptions: [
    "ECO skis + boots — included",
    "ARGENT — better skis or a snowboard (+€48)",
    "OR — top-range skis or snowboard (+€74)",
    "I'll bring my own skis (saves ~€12)",
  ],
  transportOptions: [
    "Coach both ways — included",
    "Making my own way (−€100)",
    "Not sure yet",
  ],

  // ── run-up events ──────────────────────────────────────────────
  // ISO dates. Anything in the past dims itself and the next one up is
  // marked automatically, so this list never needs pruning by hand.
  events: [
    { date:"2026-10-08", title:"Info session",
      where:"Fontainebleau campus",
      note:"What the trip is, what it costs, and who is running it. Come with questions." },
    { date:"2026-10-31", title:"Early-bird closes",
      where:"",
      note:"Deposit in by tonight to hold the lower price." },
    { date:"2026-11-19", title:"Gear & kit night",
      where:"Fontainebleau campus",
      note:"Rental sizing, what to pack, and what not to buy new." },
    { date:"2026-12-04", title:"Balance due",
      where:"",
      note:"Remaining payment. Spots not paid by this date go to the waiting list." },
    { date:"2026-12-11", title:"Rooming groups posted",
      where:"",
      note:"Chalets and roommates confirmed. Swaps handled by the committee after this." },
    { date:"2027-01-02", title:"Coaches leave",
      where:"Fontainebleau, 06:00",
      note:"Be early. They will not wait." },
  ],

  // ── the week itself ────────────────────────────────────────────
  schedule: [
    { day:"Your travel night", tag:"Overnight coach", items:[
      {t:"Evening", w:"Coach leaves Fontainebleau — Sat 2, Sun 3, Mon 4 or Tue 5 Jan, depending on the length you pick"},
      {t:"Overnight", w:"You sleep on the coach; it is not one of your nights in the apartment"},
      {t:"Morning", w:"Arrive Les Menuires. Keys, lift pass and skis the same morning"} ]},
    { day:"Your first day", tag:"Straight onto the snow", items:[
      {t:"Morning", w:"Check in at Résidence Adonis, collect pass and ECO rental"},
      {t:"09:00", w:"Lifts open — the 3 Vallées, 600 km of piste"},
      {t:"16:30", w:"Lifts close. Après at Le Puff Daddy on the snow front"},
      {t:"Evening", w:"Welcome pack: breakfast, a welcome drink and a barbecue sandwich"} ]},
    { day:"Every full day", tag:"Ski · eat · repeat", items:[
      {t:"09:00", w:"Full days on the snow, beginners through advanced"},
      {t:"16:30", w:"Après-ski — one 30L keg per 60 people"},
      {t:"Evening", w:"Themed nights, priority club entry, pool and ice rink on rest days"} ]},
    { day:"Fri 8 Jan", tag:"Last ski day — everyone", items:[
      {t:"09:00", w:"Final day on the snow, whichever length you booked"},
      {t:"16:30", w:"Lifts close, rental gear goes back"},
      {t:"Evening", w:"Closing night"} ]},
    { day:"Sat 9 Jan", tag:"Home", items:[
      {t:"08:00", w:"Check out of the apartment by 10:00 — no skiing today"},
      {t:"Daytime", w:"Coach leaves Les Menuires"},
      {t:"Evening", w:"Back in Fontainebleau"} ]},
  ],

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
  window.MAILTO = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
  $("#mailLink").href = `mailto:${CONFIG.contactEmail}`;
}

/* ── 1a. the interest form ───────────────────────────────
   Static hosting has no server, so submissions go to whatever endpoint
   CONFIG.formEndpoint names (Google Apps Script, Formspree, Microsoft
   Power Automate).

   Sent url-encoded, NOT as multipart FormData and NOT as JSON. All three
   matter: JSON would trigger a CORS preflight that Apps Script does not
   answer, and Apps Script does not parse multipart bodies into
   e.parameter at all — a multipart POST lands as an empty row. */
{
  const form   = $("#interestForm");
  const status = $("#formStatus");
  const submit = $("#formSubmit");

  // Selects are built from CONFIG so the form can never offer a day or a
  // rental grade the rest of the page does not describe.
  const fill = (sel, opts, placeholder) => {
    sel.innerHTML = `<option value="">${placeholder}</option>` +
      opts.map(o => typeof o === "string"
        ? `<option>${o}</option>`
        : `<option value="${o.value}">${o.label} — ${o.nights} nights</option>`).join("");
  };
  // Arrival is a row of big tappable cards, not a dropdown: it is the one
  // answer that matters and a <select> is the worst control on a phone.
  $("#dayPicker").innerHTML = CONFIG.arrivalDates.map(d => `
    <label class="day">
      <input type="radio" name="arrival" value="${d.value}">
      <span class="day__nights">${d.nights} days</span>
      <span class="day__date">€${d.price}</span>
      <span class="day__dow">${d.quoted ? "confirmed price" : "estimate"}</span>
    </label>`).join("");
  fill($("#f-transport"), CONFIG.transportOptions, "How are you getting there?");
  fill($("#f-material"),  CONFIG.materialOptions,  "Do you need to rent?");

  // The return leg is fixed for everyone, so say so right under the choice.
  const hint = $("#arrivalHint");
  const arrivalValue = () => form.querySelector('input[name="arrival"]:checked')?.value || "";
  const showHint = () => {
    const pick = CONFIG.arrivalDates.find(d => d.value === arrivalValue());
    if (!pick) { hint.textContent = CONFIG.returnNote; return; }
    hint.textContent =
      `Coach leaves Fontainebleau ${pick.label} evening · ski ${pick.ski} · ` +
      `home Sat 9 Jan evening. €${pick.price} all in` +
      (pick.quoted ? ", from the signed quote." : ` — an estimate (${pick.range}); Yoonly has not priced this length yet.`);
  };
  showHint();
  $("#dayPicker").addEventListener("change", showHint);

  const say = (msg, kind) => {
    status.textContent = msg;
    status.className = "form__status" + (kind ? " is-" + kind : "");
  };

  const fieldOf = el => el.closest(".field");
  const setErr = (el, msg) => {
    const f = fieldOf(el);
    f.classList.toggle("is-bad", !!msg);
    // radios inside the day picker carry no id of their own; the error slot
    // belongs to their fieldset, so fall back to that
    const slot = f.querySelector(`[data-err-for="${el.id || f.id}"]`);
    if (slot) slot.textContent = msg || "";
    if (el.tagName !== "FIELDSET") {
      if (msg) el.setAttribute("aria-invalid", "true");
      else el.removeAttribute("aria-invalid");
    }
  };

  const validate = () => {
    let firstBad = null;
    for (const el of [$("#f-name"), $("#f-email"), $("#f-transport"), $("#f-material")]) {
      let msg = "";
      const v = el.value.trim();
      if (!v) msg = el.tagName === "SELECT" ? "Pick one." : "Required.";
      else if (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
        msg = "That doesn't look like an email address.";
      setErr(el, msg);
      if (msg && !firstBad) firstBad = el;
    }
    const arr = $("#f-arrival");
    const aMsg = arrivalValue() ? "" : "Pick the day you'd arrive.";
    setErr(arr, aMsg);
    if (aMsg && !firstBad) firstBad = arr.querySelector("input");
    const serious = $("#f-serious");
    const sMsg = serious.checked ? "" : "Please confirm — the committee books on these numbers.";
    setErr(serious, sMsg);
    if (sMsg && !firstBad) firstBad = serious;
    return firstBad;
  };

  // clear a field's error as soon as the visitor fixes it
  for (const el of form.querySelectorAll("input,select,textarea")) {
    const clear = () => { if (fieldOf(el)?.classList.contains("is-bad")) setErr(el, ""); };
    el.addEventListener("input", clear);
    el.addEventListener("change", clear);
  }

  form.addEventListener("submit", async ev => {
    ev.preventDefault();

    const bad = validate();
    if (bad) { say("Check the highlighted fields.", "bad"); bad.focus(); return; }

    // Honeypot. Silently pretend success: telling a bot it failed only
    // teaches it to try again.
    if (form.website.value) { form.classList.add("is-sent"); say("Thanks — you're on the list.", "ok"); return; }

    const data = new FormData(form);
    data.delete("website");
    const pick = CONFIG.arrivalDates.find(d => d.value === arrivalValue());
    if (pick) {
      data.set("arrival", `${pick.nights} days (coach ${pick.label} eve)`);
      data.append("arrival_iso", pick.value);
      data.append("nights", pick.nights);
      data.append("price_shown_eur", pick.price);
    }
    data.set("serious", "yes");
    data.append("submitted_at", new Date().toISOString());
    data.append("trip", `INSEAD Ski ${CONFIG.yearShort} — ${CONFIG.datesLong}`);

    const gf = CONFIG.googleForm;
    if (gf && gf.action) {
      // Google Forms accepts a cross-origin POST to /formResponse but never
      // lets the browser read the reply, so this is fire-and-forget by
      // design. The row lands in the Form's Responses tab.
      const body = new URLSearchParams();
      for (const [field, entry] of Object.entries(gf.entries)) {
        if (entry && data.has(field)) body.append(entry, data.get(field));
      }
      submit.disabled = true;
      say("Sending…", "busy");
      try {
        await fetch(gf.action, { method: "POST", body, mode: "no-cors" });
        form.classList.add("is-sent");
        say("Thanks — you're on the list. The committee will be in touch.", "ok");
      } catch {
        submit.disabled = false;
        say("That didn't send. Please email us using the link below.", "bad");
      }
      return;
    }

    if (!CONFIG.formEndpoint) {
      // No backend wired up yet: hand the answers to the mail client so
      // nothing the visitor typed is lost.
      say("Opening your email app…", "busy");
      location.href = window.MAILTO;
      setTimeout(() => say("If nothing opened, email us using the link below.", "bad"), 2500);
      return;
    }

    submit.disabled = true;
    say("Sending…", "busy");
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST", body: new URLSearchParams(data),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      form.classList.add("is-sent");
      say("Thanks — you're on the list. The committee will be in touch.", "ok");
    } catch (err) {
      // Some endpoints accept the POST but refuse to let us read the
      // reply. Retry opaquely: the row still lands, we just cannot
      // confirm it, so say exactly that rather than claiming success.
      try {
        await fetch(CONFIG.formEndpoint, {
          method: "POST", body: new URLSearchParams(data), mode: "no-cors" });
        form.classList.add("is-sent");
        say("Sent. If you hear nothing in a couple of days, email us below.", "ok");
      } catch {
        submit.disabled = false;
        say("That didn't send. Please email us using the link below.", "bad");
      }
    }
  });
}

/* ── 1b. events timeline ─────────────────────────────────
   Status is derived from the date rather than stored, so the list stays
   correct on its own as the term passes. */
{
  const list = $("#eventList");
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const fmt = (d, o) => d.toLocaleDateString("en-GB", o);
  let nextMarked = false;

  for (const [i, e] of (CONFIG.events || []).entries()) {
    const d = new Date(e.date + "T00:00:00");
    if (Number.isNaN(d.getTime())) continue;
    const past = d < today;
    const isNext = !past && !nextMarked;
    if (isNext) nextMarked = true;

    const li = document.createElement("li");
    li.className = "tl flow" + (past ? " is-past" : "") + (isNext ? " is-next" : "");
    li.style.setProperty("--k", i);
    li.innerHTML =
      `<div class="tl__when"><b>${fmt(d, { day: "2-digit", month: "short" })}</b>` +
      `<span>${fmt(d, { year: "numeric" })}</span></div>` +
      `<div class="tl__body"><h3>${e.title}` +
      (isNext ? ` <span class="tl__tag">Next up</span>` : "") +
      (past ? ` <span class="tl__tag tl__tag--past">Passed</span>` : "") +
      `</h3>` +
      (e.where ? `<p class="tl__where">${e.where}</p>` : "") +
      `<p>${e.note}</p></div>`;
    li.querySelector(".tl__when").prepend(
      Object.assign(document.createElement("time"), { dateTime: e.date })
    );
    list.append(li);
  }
}

/* ── 1b2. price tiers, from the same array as the day picker ── */
{
  const wrap = $("#tierList");
  if (wrap) wrap.innerHTML = CONFIG.arrivalDates.map(d => `
    <div class="tier flow${d.quoted ? " tier--hot" : ""}">
      ${d.quoted ? '<span class="tier__flag">Quoted</span>' : ""}
      <h3>${d.nights} days</h3>
      <p class="tier__price">€${d.price}</p>
      <p class="tier__when">${d.quoted ? "Confirmed by Yoonly" : `Estimate · ${d.range}`}</p>
      <ul>
        <li>Coach leaves ${d.label} evening</li>
        <li>Ski ${d.ski}</li>
        <li>${d.nights} nights at ${CONFIG.residence}</li>
        <li>${d.nights}-day ${CONFIG.domain} pass + rental</li>
      </ul>
    </div>`).join("");
}

/* ── 1c. the week's calendar ─────────────────────────────── */
{
  const wrap = $("#calList");
  for (const [i, d] of (CONFIG.schedule || []).entries()) {
    const day = document.createElement("article");
    day.className = "cal__day flow";
    day.style.setProperty("--k", i);
    day.innerHTML =
      `<div class="cal__head"><h3>${d.day}</h3>` +
      (d.tag ? `<span class="cal__tag">${d.tag}</span>` : "") + `</div>` +
      `<ul class="cal__slots">` +
      d.items.map(it => `<li><b>${it.t}</b><span>${it.w}</span></li>`).join("") +
      `</ul>`;
    wrap.append(day);
  }
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
