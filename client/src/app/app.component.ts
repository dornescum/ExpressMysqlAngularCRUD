import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'client2 ';


}

// TODO
/*
https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html
const contentType = require('content-type')
const getRawBody = require('raw-body')


const toobusy = require('toobusy-js');
app.use(function(req, res, next) {
    if (toobusy()) {
        // log if you see necessary
        res.status(503).send("Server Too Busy");
    } else {
    next();
    }
});

const bouncer = require('express-bouncer');
const ExpressBrute = require('express-brute');

const limiter = new RateLimiter();
limiter.addLimit('/login', 'GET', 5, 500); // login page can be requested 5 times at max within 500 seconds

const svgCaptcha = require('svg-captcha');

const hpp = require('hpp');
app.use(hpp());

const events = require('events');

const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    name: 'cookieName',
    cookie: { secure: true, httpOnly: true, path: '/user', sameSite: true}
}));

const express = require("express");
const helmet = require("helmet");
const app = express();
app.use(helmet()); // Add various HTTP headers

const nocache = require("nocache");
app.use(nocache())

app.use(helmet.hidePoweredBy());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));


* */
