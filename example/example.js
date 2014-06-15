var SERVICE_EMAIL = 'sa-ds@developer.gserviceaccount.com';
var KEY_FILE = '../google-key.pem';

var GCal = require('../lib/gcalendar'),
    g = new GCal(SERVICE_EMAIL, KEY_FILE);

g.getClient(function (err, client) {

    // Get back the client instance
});

g.listCalendars(function (err, res) {

    // List the calendars without printing any data
});

g.listCalendarsFormat(function (err, res) {

    // Get the calendar array with printing operation
});

g.createEventFormat('d@group.calendar.google.com', { summary: "Change name" }, function (err, res) {

    // Get the event result with formated result
});
