const express = require("express");
const session = require("express-session");
const { Issuer, generators }  = require("openid-client");


let client;

async function initialiseClient(){
    const issuer = await Issuer.discover('https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_SS7YaReXk')
    client = new issuer.Client({
        client_id: "72la17o7mvtcl5q44u2bhp4t6r",
        client_secret: '<client secret>',
        redirectUrls:['https://d84l1y8p4kdic.cloudfront.net'],
        response_types:["code"]
    })
}

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}));


const checkAuth = (req, res, next) => {
    if (!req.session.userInfo) {
        req.isAuthenticated = false;
    } else {
        req.isAuthenticated = true;
    }
    next();
};

app.get('/', checkAuth, (req, res) => {
    res.render('home', {
        isAuthenticated: req.isAuthenticated,
        userInfo: req.session.userInfo
    });
});

initialiseClient().catch(console.error);
