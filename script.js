/* ═══════════════════════════════════════════════════════════════════
   INSEAD SKI — teaser page

   ┌───────────────────────────────────────────────────────────────┐
   │  EDIT ONLY THIS BLOCK.  Everything on the page reads from it. │
   │  BOOKED: Alice signed Yoonly contract 15610 on 14 Oct 2026 —  │
   │  Les Ménuires, 4 days from 04.01.27, €609 pp. This page is no │
   │  longer a poll; it announces a trip that exists.              │
   └───────────────────────────────────────────────────────────────┘
   ═══════════════════════════════════════════════════════════════════ */

const CONFIG = {
  // ── identity ───────────────────────────────────────────────────
  cohort:     "MIM28",
  yearShort:  "28",                        // shown after the wordmark
  resort:     "Les Menuires",
  country:    "French Alps",
  altitude:   "1,850 m",                   // Les Menuires village
  residence:  "Résidence Adonis",          // per the contracts (the 2023 brochure says Les Lys — unconfirmed)
  domain:     "3 Vallées",

  // ── dates ──────────────────────────────────────────────────────
  // startISO drives the countdown. Local time, 24h, with UTC offset.
  startISO:   "2027-01-04T20:00:00+01:00", // the coach leaves Fontainebleau Monday evening
  datesLong:  "4 – 10 January 2027",

  // ── scale ──────────────────────────────────────────────────────
  statPeople: "118",                       // sign-ups in the form, 22 Sep
  statKm:     "500 km",                    // Yoonly's own figure for the 3 Vallées
  statLifts:  "4",                         // ski days in the signed contract
  statNights: "1,850 m",                   // Les Menuires village altitude

  // ── money ──────────────────────────────────────────────────────
  // €569 is the Yoonly contract price; the +€40 is the committee's own
  // buffer for parties, restaurants and drinks, not an operator line item.
  price:         "€609",
  priceNote:     "per person, all in — coach, apartment, lift pass, ski rental and insurance",
  priceBase:     569,
  priceBuffer:   40,

  // ── calls to action ────────────────────────────────────────────
  spotsNote:    "Booked. Contract signed 14 October — this is happening.",
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
  // The real sign-up is a Google Form (20 questions, answers land in a
  // spreadsheet). When this is set the page shows a button to it instead of
  // the built-in form — the built-in one asks five questions and could never
  // satisfy the Google Form's required fields.
  signupUrl:    "https://docs.google.com/forms/d/e/1FAIpQLSfq7oycp_TVuuylYJvATYIUuYnH7aR2vCKAcqZcgtB6PWYc2A/viewform",
  contactEmail: "elisabeth.vandehout@insead.edu",

  // ── the trip, as signed ────────────────────────────────────────
  // Yoonly contract 15610, "Les Ménuires 4J - 04.01.27", signed 14 Oct 2026.
  // The coach runs overnight, so a travel night is never a night in the
  // apartment. What the Saturday holds is NOT established in writing
  // anywhere this repo can see: the townhall deck says "through Saturday
  // night", the earlier 5J/3J contracts put the coach home on Saturday
  // daytime, and 15610 itself is only in WhatsApp. Said out loud on the
  // page rather than guessed at.
  trip: {
    depart:  "Mon 4 Jan, evening",
    arrive:  "Tue 5 Jan, morning",
    ski:     "Tue 5 – Fri 8 Jan",
    home:    "Sun 10 Jan, morning",
    skiDays: 4,
    nights:  4,
  },
  saturdayUnconfirmed: true,
  returnNote: "The coach leaves Fontainebleau Monday evening and you ski " +
              "from Tuesday morning. Back in Fontainebleau Sunday the 10th.",

  // ── run-up events ──────────────────────────────────────────────
  // ISO dates. Anything in the past dims itself and the next one up is
  // marked automatically, so this list never needs pruning by hand.
  events: [
    { date:"2026-09-23", title:"Les Menuires held", done:true,
      where:"",
      note:"Alice: \"For sure we have the Menuires accommodation.\" The residence was reserved for us." },
    { date:"2026-10-13", title:"Final contract circulated", done:true,
      where:"Ski trip organization",
      note:"Contrat 15610 — Les Ménuires 4J — posted at 17:42 for the committee to read." },
    { date:"2026-10-14", title:"Contract signed", done:true,
      where:"",
      note:"Alice: \"contract is signed !!!!\" — Les Ménuires, 4 days from 4 Jan, €609 per person." },
    { date:"2026-10-21", title:"How you pay — to be announced",
      where:"",
      note:"The collection route is not decided yet. Nothing to do until the committee says how." },
    { date:"2027-01-04", title:"Coach leaves Fontainebleau",
      where:"Fontainebleau, Monday evening",
      note:"Overnight to the Alps. Be early — it will not wait." },
  ],

  // ── the week itself ────────────────────────────────────────────
  schedule: [
    { day:"Mon 4 Jan", tag:"Overnight coach", items:[
      {t:"Evening", w:"Coach leaves Fontainebleau — exact time from Yoonly nearer the date"},
      {t:"Overnight", w:"You sleep on the coach. It is not one of your four nights in the apartment"} ]},
    { day:"Tue 5 Jan", tag:"Straight onto the snow", items:[
      {t:"Morning", w:"Arrive Les Menuires. Keys, lift pass and skis the same morning"},
      {t:"09:00", w:"Lifts open — the 3 Vallées, the largest linked ski area in the world"},
      {t:"16:30", w:"Lifts close. Après at Le Puff Daddy on the snow front"},
      {t:"Evening", w:"Welcome pack: breakfast, a welcome drink and a barbecue sandwich"} ]},
    { day:"Wed 6 – Thu 7 Jan", tag:"Full days", items:[
      {t:"09:00", w:"Full days on the snow, beginners through advanced"},
      {t:"16:30", w:"Après-ski — one 30L keg per 60 people"},
      {t:"Evening", w:"Themed nights, pool and ice rink on a rest day"} ]},
    { day:"Fri 8 Jan", tag:"Last ski day", items:[
      {t:"09:00", w:"Fourth and final day on the snow"},
      {t:"16:30", w:"Lifts close, rental gear goes back"},
      {t:"Evening", w:"Closing night"} ]},
    { day:"Sat 9 – Sun 10 Jan", tag:"Home", items:[
      {t:"Saturday", w:"Check out of the apartment. What the rest of Saturday holds is not confirmed yet"},
      {t:"Overnight", w:"Coach back to Fontainebleau"},
      {t:"Sun morning", w:"Back at Fontainebleau"} ]},
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
(() => {
  const form   = $("#interestForm");
  const status = $("#formStatus");
  const submit = $("#formSubmit");

  // Hand over to the Google Form if one is configured.
  if (CONFIG.signupUrl) {
    const a = document.createElement("a");
    a.className = "btn btn--lg btn--block";
    a.href = CONFIG.signupUrl;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Open the sign-up form";
    const note = document.createElement("p");
    note.className = "form__privacy";
    note.textContent = "Opens the MIM28 sign-up form. It asks about your days, " +
      "transport, equipment and ski level, and takes about two minutes.";
    form.replaceWith(a, note);
    return;
  }

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
})();

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
    // `done` wins over the date: something that happened earlier today is
    // finished, but `d < today` is false for it and it would read "Next up".
    const past = e.done === true || d < today;
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

/* ── 1b2. the price, now that it is one number ───────────── */
{
  const wrap = $("#tierList");
  const t = CONFIG.trip;
  if (wrap) wrap.innerHTML = `
    <div class="tier tier--hot flow">
      <span class="tier__flag">Signed</span>
      <h3>The price</h3>
      <p class="tier__price">${CONFIG.price}</p>
      <p class="tier__when">Per person, all in</p>
      <ul>
        <li>€${CONFIG.priceBase} — the Yoonly contract</li>
        <li>€${CONFIG.priceBuffer} — committee buffer</li>
        <li>Parties, restaurants, drinks</li>
        <li>Announced earlier as €670</li>
      </ul>
    </div>
    <div class="tier flow">
      <h3>Included</h3>
      <p class="tier__price">${t.skiDays} days</p>
      <p class="tier__when">On the snow, ${t.ski}</p>
      <ul>
        <li>Return coach from Fontainebleau</li>
        <li>${t.nights} nights at ${CONFIG.residence}</li>
        <li>${t.skiDays}-day ${CONFIG.domain} lift pass</li>
        <li>Ski or snowboard rental + insurance</li>
      </ul>
    </div>
    <div class="tier flow">
      <h3>On top</h3>
      <p class="tier__price">€1.10</p>
      <p class="tier__when">Tourist tax, per night</p>
      <ul>
        <li>Helmet, €25 if you want one</li>
        <li>Meals and drinks</li>
        <li>Rental above the Eco range</li>
        <li>Anything you buy on the mountain</li>
      </ul>
    </div>`;
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
