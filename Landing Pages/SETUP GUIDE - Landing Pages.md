# Landing Pages Setup Guide
## Couture School Egypt – Soirée Dress Diploma

You have 4 files:

1. **landing-ar.html** – the Arabic landing page
2. **landing-en.html** – the English landing page
3. **google-apps-script.gs** – the code that saves leads into your Google Sheet
4. This guide

Total setup time: about 10 minutes.

---

## Part 1: Connect the form to a Google Sheet

**Step 1.** Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet. Name it something like "Diploma Leads – August".

**Step 2.** In the spreadsheet menu, click **Extensions → Apps Script**. A code editor opens in a new tab.

**Step 3.** Delete any code you see there. Open the file **google-apps-script.gs** (with any text editor, like Notepad), copy ALL of it, and paste it into the Apps Script editor. Click the save icon.

**Step 4.** Click the blue **Deploy** button (top right) → **New deployment**.
- Click the gear icon next to "Select type" and choose **Web app**
- Description: anything, e.g. "Leads form"
- Execute as: **Me**
- Who has access: **Anyone**  ← important, otherwise the form cannot submit
- Click **Deploy**

**Step 5.** Google will ask you to authorize. Click **Authorize access**, choose your Google account, click **Advanced → Go to (project name) (unsafe)** → **Allow**. (This warning is normal for your own personal scripts.)

**Step 6.** Copy the **Web app URL**. It looks like:
`https://script.google.com/macros/s/AKfycb.../exec`

---

## Part 2: Put the URL into both landing pages

**Step 7.** Open **landing-ar.html** with a text editor (Notepad works). Press Ctrl+F and search for:

```
PASTE_YOUR_APPS_SCRIPT_URL_HERE
```

Replace it with the Web app URL you copied (keep the quotes around it). It should end up looking like:

```js
var SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
```

Save the file.

**Step 8.** Do exactly the same in **landing-en.html**. The same URL works for both pages; the sheet records which page each lead came from (AR or EN column).

---

## Part 3: Publish the pages

Each page is a single self-contained file (images and design included), so you can host it anywhere:

- **Your own hosting (Hostinger, GoDaddy, etc.):** upload via the file manager. Rename to `index.html` inside a folder to get a clean URL like `amalshawkat.com/diploma/`.
- **Netlify (free, no code):** go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the file in. You get a live link in seconds. Do it twice, once per language, to get two separate links.

You will get two links, for example:
- `.../diploma-ar` → use in Arabic ads
- `.../diploma-en` → use in English ads

---

## Part 4: Test before running ads

1. Open each page, fill the form with a test name and a real-format phone number (e.g. 01001234567), and submit.
2. Open your Google Sheet: a "Leads" tab appears with your test row, including date, language, and page link.
3. Delete the test rows and you are ready.

---

## How the leads sheet works

Each submission adds a row with: **Date, Name, Phone, Experience, City, Language, Page, Status**.

The **Status** column starts as "New". Your team can change it while calling (e.g. "Called", "Booked", "No answer", "Not interested") so you always know which leads still need a call.

Tip: in the Sheet, use **Data → Create a filter** on the header row to quickly show only "New" leads.

---

## Notes

- The form validates Egyptian mobile numbers (01xxxxxxxxx) before submitting, so you get clean, callable numbers.
- If you ever redeploy the Apps Script, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.
- Phone numbers are stored as text so the leading 0 is never lost.
