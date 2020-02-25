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
  if (markAsSubColumn) {
    var range = source.getRange("E12:G15"); // Copy the test box and the arrow pointing sideways, since that's everything needed for a subcolumn.
    var targetCell = String.fromCharCode(pasteLocation - 1) + "17"; // Set the column and row of the current target cell.
  } else {
    var range = source.getRange("F10:G15");
    var targetCell = String.fromCharCode(pasteLocation) + "15";
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