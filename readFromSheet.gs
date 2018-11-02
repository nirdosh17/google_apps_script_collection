// Prepares array of objects by reading a spreadsheet
// e.g.
//  readDataFromSheet("football_players")
//  [
//     { "FirstName": "Lionel", "LastName": "Messi" },
//     { "FirstName": "David", "LastName": "beckham" }
//  ]

function readDataFromSheet(sheetName) {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = activeSpreadsheet.getSheetByName(sheetName);
  var data =  sheet.getDataRange().getValues();
  var collection = [];
  var columns = data[0].length;
  var headers = data[0];
  for (var i = 1; i < data.length; i++){
    var obj = {};
    for(var j = 0; j < columns; j++) {
      obj[data[0][j]] = data[i][j];
    }
    // discard empty row i.e. when there is no data in any column
    if (getObjectValues(obj).join('') !== '') {
      collection.push(obj);
    }
  }
  return collection;
}
