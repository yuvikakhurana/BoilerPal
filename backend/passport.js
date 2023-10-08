const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "629940451405-jcoad586mf868icf9lo1sed3cibot6mi.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile); // callback faunction for DB
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });