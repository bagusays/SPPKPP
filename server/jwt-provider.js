const jwt = require('jsonwebtoken')
const express = require('express')
const passport = require("passport");
const passportJWT = require("passport-jwt");
const BearerStrategy = require('passport-http-bearer').Strategy
const db = require('./db')
const app = express.Router(); 

const config = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'HMrlQzpv+BlS+mAO8iMnyCPT7prqKxV9EmHHUvV3jmTl040+NLCWmiwAmZsUvn1v0noWYsOCLO4rpS3vN88PsQ=='
}

const strategy = new BearerStrategy(function(token, next) {
    jwt.verify(token, config.secretOrKey, async function(err, decoded) {
        if (err)
            next(null, false)
        else {
            var user = await db('pp_user').where({Username: decoded.Username})
            if(user != 0)
                next(null, user); 
        }
    })
})

module.exports = {
    config,
    strategy
}