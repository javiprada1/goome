
function onOpen() {
  DocumentApp.getUi() // Or DocumentApp or FormApp.
      .createMenu('Acciones Extra')
      .addItem('Traducir texto', 'translateSelection')
      .addItem('Hacer calendario mes actual', 'createCal')
      .addItem('Crear Documento apartir de este Excel', 'createDocumentExcel')
  
      .addToUi();
}


function createCal() {
  //first of all create the structure a
  var doc = DocumentApp.create("Calendar"),
      body = doc.getBody(),
      cells = [
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','','']
        ],
      //Now it saves the dates of the actual calendar
      now = new Date(),
      date = new Date(now.getFullYear(), now.getMonth(), 1),
      cur_month = now.getMonth(),
      row = 0,
      col = date.getDay();
  //it goes 1 by 1 and fills the structure
  while (cur_month == date.getMonth()) {
    cells[row][col] = date.getDate();

    col += 1;
    if (col > 6) {
      col = 0;
      row += 1;
    }

    date = new Date(date.getTime() + 1000*60*60*24);
  }
  body.setText('Calendar');
  body.appendTable(cells);
}


function createDocumentExcel() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
//select the range of cells that you want to use.
  var titulo = sheet.getRange(2,3).getValue();
  var cuerpo = sheet.getRange(3,3).getValue();
  //create new document with the tittle selected.
  var doc = DocumentApp.create(titulo);
  var body = doc.getBody();
  
  body.appendParagraph(cuerpo);
  body.appendPageBreak();
  //save the document and close
  doc.saveAndClose();
  //get the url of the new doc
  var urlNuevo = doc.getUrl();
  
  var ui =   SpreadsheetApp.getUi();
  ui.alert("Documento creado con éxito. URL: "+urlNuevo);

}

