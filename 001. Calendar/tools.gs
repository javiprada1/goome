/*This function returns an Array with all calendars user containing id and summary (name)
function getAllCalendars() {
  var calendars = Calendar.CalendarList.list();
  var calArray = [];
  
  Iterate over CalendarList, getting id and summary and putting into an Array
  for(iterator = 0; iterator < Calendar.CalendarList; iterator++){
    var calendarId = calendars.items[iterator].id;
    var calendarSummary = calendars.items[iterator].summary;
    calArray.push([calendarId, calendarSummary]);
  }
  
  var q = calArray[1];
  
  Logger.log(q);
  
  var calendar = calendars.items[3];
  
  Logger.log("El id del calendario es: "+calendar.id);
  
  var hoy = new Date();
  var events = CalendarApp.getDefaultCalendar().getEventsForDay(hoy);
  
  Logger.log('Eventos: '+events);
  
}*/

//This function lists all primary calendar's events
function listUpcomingEvents() {
  var calendarId = 'primary';
  var arrayEvents = [];
  var optionalArgs = {
    timeMin: (new Date()).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: 'startTime'
  };
  var response = Calendar.Events.list(calendarId, optionalArgs);
  var events = response.items;
  if (events.length > 0) {
    for (i = 0; i < events.length; i++) {
      var event = events[i];
      var when = event.start.dateTime;
      if (!when) {
        when = event.start.date;
      }
      arrayEvents.push(event.summary);
      //Logger.log('%s (%s)', event.summary, when);
    }
  } else {
    Logger.log('No upcoming events found.');
  }
  return arrayEvents;
}