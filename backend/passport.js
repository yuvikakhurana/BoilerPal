const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "629940451405-jcoad586mf868icf9lo1sed3cibot6mi.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

const GITHUB_CLIENT_ID = "d607521c4b9c54499a62"
const GITHUB_CLIENT_SECRET = "239ad9fabbbca566dd56c908f3fe2b1ff565b3fa"

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

  passport.use(
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });