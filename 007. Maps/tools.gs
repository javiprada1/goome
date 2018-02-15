function createMap(width, heigth, address) {
  	var myMap = Maps.newStaticMap();
  width=600;
  heigth = 600;
  address = 'Eusa, Sevilla';
    myMap.setSize(width, heigth);
    myMap.setCenter(address);
  myMap.setZoom(5);
  // Create the user interface and add the map image.
  var html = HtmlService.createHtmlOutput(myMap.getMapUrl());
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'Dialog title');
  
}


