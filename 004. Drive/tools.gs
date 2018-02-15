//Creates a file at the Drive's root
function createNewFile(){
  //createFile('fileName', 'fileContent', fileType)
  var newFile = DriveApp.createFile(
    'fileName', 'Hello World!', MimeType.PLAIN_TEXT);
  Logger.log("Created file " + newFile.getName())
}

//Creates a folder at the Drive's root
function createNewFolder(){
  //createFolder('folderName')
  var newFolder = DriveApp.createFolder('folderName'); //folder's name
  Logger.log("Created folder " + newFolder.getName())
}

//Delete a file
function deleteFile(){
  //getFileById('FileId');
  var file = DriveApp.getFileById('1rKZYo51nXKJ3J7vr5RQNX8aXBztqRl0xE_dg3G4E75c'); //file's id
  //removeFile(file)
  DriveApp.removeFile(file)
  Logger.log("Deleted file " + file.getName())
}

//Delete a folder
function deleteFolder(){
  //getFileById('folderId');
  var folder = DriveApp.getFolderById('1094zeJO6lrHEkg-Ohi_mhmqDH2beHIaRw1KPI6ihkQQ'); //folder's id
  //removeFolder(folder)
  DriveApp.removeFolder(folder)
  Logger.log("Deleted folder  " + folder.getName())
}

//List all the files and folders at the root directory.
function listFiles(){
  //getFiles gets a collection of all files in the user's Drive.
  var files = DriveApp.getFiles();
  //while the var files has a next item, print it in the logger.
  while (files.hasNext()) {
    var file = files.next();
    Logger.log(file.getName());
  }
}

//Delete every untitled spreadsheet that hasn't been updated in a week.
function deleteOutdatedFiles(){
  //getFilesByName gets a collection of all files with the given name.
  var files = DriveApp.getFilesByName('Untitled spreadsheet'); //In this case delete spreadsheets
  //while the var files has a next item, delete it if is outdated.
  while (files.hasNext()) {
    var file = files.next();
    if (new Date() - file.getLastUpdated() > 7 * 24 * 60 * 60 * 1000) {
      file.setTrashed(true);
      Logger.log(file.getName());
    }
  }
}
