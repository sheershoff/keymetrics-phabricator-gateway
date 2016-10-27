'use strict';

// checking requirements

var notEmptyEnvs = [
    'KPG_TOKEN_VALUE',
    'KPG_CONDUIT_TOKEN',
    'KPG_CONDUIT_ROOT'
];

notEmptyEnvs.map(function(i){
    if (!process.env[i]) {
        throw new Error('Environment variable ' + i + ' should be set and not empty');
    }
});

const express = require('express'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    pmx = require('pmx'),
    logger = require('morgan');
var logat = require('logat');
logat.setOptions(process.env.NODE_ENV === 'production'?{debug: false}:{});

var app = express();

// all environments
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app code
app.use(require('./middlewares/authorizer.js'));
app.use('/' + (process.env.KPG_PATH || ''), require('./routes/keymetricsHook.js'));

// development only
if (process.env.NODE_ENV !== 'production') {
    logat.info('  *** USING DEVELOPMENT *** ');
    app.use(errorhandler());
}

module.exports = app;
