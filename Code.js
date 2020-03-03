//Add in your database secret
var secret = 'xTw3pwH5Gt8lZk4t9FgA2hpTtblfz0J7azfnM2sD'

function getFirebaseUrl(jsonPath) {
  /*
  We then make a URL builder
  This takes in a path, and
  returns a URL that updates the data in that path
  */
  return (
    'https://ctct-environmental-test-plans.firebaseio.com/' +
    jsonPath +
    '.json?auth=' +
    secret
  )
}

function syncMasterSheet(excelData) {
  /*
  We make a POST (create) request,
  and send a JSON payload
  More info on the REST API here : https://firebase.google.com/docs/database/rest/start
  */
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(excelData)
  }
  var fireBaseUrl = getFirebaseUrl('masterSheet');

  /*
  We use the UrlFetchApp google scripts module
  More info on this here : https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app
  */
  UrlFetchApp.fetch(fireBaseUrl, options);
  var retrieveInformation = UrlFetchApp.fetch(fireBaseUrl);
  console.log(retrieveInformation.getContentText());
}

function startSync() {
  //Get the currently active sheet
  var sheet = SpreadsheetApp.getActiveSheet();
  //Get the number of rows and columns which contain some content
  var [rows, columns] = [sheet.getLastRow(), sheet.getLastColumn()];
  //Get the data contained in those rows and columns as a 2 dimensional array
  var data = sheet.getRange(1, 1, rows, columns).getValues();

  //Use the syncMasterSheet function defined before to push this data to the "masterSheet" key in the firebase database
  syncMasterSheet(data);
}

function onOpen()
{
  SpreadsheetApp.getUi()
      .createMenu('Macro')
      .addItem('Load the sidebar', 'openOptions')
      .addToUi();
}

function openOptions()
{
  var html = HtmlService.createHtmlOutputFromFile('panel'); // Create an HTML output using 'panel.html'.
  html.setTitle("Flowchart Sidebar"); // Set the title of the sidebar.
  SpreadsheetApp.getUi() 
      .showSidebar(html); // Display the HTML file as a sidebar.
}

function addColumn(pasteLocation, markAsSubColumn)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var source = ss.getSheets()[1];
  var destination = ss.getSheets()[0];
  if (markAsSubColumn) { // If the user wants a subcolumn.
    var range = source.getRange("E12:G15"); // Copy the test box and the arrow pointing sideways, since that's everything needed for a subcolumn.
    var targetCell = String.fromCharCode(pasteLocation - 1) + "17"; // Set the column and row of the current target cell.
  } else { // If the user wants a column.
    var range = source.getRange("F10:G15");
    var targetCell = String.fromCharCode(pasteLocation) + "15";
    var cellsToFill = destination.getRange("D14:" + String.fromCharCode(pasteLocation) + "14");
    console.log(cellsToFill);
    source.getRange("E21").copyTo(cellsToFill); // Create the line that connects the columns to the start box.
  }
  range.copyTo(destination.getRange(targetCell)); 
}

function addTest(pasteLocationColumn, pasteLocationRow)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var source = ss.getSheets()[1];
  var destination = ss.getSheets()[0];
  var range = source.getRange("F10:G15");

  var targetCell = String.fromCharCode(pasteLocationColumn) + pasteLocationRow.toString(); // Set the column and row of the current target cell.
  range.copyTo(destination.getRange(targetCell)); 
}

function endColumn(pasteLocationColumn, pasteLocationRow)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var source = ss.getSheets()[1];
  var destination = ss.getSheets()[0];
  var range = source.getRange("F16:G19");

  var targetCell = String.fromCharCode(pasteLocationColumn) + pasteLocationRow.toString(); // Set the column and row of the current target cell.
  range.copyTo(destination.getRange(targetCell)); 
}

function populateExistingBoxes(form)
{
  console.log(form.TotalUnits);
}