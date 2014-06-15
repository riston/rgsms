var _    = require('lodash'),
    util = require('util'),
    gapi = require('googleapis');

var GCalendar = function (email, key) {

    this.service = gapi.discover('calendar', 'v3');
    this.authUrl = 'https://www.googleapis.com/auth/calendar';

    this.email = email || '';
    this.key   = key || '';

    this.calendarEvent = {
        start: {
            dateTime: new Date().toISOString()
        },
        end: {
            dateTime: new Date().toISOString()
        },
        summary:     'The title of event',
        description: 'Longer description for event',
        attendees:   [],
        reminders: {
            overrides: [{
                method: 'sms',
                minutes: 1
            }],
            useDefault: false
        },
    };
};

GCalendar.prototype.auth = function (serviceEmail, keyFileLocation, cb) {

    this.jwt = new gapi.auth.JWT(
        serviceEmail,
        keyFileLocation,
        'key',
        [ this.authUrl ]
    );

    return this.jwt.authorize(cb);
};

GCalendar.prototype.getClient = function (cb) {
    var _this = this;

    this.service.execute( function(err, client) {

        if (err) {
            return cb(err);
        }

        _this.auth(_this.email, _this.key, function (err, res) {
            if (err) {
                return cb(err);
            }

            // Need only the client object
            return cb(null, client);
        });
    });
};

GCalendar.prototype.listCalendars = function (cb) {
    var _this = this;

    this.getClient(function (err, client) {
        if (err) {
            return cb(err);
        }

        return client
            .calendar
            .calendarList
            .list()
            .withAuthClient(_this.jwt)
            .execute(cb);
    });
};

GCalendar.prototype.listCalendarsFormat = function (cb) {

    this.listCalendars(function (err, res) {
        if (err) {
            console.log(err);
            return cb(err);
        }

        // Print the calendar information, currently only taking the id and summary
        res.items.forEach(function (calendar, index) {

            var row = util.format('%d - "%s" id(%s)', index, calendar.summary, calendar.id);
            console.log(row);
        });

        // Pass the object
        return cb(null, res);
    });
};

GCalendar.prototype.createEvent = function (calId, options, cb) {
    var _this  = this,
        params = {
            calendarId: calId
        };

    _.merge(this.calendarEvent, options);

    this.getClient(function (err, client) {
        if (err) {
            return cb(err);
        }

        return client
            .calendar
            .events
            .insert(params, _this.calendarEvent)
            .withAuthClient(_this.jwt)
            .execute(cb);
    });
};

GCalendar.prototype.createEventFormat = function (calId, options, cb) {

    this.createEvent(calId, options, function (err, event) {
        if (err) {
            console.log(err);
            return cb(err);
        }

        console.log(util.format('status=%d summary="%s" description="%s" start=%s end=%s',
            200,
            event.summary,
            event.description,
            event.start.dateTime,
            event.end.dateTime));

        return cb(null, event);
    });
};

module.exports = GCalendar;
