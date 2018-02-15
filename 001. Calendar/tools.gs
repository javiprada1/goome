//This function returns an Array with all calendars containing id and summary (name)
function getAllCalendars() {
  var calendars = Calendar.CalendarList.list();
  
  //Iterate over CalendarList, getting id and summary and putting into an Array
  for(iterator = 0; iterator < Calendar.CalendarList; iterator++){
    var calendarId = calendars.items[iterator].id;
    var calendarSummary = calendars.items[iterator].summary;
  
  }
  
  /*
  var calendar = calendars.items[3];
  
  Logger.log("El id del calendario es: "+calendar.id);
  
  var hoy = new Date();
  var events = CalendarApp.getDefaultCalendar().getEventsForDay(hoy);
  
  Logger.log('Eventos: '+events);
  */
}
