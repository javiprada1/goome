//Creates new SpreadSheet with the given String name
function createSheet(name){
  var mySheet = SpreadsheetApp.create(name);
  return mySheet.getId();
}

//Creates a new Sheet in the current active SpreadSheet with the given
//String name and returns true if created. If the parameter name is empty
//it does nothing and returns false.
function createWorkSheet(name){
  var created = false;
  if(name != null){
    var mySheet = SpreadsheetApp.getActiveSpreadsheet();
    var newSheet = mySheet.insertSheet();
    newSheet.setName(name);
    created = true;
  }
  return created;
}
/*
This function returns an array of String representing the data in the cells 
of the given params.
I.E.:
values = getData(1,1,3,3);
Logger.log(values);
This returns the values of the cells (as String) starting by the first row, first column
and subsequent three rows/columns.
*/
function getData(startRow,startColumn,numRows,numColumns){
  var mySheet = SpreadsheetApp.getActiveSpreadsheet();
  var wSheet = mySheet.getActiveSheet();
  var cells = wSheet.getSheetValues(startRow, startColumn, numRows, numColumns)
  return cells.toString;
}

