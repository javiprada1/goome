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


