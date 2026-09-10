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

## Notes on the build

- **Accessibility / motion.** Everything decorative respects
  `prefers-reduced-motion`: snowfall is removed entirely, parallax and the
  marquee stop, and scroll reveals resolve to their final state rather than
  leaving content invisible.
- **Responsive.** Typography is fluid (`clamp()`); the day-by-day cards become a
  snap-scrolling rail on narrow screens; the nav collapses to wordmark + CTA
  below 760px.
- **No dependencies.** Two Google fonts (Anton, Archivo) with system fallbacks,
  and nothing else. Snowfall is a hand-rolled canvas loop, capped at ~160 flakes
  and throttled by `devicePixelRatio` so it stays cheap on a laptop battery.
- **Dark by design.** This page deliberately commits to one alpine-night look
  rather than following the OS theme.

## Disclaimer

Unofficial and student-run. Not an INSEAD publication, and not affiliated with
any resort or tour operator named in the copy.
