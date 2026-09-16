# Getting the form's answers into a spreadsheet

The site is static (GitHub Pages), so the form has nowhere to *store* answers on
its own. It POSTs each submission to a URL you paste into `formEndpoint` in
`script.js`. Until you do, the form still works — it opens a pre-filled email
instead — so the page is never broken.

Two ways to get a spreadsheet. The first gives you a Google Sheet you own;
the second is a few clicks faster but caps free submissions.

## Option A — Google Sheet (recommended: your data, no limits, free)

Every submission becomes a row. **File → Download → Microsoft Excel** whenever
you want the .xlsx.

1. Go to [sheets.new](https://sheets.new) and name the sheet
   `INSEAD Ski – interest`.
2. **Extensions → Apps Script.** Delete the sample code in the editor.
3. Paste the whole of [`setup/apps-script.gs`](setup/apps-script.gs). Save
   (⌘S). Name the project anything.
4. **Deploy → New deployment.** Click the gear next to "Select type" and
   choose **Web app**. Set:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
   Then **Deploy**.
5. Google will ask you to authorise it. Click through — it needs permission
   to edit *this* spreadsheet, nothing else. If it says "unverified app",
   choose *Advanced → Go to … (unsafe)*. It's your own script; that warning
   is for scripts published by strangers.
6. Copy the **Web app URL** (ends in `/exec`). Open it in a new tab — you
   should see `{"ok":true,"message":"INSEAD Ski form endpoint is live."}`.
7. Paste that URL into `script.js`:
   ```js
   formEndpoint: "https://script.google.com/macros/s/…/exec",
   ```
8. Commit and push. Submit the form once yourself to see the row appear.

**If you later change the form** (add a question), nothing else needs
changing — the script adds a column for any new field it sees.

**If you edit the script**, you must **Deploy → Manage deployments → ✎ → New
version** for the change to go live. Saving alone is not enough; this is the
single most common reason an Apps Script "stops working".

## Option B — Formspree (fastest; 50 free submissions a month)

1. Sign up at [formspree.io](https://formspree.io), create a form, copy the
   endpoint (`https://formspree.io/f/xxxxxxxx`).
2. Paste it into `formEndpoint`. Done.
3. Answers appear in their dashboard, with **Export → CSV**, and an email
   per submission.

The free tier stops accepting after 50 a month. For a cohort of 120+ that
could bite in a busy week, which is why Option A is the recommendation.

## What each submission contains

`name, email, arrival, arrival_iso, nights, transport, material, note,
serious, submitted_at, trip`. `serious` is always `yes` — the form will not
submit without the confirmation box ticked.

## Spam

There is a hidden honeypot field that bots fill in and people never see. Those
submissions are dropped in the browser and never reach the sheet. It is not
bulletproof, but it stops the lazy majority.
