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

function addColumn() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var source = ss.getSheets()[1];
  var destination = ss.getSheets()[0];

  var range = source.getRange("F12:G15");

  range.copyTo(destination.getRange("L17")); // Additional columns will start at different values.
}