# INSEAD Ski — MIM28 teaser page

A one-page hype site for the INSEAD MIM28 ski trip. Static HTML/CSS/JS, no build
step, no dependencies, no tracking. Designed to be dropped on GitHub Pages and
edited by whoever inherits the ski committee next year.

> **Everything on this page is a placeholder.** The resort, dates, prices and
> contact address are invented so the layout has something to hold. They live in
> one block at the top of [`script.js`](script.js) — swap them before sharing the
> link.

## Editing the trip details

Open `script.js`. The first ~45 lines are a `CONFIG` object, and every visible
number or name on the page is read from it:

| Field | What it changes |
|---|---|
| `cohort`, `yearShort` | Wordmark and hero kicker |
| `resort`, `country`, `altitude` | Hero kicker and subtitle |
| `startISO` | **Drives the countdown.** ISO 8601 with offset, e.g. `2027-01-23T08:00:00+01:00` |
| `datesLong` | Human-readable dates in the hero |
| `statPeople`, `statKm`, `statLifts`, `statNights` | The four stat tiles |
| `priceEarly`, `priceStd`, `priceGear`, `earlyDeadline` | Pricing tiers |
| `signupUrl` | Google Form / Typeform URL for the big button |
| `contactEmail` | Footer link, and the button's fallback |
| `video720`, `video480`, `videoPoster` | Hero footage (see below) |
| `events` | The run-up timeline (see below) |
| `schedule` | The trip week's day-by-day calendar |

If `signupUrl` is left empty the main button becomes a pre-filled `mailto:` to
`contactEmail` instead — so the page is useful before the form exists.

The day-by-day cards and the FAQ are plain HTML in `index.html`; edit them there.

## Running it locally

No tooling needed — open `index.html` in a browser. Or, to avoid any
`file://` quirks:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publishing with GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**. Branch: `main`, folder: `/ (root)`.
4. Save. The site appears at `https://<user>.github.io/<repo>/` within a minute
   or two.

No workflow file is needed; Pages serves the root of the branch directly.

## What's in here

```
index.html    structure and copy
styles.css    the whole design system (tokens at the top of the file)
script.js     CONFIG block + countdown, snowfall, parallax, scroll reveals
assets/       put photos here and reference them from index.html
```

## Events and the calendar

Both sections are rendered from arrays in `CONFIG`, so every date on the site
lives in one block rather than being scattered through the markup.

`events` is the run-up: each entry is `{ date, title, where, note }` with an
ISO `date`. **Status is derived, not stored** — anything before today dims
itself and is tagged "Passed", and the first future entry is tagged "Next up"
automatically. That means the list stays correct on its own as the term goes
on; nobody has to remember to prune it. Add or remove entries freely, but keep
them in date order, since the "Next up" mark goes to the first future one in
array order.

`schedule` is the trip week: each entry is `{ day, tag, items }` where `items`
is a list of `{ t, w }` (time, what). Days are free-form strings, so a block
like "Mon 4 – Thu 7 Jan" works as one row.

Both render before the scroll engine starts, which is what lets their
generated elements take part in the scroll-linked reveals. If you move that
code, keep it above the engine in `script.js`.

## The hero video

The background footage is *Skiing in Engelberg Titlis* by Amada44, CC BY-SA 4.0,
streamed from Wikimedia Commons and credited in the page footer. **Keep that
credit** — the licence requires attribution.

It is 4.1 MB at 720p, with a 2.3 MB 480p source that browsers pick automatically
below 800px wide. The video is skipped entirely, leaving the poster frame and
the starfield behind it, when the visitor has reduced motion enabled, is on a
metered or 2G connection, or has a browser that can't play WebM. If it fails to
load it removes itself. The hero is designed to look finished without it.

To self-host instead of streaming from Commons, download the two `.webm` files
plus the poster into `assets/` and repoint `video720` / `video480` /
`videoPoster` at them.

To use different footage entirely, just change those three values. Wikimedia
Commons, Pexels and Coverr all have freely licensed skiing clips; check the
licence and update the footer credit to match.

## How the scrolling works

Almost nothing on this page animates on a timer. Sections expose their own 0→1
scroll progress as a CSS custom property (`--p`), written every frame by a
single `requestAnimationFrame` loop in `script.js`, and the CSS interpolates off
it. Because every moving thing is a pure function of scroll position rather than
a fixed-length transition, scrolling back up plays everything in reverse, and
one section's exit is literally the next one's entrance.

Two sections are *pinned*: they are taller than the viewport with a `sticky`
stage inside, and that surplus height is the runway the animation plays across.

- **The hero** is 200vh. Over its second viewport the video pushes back and
  blurs, three ridgelines climb at different rates, and the headline's three
  lines drift apart as the whole block lifts and dissolves.
- **The week** remaps vertical scrolling onto horizontal travel: the day cards
  slide sideways as you scroll down, each one swelling as it crosses the middle
  of the screen. The section's height is *measured* from the actual width of the
  rail, so adding or removing a card in the HTML needs no other change.

Smaller touches: a progress hairline across the top, the marquee surging with
scroll velocity, snow dragging against the scroll direction, and stat numbers
counting up once when first reached (deliberately not scroll-linked — a number
running backwards reads as a glitch).

All of it is gated behind a `motion` class that `script.js` adds only when it
runs *and* the visitor hasn't asked for reduced motion. Without that class every
rule above drops out and the page is a plain, fully visible document — which is
also exactly what you get if the script is blocked or throws.

## Notes on the build

- **Accessibility / motion.** `prefers-reduced-motion` disables the whole
  scroll-linked layer, removes the snowfall canvas and the video, unpins both
  sticky sections, and turns the week rail back into an ordinary horizontal
  scroller. Nothing is left invisible waiting for an animation that won't run.
- **Responsive.** Typography is fluid (`clamp()`); the day-by-day cards become a
  snap-scrolling rail on narrow screens; the nav collapses to wordmark + CTA
  below 760px.
- **No dependencies.** Two Google fonts (Anton, Archivo) with system fallbacks,
  and nothing else — no scroll library. Snowfall is a hand-rolled canvas loop,
  capped at ~160 flakes and throttled by `devicePixelRatio`.
- **One layout read per frame.** The scroll loop measures on resize, on font
  load and on `load`, then only ever writes during a frame, so it doesn't force
  a synchronous reflow on every scroll event.
- **Dark by design.** This page deliberately commits to one alpine-night look
  rather than following the OS theme.

## Disclaimer

Unofficial and student-run. Not an INSEAD publication, and not affiliated with
any resort or tour operator named in the copy.
