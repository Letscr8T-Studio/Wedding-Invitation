# RSVP → Google Sheet (free, no server)

The couple can open the sheet on their phones and watch RSVPs arrive.

## 1. Create the sheet
1. Go to sheets.new, signed in to the Google account that should own the RSVPs.
2. Name it **Mary & Emmanuel — RSVPs**.
3. Row 1 headers: `Timestamp | Name | Phone | Attending | Guests | Message`

## 2. Add the script
In the sheet, open **Extensions → Apps Script**, delete the sample code and paste this:

```js
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.website) return json({ ok: true }); // honeypot: bots fill it, humans don't
    const name = String(data.name || '').slice(0, 120).trim();
    if (!name) return json({ ok: false, error: 'Name is required' });
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    sheet.appendRow([
      new Date(),
      name,
      String(data.phone || '').slice(0, 30),
      data.attending === 'no' ? 'Declines' : 'Accepts',
      Number(data.guests) || 1,
      String(data.note || '').slice(0, 1000),
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy it
1. **Deploy → New deployment →** type **Web app**
2. Execute as: **Me**. Who has access: **Anyone**
3. Authorise it. Google warns that it's "unverified" because you wrote the script yourself; choose Advanced → Go to project.
4. Copy the **Web app URL** (it ends in `/exec`).

## 4. Connect the site
`.env.local`:
```
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
```
Send from the site like this (`text/plain` avoids the CORS preflight that Apps Script can't answer):
```ts
await fetch(import.meta.env.VITE_RSVP_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain;charset=utf-8' },
  body: JSON.stringify(payload),
});
```

## 5. Nice extras (optional)
- Sheet → **Tools → Notification settings** → email on every change.
- Add a second tab with `=COUNTIF(D:D,"Accepts")` and `=SUMIF(D:D,"Accepts",E:E)` for the total headcount.
- If you edit the script later: **Deploy → Manage deployments → Edit → New version**. The URL stays the same.
