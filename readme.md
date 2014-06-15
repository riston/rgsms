# RGSMS

## Description

Simple tool to send SMS through the Google Calendar.

## Installation

Local installation:

```npm install rgsms```

To get access for the CLI tool, install global version:

```npm install -g rgsms```

## Google calendar and service account setup


### Service account

Go to Google developer [console](https://console.developers.google.com) First make sure you have turned on the "calendar API".


Next create "Service account" and download the public/private key pair also get the service account email address which used later for authentication.


Currently Node can not read the pub/priv key pair so extract the key with OpenSSL.

```openssl pkcs12 -in ~/path/to-key.p12 -out ~/key.pem -nocerts```


Now we should have the key file and email for authentication.

### Google calendar setup

Create a new calendar, choose the name carefully as it will be displayed partly in the SMS title. Go to the "Remainders and notifications" settings and make sure you have verified your phone number so you can accept SMS.

Different ways to send the SMS, you can set the event remainder so it will send SMS before 1 minute. The second possible use case is to send the remainder as the event is created.


## API usage

```
var SERVICE_EMAIL = 'asadsads@developer.gserviceaccount.com';
var KEY_FILE = './key.pem';

var GCal = require('rgsms'),
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

g.createEventFormat('dsadsa@group.calendar.google.com', { summary: "Change name" }, function (err, res) {

    // Get the event result with formated result
});
```

## CLI usage

```bash
rgsms create -k ./key.pem -e saddsa-sdadsa@developer.gserviceaccount.com -i dsadsa@group.calendar.google.com -u www.neti.ee
status=200 summary="SMS title" description="Description" start=2014-06-14T10:54:31+03:00 end=2014-06-14T10:54:31+03:00
```

Set the start and end time:
```bash
rgsms create -k ./key.pem -e saddsa-sdadsa@developer.gserviceaccount.com -i dsadsa@group.calendar.google.com -S "2014-06-14T19:15:42.752Z" -E "2014-06-14T19:20:42.752Z"
status=200 summary="SMS title" description="Description" start=2014-06-14T22:15:42+03:00 end=2014-06-14T22:20:42+03:00
```
Using the ```evn``` variables:

```bash
export SERVICE_EMAIL=saddsa-sdadsa@developer.gserviceaccount.com
export KEY_FILE=/home/risto/Dropbox/rgsms/key.pem
export CALENDAR_ID=dsadsa@group.calendar.google.com
```

```rgsms create -s "This is the first other message"```

## License

GPL
