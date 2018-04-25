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
  var folderRoot = DriveApp.getFolderById(urlID);
  
  /*
  This code remove the editors privileges and set all to viewer/read privilege only, for each folder and file inside our request main folder in a recursive way.
  All the users with whom folders and files has been shared change privileges from edit to read mode.
  */
  
  if(buttonURL == ui.Button.OK){
    
    //Remove permission to files first
    var childFilessRoot = folderRoot.getFiles();
    while(childFilessRoot.hasNext()){
      var file = childFilessRoot.next();
      disablePermissionsFile(file);
    }
    
    // Removing Editor Permissions and setting as a Viewer/Read permission only @ folders //
    
    var childFoldersRoot = folderRoot.getFolders();
    
    while(childFoldersRoot.hasNext()){
      // Globals var
      var childFolder = childFoldersRoot.next();
      Logger.log("Entro en:"+childFolder.getName());
      
      //Now, delete permission to ChildFolder
      var resfolder = disablePermissionsFolder(childFolder);
      
      // Remove all permision to files
      var files = childFolder.getFiles();
      while(files.hasNext()){
        var file = files.next();
        var res = disablePermissionsFile(file);
        Logger.log("Quito permiso de: "+file.getName());
      }
      
      //If this childFolder contains Subfolders or subfiles before delete permisions
      var subchildfolders = childFolder.getFolders();
      
      if(subchildfolders.hasNext()){
        Logger.log("Tiene hijos"); 
      }else{
        Logger.log("No tiene hijos");
      }
      
      //Iterate all subfolder and subfiles
      while(subchildfolders.hasNext()){
        //SubFolder var
        var subchildFolder = subchildfolders.next();
        var resSubFolder = iterateFolder(subchildFolder);
      }
    }
    
    ui.alert('Disable access was successfuly');
    
    
  }else{
    ui.alert('Error, there was a problem disabling acess');
  }
  
}

/*
Function aux to disable all permissions recursively to a folder
*/
function disablePermissionsFolder(folder){
  var ret = false;
  var users = folder.getViewers();
  for(var i = 0; i < users.length ; i++){
    var email = users[i].getEmail();
    if(email != ""){
      Logger.log("Entro y elimino carpeta (Visor): "+folder.getName());
      folder.removeViewer(email);    
      ret = true;
    }       
  }
  
  var users = folder.getEditors();
  for(var i = 0; i < users.length;i++){
    var email = users[i].getEmail();
    if(email != ""){
      Logger.log("Entro y elimino carpeta (Editor): "+folder.getName());
      folder.removeEditor(email);
      ret = true;
    }
  }
  
  return ret;
  
}
/*
Function aux to disable all permissions recursively to a file
*/
function disablePermissionsFile(file){
  var ret = false;
  var fileUsers = file.getViewers();
  for(var i = 0; i < fileUsers.length;i++){
    Logger.log("Entro y elimino archivo (Visor): "+file.getName());
    var email = fileUsers[i].getEmail();
    if(email != ""){
      file.removeViewer(email);
      ret = true;
    }
  }
  
  var fileUsers = file.getEditors();
  for(var i = 0; i < fileUsers.length;i++){
    var email = fileUsers[i].getEmail();
    if(email != ""){
      Logger.log("Entro y elimino archivo (Editor): "+file.getName());
      file.removeEditor(email);
      ret = true;
    }
  }
  
  return ret;
}

/*
Function to iterate recusively a folder
*/

function iterateFolder(subchildFolder){
  
  Logger.log("Entro en: "+subchildFolder.getName());
  // Delete permission files
  var subfiles = subchildFolder.getFiles();
  while(subfiles.hasNext()){
    var subsubfiles = subfiles.next();
    Logger.log("Quito permiso a Sub archivo: "+subsubfiles.getName());
    disablePermissionsFile(subsubfiles);
  }
  
  // Delete permission folder
  var subfolder = subchildFolder.getFolders();
  while(subfolder.hasNext()){
    var subsubfolder = subfolder.next();
    disablePermissionsFolder(subsubfolder);
    Logger.log("Quito permiso a Sub carpeta: "+subsubfolder.getName());
    iterateFolder(subsubfolder);
  }
}
