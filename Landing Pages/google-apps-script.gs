/**
 * Couture School Egypt – Lead capture endpoint
 * Receives form submissions from the landing pages and appends them
 * as rows in the Google Sheet.
 *
 * IMPORTANT: this script must be created from INSIDE your spreadsheet
 * (open the sheet, then Extensions -> Apps Script). If it was created
 * at script.google.com directly, it is not attached to any sheet and
 * nothing will be saved.
 */

var SHEET_NAME = "Leads";

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("No spreadsheet attached. Create this script via Extensions -> Apps Script from inside your Google Sheet.");
  }
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date", "Name", "Phone", "Experience", "City", "Language", "Page", "Status"]);
    sheet.getRange(1, 1, 1, 8).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Opening the web app URL in a browser runs this.
// It writes one test row so you can verify the connection.
function doGet(e) {
  try {
    var sheet = getSheet();
    sheet.appendRow([new Date(), "TEST (visited URL in browser)", "'0000", "", "", "", "", "Test"]);
    return ContentService.createTextOutput(
      "SUCCESS: The endpoint works. A test row was added to the 'Leads' tab of your sheet. You can delete it."
    );
  } catch (err) {
    return ContentService.createTextOutput("ERROR: " + String(err));
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = getSheet();
    var p = (e && e.parameter) || {};
    sheet.appendRow([
      new Date(),
      p.name || "",
      "'" + (p.phone || ""),   // leading apostrophe keeps 01... numbers as text
      p.experience || "",
      p.city || "",
      p.lang || "",
      p.page || "",
      "New"                     // your team updates this while calling leads
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
