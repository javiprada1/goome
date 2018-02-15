function createRoute() {
  //This function returns an url of a static map 
  //var sheet represents the actual (active) spreadsheet
  	var sheet = SpreadsheetApp.getActiveSpreadsheet();
  //addresses store the values of the selected range
  var addresses = sheet.getActiveRange();
  //Create a static map
  var routeMap = Maps.newStaticMap();
  // For each entry in addresses, create a map marker with the address and
  // the style we want.
  for (var i = 0; i < addresses.length; i++) {
    routeMap.setMarkerStyle(Maps.StaticMap.MarkerSize.MID, Maps.StaticMap.Color.GREEN, 1);
    routeMap.addMarker(addresses[i][1]);
  }
  routeMap.setZoom(5);
  routeMap.setCenter(addresses[0]);
  return routeMap.getMapUrl();
}


