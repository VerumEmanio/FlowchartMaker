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

function addColumn(pasteLocation)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var source = ss.getSheets()[1];
  var destination = ss.getSheets()[0];
  var range = source.getRange("F12:G15");

  var targetCell = String.fromCharCode(pasteLocation) + "17"; // Set the column and row of the current target cell.
  range.copyTo(destination.getRange(targetCell)); 
}
/*
function addTest(pasteLocationColumn, pasteLocationRow)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var source = ss.getSheets()[1];
  var destination = ss.getSheets()[0];
  var range = source.getRange("F10:G15");
  var targetCell = String.fromCharCode(pasteLocationColumn) + pasteLocationRow.toString(); // Set the column and row of the current target cell.
  range.copyTo(destination.getRange(targetCell)); 
}
*/

function addTest(pasteLocationColumn, pasteLocationRow)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var source = ss.getSheets()[1];
  var destination = ss.getSheets()[0];
  var range = source.getRange("F10:G15");
  var targetCell = String.fromCharCode(pasteLocationColumn) + pasteLocationRow.toString(); // Set the column and row of the current target cell.
  range.copyTo(destination.getRange(targetCell)); 
}