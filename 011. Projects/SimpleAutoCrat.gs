/**
 * Tired of AutoCrat Google Add-on crashes? This simple and small utility lacks many of its advanced features, but
 * lets you do the simple tasks you need to be done: merging documents tags with data in a spreadsheet and sending
 * those document by e-mail.
 * The five first columns in the spreadsheet must be these (by order): 'email', 'message', 'subject', 'file name', 
 * 'created' (creation data and time of merged file), and 'file sent'.
 * The tags in the template document must be inside double greater-than and lesser-than symbols '<<' '>>'.
 * The tags in the sheet must not have theese symbols.
 * Be careful! Tags have to be identical.
 *
 * @file Simple Autocrat
 * @author Felix Bandres <febando@gmail.com>
 * @version 1.0
 */

/**
 * Creates a new menu in the user interface of Google Sheets to activate the utility.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi(); // Or DocumentApp or FormApp.
  // Creates the menu with a submenu.
  ui.createMenu('Autocrat simple')
      .addItem('Empezar ahora!!', 'openDialog')
      .addToUi();
}

/**
 * Includes in the html interface a file with Javascript client code.
 * @param {string} filename - The file with the Javascript client code.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

/**
 * Charges the scripts user interface and shows it as a sidebar.
 */
function openDialog() {
  var html = HtmlService.createTemplateFromFile('index')
       .evaluate();  
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);
}

/**
 * Includes in the html interface a file with Javascript client code.
 * @param {string} templateUrl - The URL of the template file (a Google document with tags).
 * @param {string} folderUrl - The URL of the folder. In fact only needs the Id folder (get it from the URL).
 */
function checkUrls(templateUrl, folderUrl) {
  SpreadsheetApp.getActive().toast("Don't be impatient!", 'URL and tags are being checked.', 300);
  var anyMissingTag = false;
  try {
    var folder = DriveApp.getFolderById(getIdFrom(folderUrl));
    var template = DocumentApp.openByUrl(templateUrl);
    
    var text = template.getBody().getText();
    
    // Gets the tags
    var sheet = SpreadsheetApp.getActiveSheet();
    var startRow = 2;  // First row of data to process
    var numRows = 1;   // Number of rows to process
  
    // Counts the number of tags
    var n = 1;
    while (!(sheet.getRange(1, n).isBlank())) {
      n++;
    }
    var nTags = n-1;

    // Fetchs the range of cells with tags
    var dataRangeTags = sheet.getRange(1, 1, 1, nTags)
    // Fetchs values for the row in the Range.
    var dataTags = dataRangeTags.getValues();
    var rowTags = dataTags[0];  
    var sheetTags = [];
    for (i = 0; i<rowTags.length; i++) {
      // Inserts backslash escape character before parentheses and adds start and end of the tag (<<>>)
      sheetTags[i]= "<<".concat(String(rowTags[i]), ">>");
    }
    
    var missingTags = checkTags(text, sheetTags);
    if (missingTags === undefined || missingTags.length == 0) {
      SpreadsheetApp.getActive().toast('All template tags have been found');
    } else {
      SpreadsheetApp.getUi().alert('Some template tags have not been found in the spreadsheet: \n' + missingTags
        + '\nCheck the template document before executing the program.');
      anyMissingTag = true;
    }
  } catch (err) {
    SpreadsheetApp.getUi().alert('There was a technical error. Check that the template and folder URL addresses are correct.\n' + err.message);
  }
  SpreadsheetApp.getActive().toast('Checking function has finished', 'End of checking', 10);
  if (anyMissingTag) {
    throw "There is any missing tag";
  }
}

/**
 * Main script of the utility. Merges the template tags with the found values in the spreadsheet.
 * Depending on the user's choice, creates multiple document files or a single file, creates editable documents,
 * creates pdf documents, and sends the documents by mail (only pdf format available).
 * @param {string} templateUrl - The URL of the template file (a Google document with tags).
 * @param {string} folderUrl - The URL of the folder. In fact only needs the Id folder (get it from the URL).
 * @param {boolean} multipleFiles - User's choice about creating multiple files (true) or a single file (false).
 * @param {boolean} editableDocuments - User's choice about creating editable files (true) or not (false).
 * @param {boolean} pdfDocuments - User's choice about creating pdf files (true) or not (false).
 * @param {boolean} sendPdf - User's choice about sending multiple files (true) or not (false). This option is
 *                            only available if multiple documents option has been selected.
 */
