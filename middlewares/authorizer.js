/**
 * Created by sheershoff on 10/21/16.
 */
var logat = require('logat');
logat.setOptions(process.env.NODE_ENV === 'production'?{debug: false}:{});

const authorizer = function (req, res, next) {
    logat.debug("query, body", req.query, req.body);

    const token = req.query[process.env.KPG_TOKEN_FIELD || 'token'];

    if (token === process.env.KPG_TOKEN_VALUE) {
        return next();
    }

    return res.status(401).json({message: "Not Authorized"});
};

module.exports = authorizer;