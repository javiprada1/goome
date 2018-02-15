function getAllCalendars() {
  var calendars = Calendar.CalendarList.list();
  
  for(iterator = 0; iterator < Calendar.CalendarList; iterator++){
    var calendarId = calendars.items[iterator].id;
    var calendarSummary = calendars.items[iterator].summary;
  
  }
  
  Logger.log(calendars);
  
  /*
  var calendar = calendars.items[3];
  
  Logger.log("El id del calendario es: "+calendar.id);
  
  var hoy = new Date();
  var events = CalendarApp.getDefaultCalendar().getEventsForDay(hoy);
  
  Logger.log('Eventos: '+events);
  */
}