function simpleAutocrat(templateUrl, folderUrl, multipleFiles, editableDocuments, pdfDocuments, sendPdf) {
 
  SpreadsheetApp.getActive().toast("Don't be impatient!", 'Script working', 300);

  var folder = DriveApp.getFolderById(getIdFrom(folderUrl));
  var template = DocumentApp.openByUrl(templateUrl);

  // If multiple files has not been chosen, we must create the destine file
  // We make a copy of the template file and clear its body
  var destineFile = DocumentApp.openById(DriveApp.getFileById(template.getId()).makeCopy().getId());
  var destineBody = destineFile.getBody();
  destineFile.setName('Fusion');
  destineBody.clear();
  var destineFileId = destineFile.getId();
   
  // Gets the tags
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = 1;   // Number of rows to process
  
  // Counts the number of tags
  var n = 1;
  while (!(sheet.getRange(1, n).isBlank())) {
    n++;
  }
  var nTags = n-1;

  // Fetchs the range of cells with tags
  var dataRangeTags = sheet.getRange(1, 1, 1, nTags)
  // Fetchs values for the row in the Range.
  var dataTags = dataRangeTags.getValues();
  var rowTags = dataTags[0];  
  var tags = [];
  for (i = 0; i<rowTags.length; i++) {
    // Inserts backslash escape character before parentheses and adds start and end of the tag (<<>>)
    tags[i]= "<<".concat(String(rowTags[i]).replace("(", "\\(").replace(")", "\\)"), ">>");
  }
  
  // Counts the number of data rows
  n = 1;
  while (!(sheet.getRange(n, 1).isBlank())) {
    n++;
  }
  var nData = n-2;
      
  // Fetchs the range of cells
  var dataRange = sheet.getRange(startRow, 1, nData, nTags)
  // Fetchs values for each row in the Range.
  var data = dataRange.getValues();

  // Gets the values to replace
  for (i = 0; i<nData; i++) {
    startRow = i;   // First row of data to process
    SpreadsheetApp.getActive().toast("Don't be impatient!", 'Script working', 300);
    
    // The name of the file is defined in the fourth column of the sheet
    var docName = data[i][3];
    var file = DriveApp.getFileById(template.getId()).makeCopy(docName, folder)
    // Transforms a document file into a document
    var doc = DocumentApp.openById(file.getId());
  
    // Uses editAsText to obtain a single text element containing
    // all the characters in the document.
    var text = doc.getBody().editAsText();
    
    if (tags.length == data[i].length) {
      for (var j = 0; j < data[i].length; ++j) {
        if (data[i][j] == "") {
          // Replaces blank cells with a cell with a space.
          text.replaceText(tags[j], " ");
        }
        text.replaceText(tags[j], data[i][j]);
      }
    
      // We need save & close, and reopen the document to flush it
      var docId = doc.getId();
      doc.saveAndClose();
      doc = DocumentApp.openById(docId);
      var fileCreated = true;
      dataRange.getCell(i+1, 5).setValue((new Date()).toString()) 
      // Makes sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
        
      // Checks if the option for multiple files has been chosen
      if (multipleFiles) {
        // Deletes the destine file for unique file option
        // Be careful! We can remove files, not documents
        folder.removeFile(DriveApp.getFileById(destineFile.getId()));
        
        var emailAddress = data[i][0];  // First column
        var message = data[i][1];       // Second column
        var subject = data[i][2];       // Third column
        
        if (pdfDocuments) {
          // Creates the file;
          var pdf = doc.getAs(MimeType.PDF);
          folder.createFile(pdf).setName(docName)
        }
          
        // Sends the pdf documents if the user chose that option
        // Currently it is not possible sending editable version (file transforms into a pdf one)
        if (sendPdf) {
          SpreadsheetApp.getActive().toast('Llego dentro del condicional de enviar correo');
          MailApp.sendEmail(emailAddress, subject, message, {
            attachments: [doc],
            name: GmailApp.getAliases()[0]});
          dataRange.getCell(i+1, 6).setValue((new Date()).toString());
          // Makes sure the cell is updated right away in case the script is interrupted
          SpreadsheetApp.flush();
        }
          
        if (!editableDocuments) {
          // Editable files has been created before
          // Removes editable version of the document
          folder.removeFile(DriveApp.getFileById(doc.getId()));
        }
            
      } else if (!multipleFiles) { // If multiple files option has not been marked
        // Gets the body section of the active document.
        var body = doc.getBody();
        var n = 0;
        var child = body.getChild(n);          
        var nElements = body.getNumChildren();

        // Loops over every child element
        // The loop ignores table of contents, header, footer, and foot notes
        for (n=0; n<nElements; n++) {
          try {
            child = body.getChild(n);
            if (child.getType() == DocumentApp.ElementType.LIST_ITEM) {
              destineFile.getBody().appendListItem(child.copy());
            } else if (child.getType() == DocumentApp.ElementType.PARAGRAPH) {
              destineFile.getBody().appendParagraph(child.copy());
            } else if (child.getType() == DocumentApp.ElementType.TABLE) {
              destineFile.getBody().appendTable(child.copy());
            } else if (child.getType() == DocumentApp.ElementType.INLINE_IMAGE) {
              // The script does not work with floating images, only with inline images.
              destineFile.getBody().appendImage(child.copy());
            } else if(child.getType() == DocumentApp.ElementType.HORIZONTAL_RULE) {
              destineFile.getBody().appendHorizontalRule();
            } else if(child.getType() == DocumentApp.ElementType.PAGE_BREAK) {
              destineFile.getBody().appendPageBreak();
            }
            destineFile.saveAndClose();
            destineFile = DocumentApp.openById(destineFileId);
          } catch (err) {
            SpreadsheetApp.getUi().alert(err.message);
          }
        }
        
        // Adds a page break at the end of the destine documente and refreshes it
        destineFile.getBody().appendPageBreak();
        destineFile.saveAndClose();
        destineFile = DocumentApp.openById(destineFileId);
            
        // Removes the individual file
        folder.removeFile(file);
         
      }
    } else {
      SpreadsheetApp.getUi().alert('Error', 'The number of tags is different of the name of filled columns',
        SpreadsheetApp.getUi().ButtonSet.OK);
    }
  }
  
  // If unique file option has been chosen, we must create the file
  if (!multipleFiles) {
    if (pdfDocuments) {
      // Creates the file and check the creation;
      var pdf = destineFile.getAs(MimeType.PDF);
      folder.createFile(pdf).setName('Fusion');
    }
    if (!editableDocuments) {
      // Removes editable version of the document
      folder.removeFile(DriveApp.getFileById(destineFile.getId()));
    }
  }
  
  // Shows a message to notify the user the end of the script
  SpreadsheetApp.getActive().toast('Function has ended its execution', 'Ending execution', 10);
}

/**
 * Gets the Id of a Google Drive folder (or document) from its URL.
 * @param {string} url - The URL of the Drive folder (or document).
 * @return {string} The Id of the Drive folder (or document).
 */
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

/**
 * Checks the tags of the full text of a Google Document and compares them with the
 * tags in the spreadsheet. Returns any tag in the text that does not exist in the sheet.
 * @param {string} text - The full text of a Google Document.
 * @param {string[]} sheetTags - An array with the tags in the spreadsheet.
 * @return {string[]} An array with all the tags in the document that have not been found in the sheet.
 */
function checkTags(text, sheetTags) {
  var templateTags = text.match(/<<[^>]+>>/g);
  
  var tagsNotFound = [];
  for (i=0; i<templateTags.length; i++) {
    if (sheetTags.indexOf(templateTags[i]) == -1) {
      tagsNotFound = tagsNotFound.concat(templateTags[i]);
    }
  }
  return tagsNotFound
}
