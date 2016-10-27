/**
 * Created by sheershoff on 10/27/16.
 */

/**
 * Module dependencies.
 */

var baseUrl = 'http://app:3000'; // docker-based url

var app = require('./../../index.js');
var bodyparser = require('body-parser');
var express = require('express');
var request = require('supertest')(process.env.MYSQL_PORT_3306_TCP_ADDR ? baseUrl : app);
var should = require('should');

/**
 * Test posting to phabricator with real data.
 */

describe('Test real posting to phabricator', function () {
    describe('Test fixture from http://docs.keymetrics.io/docs/pages/integrations/#custom-integration', function () {
        it('should fail on client_credentials token request with wrong token', function (done) {
            request
                .post('/' + (process.env.KPG_PATH || '') + '?' + (process.env.KPG_TOKEN_FIELD || 'token') + '=' + process.env.KPG_TOKEN_VALUE)
                .send(require('./fixtures/keymetrics.example.json'))
                .expect({
                    message: "Thanks, guys!"
                })
                .expect(200)
                .end(done);
        });
    });
});
