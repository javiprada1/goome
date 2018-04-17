/**
 * With this code you can gain time removing permissions to certain group of users whom a folder and files are shared with.
 * If you want to stop sharing certain folder with a group of users, forbidden them to make some changes, this script it's the fastest way
 * to change in seconds the permissions.
 * For this case, It's only needed the url from the G Drive folder we want to remove all the permissions. Once provided the url,
 * our script will change in seconds all the privileges from Editor to Viewer only, making this task easier than doing manually
 * for every subfolder and file inside our "tree folder".
 * @file Revoke Permissions Recursively
 * @author Luis Vega <luis.vega@eusa.es>
 * @version 1.0
 */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Advanced Options')
  .addItem('Disable access to collaborate folders', 'disablePermissions')
  .addToUi();
}


function disablePermissions() {
  var ui = SpreadsheetApp.getUi();
  var messageURL = ui.prompt(
    'Introduce the url of the folder you want to disable de access: ',
    ui.ButtonSet.OK_CANCEL);
  
 
  var buttonURL = messageURL.getSelectedButton();
  var url = messageURL.getResponseText();
  var urlID = url.match(/[-\w]{25,}/);
  var folder = DriveApp.getFolderById(urlID);
  var viewers = folder.getViewers();
  var editors = folder.getEditors();
  
  /*
  This code remove the editors privileges and set all of them to viewer only for each subfolder and file inside our main folder requested in a recursive way.
  All the users with whom folders and files has been shared change privileges from edit to view mode.
  */
  
  if(buttonURL == ui.Button.OK){
    
    // Removing Editor Permissions and leaving them as a Viewer only @ folders //
    
    var childFolders = folder.getFolders();
    while(childFolders.hasNext()){
      var childFolder = childFolders.next();
      for(var i = 0; i < editors.length;i++){
          email = editors[i].getEmail();
          if(email != ""){
            folder.removeEditor(email);
            //Utilities.sleep(1000); // Option used in case it couldn't be possible to remove an editor and add a viewer, so it has to be a "break" for G drive to remove one permission and add another to the same user.
            folder.addViewer(email);
          }else{
            Browser.msgBox("Error trying to remove editor privilege to the folder: "+folder.getName());
          }          
        }
      
      // Removing Editor Permissions and leaving as a Viewer only @ Files //
      
      var files = folder.getFiles();
      while(files.hasNext()){
        var file = files.next();
        var fileEditors = file.getEditors();
        for(var i = 0; i < fileEditors.length;i++){
            email = fileEditors[i].getEmail();
            if(email != ""){
              file.removeEditor(email);
              //Utilities.sleep(1000); // Option used in case it couldn't be possible to remove an editor and add a viewer, so it has to be a "break" for G drive to remove one permission and add another to the same user.
              file.addViewer(email);
            }else{
              Browser.msgBox("Error trying to remove editor privilege to the file: "+file.getName());
            }
        }
      }
    }
     
    ui.alert('Disable access was successfuly');
  }else{
    ui.alert('Error, there was a problem disabling acess');
  }
}
