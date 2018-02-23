//This function lists all primary calendar's events
/*
  It has no parameters as you can see.

  When the calendar is instancied, it gets the Primary Calendar one.
  
  It gets ordered by time.
  
  The array returns a list of events with its names.
*/

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

    for (i = 0; i < events.length; i++) {
      var event = events[i];
      var when = event.start.dateTime;
      if (!when) {
        when = event.start.date;
      }
      arrayEvents.push(event.summary);
    }
  
  return arrayEvents;
}