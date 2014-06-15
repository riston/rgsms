#!/usr/bin/env node

var program = require('commander'),
    GCal    = require('../lib/gcalendar');

program
    .version('0.0.1')
    .option('-e, --email <serviceEmail>', 'Service email get from Google console page')
    .option('-k, --key <keyFile>', 'Location for the Google key file');

program
    .command('create')
    .description('create a new event in calendar')
    .option('-S, --start <time>', 'The start time of event', new Date().toISOString())
    .option('-E, --end <time>', 'The end time of event', new Date().toISOString())
    .option('-i, --calId <calendar id>', 'Calendar id where the event is created')
    .option('-s, --sum <summary>', 'Summary text title', 'SMS title')
    .option('-d, --desc <description>', 'Description', 'Description')
    .option('-u, --url <link>', 'You can add some link')
    .action(function (env, options) {

        if (!program.email) {

            if (process.env.SERVICE_EMAIL) {
                program.email = process.env.SERVICE_EMAIL;
            } else {
                console.log('No "service mail" set, check the account details!');
                return;
            }
        }

        if (!program.key) {
            if (process.env.KEY_FILE) {
                program.key = process.env.KEY_FILE;
            } else {
                console.log('No "key file" set, make sure you have generated key file');
                return;
            }
        }

        if (!env.calId) {
            if (process.env.CALENDAR_ID) {
                env.calId = process.env.CALENDAR_ID;
            } else {
                console.log('No calendar Id provided, make sure you set the "-i" option!');
                return;
            }
        }

        var G = new GCal(program.email, program.key),
            object = {
                summary:     env.sum,
                description: env.desc,
                start: {
                    dateTime: env.start
                },
                end: {
                    dateTime: env.end
                }
            };

        if (env.url) {
            // TODO: validate the url before sending
            object.url = env.url;
        }

        G.createEventFormat(env.calId, object, function (err, res) {});
    });

program
    .command('list')
    .description('list all the user calendars')
    .action(function(env, options) {
        var G = new GCal(program.email, program.key);

        G.listCalendarsFormat(function (err, res) {
            if (err) {
                console.log(err);
                return;
            }
        });

    });

program
    .command('*')
    .action(function(env) {
        console.log('deploying "%s"', env);
    });

program.parse(process.argv);
