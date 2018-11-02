// 1. Clears previous content in the sheet preserving formatting
// 2. Writes array of objects into the sheet
// 3. [Optional] Make the sheet active after populating data if user is opening another sheet

// e.g.
//  rows = [
//          { "FirstName": "Lionel", "LastName": "Messi" },
//          { "FirstName": "David", "LastName": "beckham" }
//         ]
// usage: writeToSheet(rows, "football_players", true/false)

function writeToSheet(rows, sheetName, makeActive) {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = activeSpreadsheet.getSheetByName(sheetName);
  if (sheet) {
    sheet.clear({ contentsOnly: true });
  } else {
    // create new sheet if not present
    activeSpreadsheet.insertSheet(sheetName);
    sheet = activeSpreadsheet.getSheetByName(sheetName);
  }

  if (rows.length === 0) return;

  // create array of arrays of data to dump directly into spreadsheet
  var headers = Object.keys(rows[0]);
  var data = [headers];
  rows.forEach(function(row){
    data.push(getObjectValues(row));
  });

  var range = sheet.getRange(1, 1, rows.length + 1, headers.length);

  // set data type of range to plain text
  range.setNumberFormat("@");

  range.setValues(data);
  // make this sheet active
  if (makeActive) SpreadsheetApp.setActiveSheet(sheet);
  sheet.autoResizeColumns(1, headers.length);
}

// Returns object values as array
// e.g. info = { 'name': 'Nirdosh', 'address': 'Lalitpur' }
// getObjectValues(info) => ['Nirdosh', 'Lalitpur']
function getObjectValues(object) {
  var values = [];
  for(var k in object) values.push(object[k]);
  return values;
}
