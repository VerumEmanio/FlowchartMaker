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

function addColumn(counter) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var source = ss.getSheets()[1];
  var destination = ss.getSheets()[0];
  var range = source.getRange("F12:G15");
  var cellForNextColumn = String.charCodeAt("L") + 3;

  if (counter == 1) // This handles the first column, which always start at cell L17.
  {
    range.copyTo(destination.getRange("L17")); 
  } else { // This handles additional columns, which always start 3 cells to the right of the previous column.
    var targetCell = String.fromCharCode(cellForNextColumn) + "17"; // Set the column and row of the current target cell.
    range.copyTo(destination.getRange(targetCell)); 
    cellForNextColumn = cellForNextColumn + 3; // Store the current target cell value as the previous target cell.
  }
  return counter;
}