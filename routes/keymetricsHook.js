/**
 * Created by sheershoff on 10/21/16.
 */

const createCanduit = require('canduit');
const debug = require('debug')('kpg');
const format = require('./../templates/' + (process.env.KPG_TEMPLATE || 'default') + '.js');
var logat = require('logat');
logat.setOptions(process.env.NODE_ENV === 'production'?{debug: false}:{});

var canduit;

// creating conduit connection
createCanduit({
    api: process.env.KPG_CONDUIT_ROOT,
    token: process.env.KPG_CONDUIT_TOKEN
}, function (err, instance) {
    if (err) {
        return logat.error('Error establishing conduit connection:', err);
    } else {
        logat.debug('Conduit connection established');
        canduit = instance;
    }
});

const keymetricsHook = function (req, res) {

    if (!canduit) {
        logat.error("Can't initialize canduit");
        return res.json({message: "Can't initialize canduit"});
    }

    logat.debug("query, body", req.query, req.body);

    if (req.body.event !== 'event:new_exception') {
        return res.json({message: "Not interested, but thanks..."});
    }

    // sending

    canduit.exec('maniphest.createtask', format(req.body.data), function (err, result) {
        if (err) {
            logat.error('Canduit error:', err);
        }
        logat.debug("err, result", err, result);
        res.json({message: "Thanks, guys!"});
    });
};

module.exports = keymetricsHook;