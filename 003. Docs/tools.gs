
function onOpen() {
  DocumentApp.getUi() // Or DocumentApp or FormApp.
      .createMenu('Acciones Extra')
      .addItem('Traducir texto', 'translateSelection')
      .addItem('Hacer calendario mes actual', 'createCal')
      .addItem('Crear Documento apartir de este Excel', 'createDocumentExcel')
  
      .addToUi();
}


function translateSelection() {
  
  var selection = DocumentApp.getActiveDocument().getSelection();
  
  if (!selection) {
    DocumentApp.getUi().alert("Please select text for translation.");
    return;
  }
  
  var elements = selection.getSelectedElements();
  
  /* Append the translated text with the original */
  for (var i = 0; i < elements.length; i++) {
    
    if (elements[i].isPartial()) { /* Is partial text selected */
      
      var element = elements[i].getElement().asText();
      var startIndex = elements[i].getStartOffset();
      var endIndex = elements[i].getEndOffsetInclusive();
      
      var text = element.getText().substring(startIndex, endIndex + 1);
      var translatedText = LanguageApp.translate(text, 'es', 'en'); 
      element.insertText(endIndex + 1, "\n[" + translatedText + "] ");
      
    } else {
      
      var element = elements[i].getElement();
      
      if (element.editAsText) { /* Is the selection contains text */
        var text = element.asText().getText();
        var translatedText = LanguageApp.translate(text, 'es', 'en'); 
        element.asText().setText("\n"+translatedText);
      }
      
    }
  }
}

function createCal() {
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
      now = new Date(),
      date = new Date(now.getFullYear(), now.getMonth(), 1),
      cur_month = now.getMonth(),
      row = 0,
      col = date.getDay();

  while (cur_month == date.getMonth()) {
    cells[row][col] = date.getDate();

    col += 1;
    if (col > 6) {
      col = 0;
      row += 1;
    }

    date = new Date(date.getTime() + 1000*60*60*24);
  }
  body.setText('Calendar Name');
  body.appendTable(cells);
}


// Use this code for Google Docs, Forms, or new Sheets.
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .createMenu('Acciones Extra')
      .addItem('Crear Documento apartir de este Excel', 'createDocumentExcel')
      .addToUi();
 Logger.log("se ha abierto excel");
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

