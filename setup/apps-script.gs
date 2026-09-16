/**
 * INSEAD Ski — interest form backend
 *
 * Appends one row per submission to the spreadsheet this script is bound to.
 * Paste into Extensions → Apps Script on a new Google Sheet, then deploy as a
 * Web app (see SETUP-FORM.md for the click-by-click).
 *
 * Deliberately schema-free: it writes whatever fields the form sends, adding a
 * new column if the form gains a question later. That way changing the form
 * never means editing this script — which is the failure mode that leaves a
 * committee silently dropping answers halfway through sign-ups.
 */

const SHEET_NAME = 'Responses';

function doPost(e) {
  // One writer at a time. Two people submitting in the same second would
  // otherwise both read the same lastRow and one row would overwrite the other.
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    const data  = (e && e.parameter) ? e.parameter : {};

    // Header row is the source of truth for column order.
    let headers = sheet.getLastRow()
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].filter(String)
      : [];

    if (!headers.length) {
      headers = ['received_at', 'name', 'email', 'level', 'gear', 'plusone', 'note', 'trip'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Any field the form sends that we have no column for yet gets one.
    for (const key of Object.keys(data)) {
      if (key !== 'submitted_at' && headers.indexOf(key) === -1) {
        headers.push(key);
        sheet.getRange(1, headers.length).setValue(key).setFontWeight('bold');
      }
    }

    const row = headers.map(function (h) {
      if (h === 'received_at') return new Date();
      if (h === 'gear' || h === 'plusone') return data[h] ? 'yes' : 'no';
      return data[h] || '';
    });

    sheet.appendRow(row);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// A GET is how you check the deployment is alive without sending a fake signup.
function doGet() {
  return json({ ok: true, message: 'INSEAD Ski form endpoint is live.' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
