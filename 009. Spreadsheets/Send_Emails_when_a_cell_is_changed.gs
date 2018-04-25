/**
 * With this code we can send an email to a certain group of contacts each time the content of a certain range of cells is modified.
 *
 * This range is customizable on the first page by entering the first and last cell of the range.
 *
 * In addition you can enter in the first sheet of the spreadsheet the contact data to send the notification email.
 *
 * @file Send_Emails_when_a_cell_is_changed
 * @author Daniel del Pino <asuc007@gmail.com>
 * @version 1.0
 */

/*
  We create an installable Trigger that will be activated when one of the range cells is edited.
  The creation line has been commented because if it is not installed every time it is executed, uncomment
  in the first execution 
*/
function createSpreadsheetEditTrigger() {
  var ss = SpreadsheetApp.getActive();
  var builder = ScriptApp.newTrigger("readData").forSpreadsheet(ss).onEdit();
  //builder.create();
}

/*
  This function reads the data from the spreadsheets. First we take the cells that make up the
  start and end of range of cells E1 and F1 of the Contacts sheet to create the range.
  
  After creating the range, we define which cells will be controlled by control of
  end and start of it. Even if we change the range, dynamic control is always adapted.
   
  We check if the last modified cell is in the range and if so we pass the data of
  the same and the new value to the SendEmail function that is responsible for sending the corresponding emails.

*/
function readData() {

  //Access the spreadsheet of contacts to read the data of the cell that we are going to control
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Contacts');
  var cell1=sheet.getRange('E1').getValue();
  var cell2=sheet.getRange('F1').getValue();

  //Access the data spreadsheet to control possible changes in the cell
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
  var lastCell = sheet.getActiveCell();
  var range=sheet.getRange(cell1+':'+cell2);
  
  //Delimitación del rango
  var columnBeginRange=range.getColumn();
  var rowBeginRange=range.getRow();
  var columnEndRange=range.getLastColumn();
  var rowEndRange=range.getLastRow();
  var rcell=lastCell.getRow()-rowBeginRange;
  var ccell=lastCell.getColumn()-columnBeginRange;
  
  //We take the new value and the notation of the cell
  var value= lastCell.getValue();
  var cell= lastCell.getA1Notation();
  
  //If the cell is within the range, we pass to the SendMail function
  if(ccell>=0 & ccell<=columnEndRange-columnBeginRange){
    if (rcell>=0 & rcell<=rowEndRange-rowBeginRange){
      Browser.msgBox('The cell modified is ' +cell+ ' with a value of ' +value);
      sendMail(value,cell);
    }
  }
}


/*
  We create the elements of the Email and we read the contacts of the corresponding sheet
  to move on to send the emails.
  
  Value: the value of the cell
  cell: The modified cell
*/
function sendMail(value,cell){  

    //we access the contact spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Contacts');
    var lastRow = sheet.getLastRow()+1;
  
     var message= 'Different value int the cell ' + cell +':  ' +value;
          
    //We assemble the mail subject
    var subject ='New content in the cells';
  
  
  //We go through the address column
  for (var i=2;i<lastRow;i++){
    var name=sheet.getRange('A'+i).getValue();
    var lastName=sheet.getRange('B'+i).getValue();
    var email=sheet.getRange('C'+i).getValue();
    
    GmailApp.sendEmail(email, subject, message);
    
  }
 
}
