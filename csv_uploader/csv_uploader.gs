// call this function to upload file.. it will display the upload dialog box
function uploadFile(e) {
  var template = HtmlService.createTemplateFromFile('upload_dialog_box.html');
  template.action = ScriptApp.getService().getUrl();
  var evaluatedHtml = template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setWidth(400).setHeight(100);
  return SpreadsheetApp.getUi().showModalDialog(evaluatedHtml, "Upload File");
}

// this function will be triggered from the html form
function handleFormSubmission(data) {
  var fileBlob = data.myFile;
  var rows = Utilities.parseCsv(fileBlob.contents);
  var headers = rows[0];
  // dump CSV data in a sheet
  var sheet = activeSpreadsheet.getSheetByName('Sheet Name');
  sheet.clear({ contentsOnly: true });
  var range = sheet.getRange(1, 1, rows.length, headers.length);

  // set data type of range to plain text
  range.setNumberFormat("@");

  range.setValues(rows);
  sheet.autoResizeColumns(1, headers.length);
  SpreadsheetApp.getUi().alert(
    'CSV Uploaded! \n Row Count: ' + (rows.length - 1)
  );
}
