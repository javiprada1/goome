//Autocrat Simple

//Aplicación para probar la extensión de GAS con GitHub
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp. -> Creamos el menu con submenu
  ui.createMenu('Autocrat simple')
      .addItem('Empezar ahora!!', 'simpleAutoCrat2')
      .addToUi();
}


function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile('index');
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'Simple Autocrat');
}

function simpleAutocrat(templateUrl, folderUrl, multipleFiles, editableDocuments, pdfDocuments, sendByEmail) {
  Browser.msgBox(templateUrl +'\\n'
                + folderUrl +'\\n'
                 + '¿Archivos múltiples? ' + multipleFiles + '. Tipo de datos: ' + typeof(multipleFiles) + '\\n'
                + '¿Archivos editables? ' + editableDocuments +'\\n'
                + '¿Archivos en pdf? ' + pdfDocuments +'\\n'
                + '¿Enviar por e-mail? ' + sendByEmail);
  
  // This constant is written in column E for rows for which an email has been sent successfully.
  var EMAIL_SENT = "EMAIL_SENT";
  // This constant is written in column D for rows for which a file has been created successfully.
  var FILE_CREATED = "FILE_CREATED";
  
  var folder = DriveApp.getFolderById(getIdFrom(folderUrl));
  var template = DocumentApp.openByUrl(templateUrl);

  // If multiple files is not chosen, we must create the destine file
  // We have to create the file in the root folder, make a copy in the destine folder,
  // and delete the first file
  var draftFile = DocumentApp.create('Borrador');
  var destineFile = DocumentApp.openById(DriveApp.getFileById(draftFile.getId()).makeCopy(folder).getId());
  destineFile.setName('Fusion');
  var destineFileId = destineFile.getId();
  
  // Be careful! We can remove files, not documents
  DriveApp.removeFile(DriveApp.getFileById(draftFile.getId()));
  
  // Get the tags
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = 1;   // Number of rows to process
  
  // Count the number of tags
  var n = 1;
  while (!(sheet.getRange(1, n).isBlank())) {
    n++;
  }
  var nTags = n-1;

  // Count the number of data rows
  n = 1;
  while (!(sheet.getRange(n, 1).isBlank())) {
    n++;
  }
  var nData = n-2;
    
  // Fetch the range of cells with tags
  var dataRangeTags = sheet.getRange(1, 1, 1, nTags)
  // Fetch values for the row in the Range.
  var dataTags = dataRangeTags.getValues();
  var rowTags = dataTags[0];  
  var tags = [];
  for (i = 0; i<rowTags.length; i++) {
    tags[i]= rowTags[i];
  }
  
  // Fetch the range of cells
  var dataRange = sheet.getRange(startRow, 1, nData, nTags)
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();

  // Get the values to replace
  for (i = 0; i<nData; i++) {
     startRow = i;   // First row of data to process
    
    // Get if the file is created (sheet column)
    // Do not check if the file already exists in Drive
    var fileCreated = data[i][4];

    if (fileCreated != FILE_CREATED) {  // Prevents creating duplicates
      // The name of the file is defined in the fourth column of the sheet
      var docName = data[i][3];
      var file = DriveApp.getFileById(template.getId()).makeCopy(docName, folder);
      // Transform a document file into a document
      var doc = DocumentApp.openById(file.getId());
  
      // Use editAsText to obtain a single text element containing
      // all the characters in the document.
      var text = doc.getBody().editAsText();
      
      if (tags.length == data[i].length) {
        for (var j = 0; j < data[i].length; ++j) {
          text.replaceText(tags[j], data[i][j]);
        }
    
        // We need save & close, and reopen the document to flush it
        var docId = doc.getId();
        doc.saveAndClose();
        doc = DocumentApp.openById(docId);
        var fileCreate = false;
        
        // Check if the option for multiple files has been chosen
        if (multipleFiles) {
          // Delete the destine file for unique file option
          // DriveApp.getFileById(destineFile.getId()).setTrashed(trashed);
          folder.removeFile(DriveApp.getFileById(destineFile.getId()));
          
          if (pdfDocuments) {
            // Create the file and check the creation;
            var pdf = doc.getAs(MimeType.PDF);
            var fileCreated = (folder.createFile(pdf).setName(docName) != null);
          }
          if (!editableDocuments) {
            // Editable files has been created before
            fileCreated = true;
            // Remove editable version of the document
            folder.removeFile(DriveApp.getFileById(doc.getId()));
          }
            
          if (fileCreated) {
            dataRange.getCell(i+1, 5).setValue(FILE_CREATED) 
          }
        } else if (!multipleFiles) { // If multiple files option has not been marked
          // Get the body section of the active document.
          var body = doc.getBody();
          var child;
          var lonelyChild;
          var n = 0;
          var nElements = body.getNumChildren();

          // Loop over every child element
          // The loop ignores table of contents, header, footer, and foot notes 
          for (n=0; n<nElements; n++) {
            try {
              child = body.getChild(n);
              if (child.getType() == DocumentApp.ElementType.LIST_ITEM) {
                destineFile.getBody().appendListItem(child.copy());
                //insertListItem(i*nElements+n, child.asListItem());
                destineFile.saveAndClose();
                destineFile = DocumentApp.openById(destineFileId);
              } else if (child.getType() == DocumentApp.ElementType.PARAGRAPH) {
                destineFile.getBody().appendParagraph(child.copy());
                //insertParagraph(i*nElements+n, child.asParagraph());
                destineFile.saveAndClose();
                destineFile = DocumentApp.openById(destineFileId);
              } else if (child.getType() == DocumentApp.ElementType.TABLE) {
                destineFile.getBody().appendTable(child.copy());
                //insertTable(i*nElements+n, child.asTable());
                destineFile.saveAndClose();
                destineFile = DocumentApp.openById(destineFileId);
              }  
            } catch (err) {
              Browser.msgBox(err.message);
            }
            // With this choice it has no sense check file 'file has been created'
            // Mark if the file has been appended
            fileCreated = true;
            if (fileCreated) {
              dataRange.getCell(i+1, 5).setValue(FILE_CREATED);
            }
          }
          
          // Add a page break at the end of the destine documente and refresh it
          destineFile.getBody().appendPageBreak();
          destineFile.saveAndClose();
          destineFile = DocumentApp.openById(destineFileId);
          
          // Remove the individual file (the file instance, not the document one)
          folder.removeFile(file);
        }
      } else {
        Browser.msgBox('Error', 'The number of tags is different of the name of filled columns', Browser.Buttons.OK);
      }
    }
  }
  
  // If unique file option has been chosen, we must create the file
  if (!multipleFiles) {
    if (pdfDocuments) {
      // Create the file and check the creation;
      var pdf = destineFile.getAs(MimeType.PDF);
      folder.createFile(pdf).setName('Fusion');
    }
    if (!editableDocuments) {
      // Remove editable version of the document
      folder.removeFile(DriveApp.getFileById(destineFile.getId()));
    }
  }
}

function getIdFrom(url) {
  var id = "";
  var parts = url.split(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
  if (url.indexOf('?id=') >= 0){
     id = (parts[6].split("=")[1]).replace("&usp","");
     return id;
   } else {
   id = parts[5].split("/");
   //Using sort to get the id as it is the longest element. 
   var sortArr = id.sort(function(a,b){return b.length - a.length});
   id = sortArr[0];
   return id;
   }
}


