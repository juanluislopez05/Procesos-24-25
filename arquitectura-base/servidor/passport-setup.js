const passport = require("passport");

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const dotenv = require('dotenv').config();

const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const callbackURL = process.env.callbackURL;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

