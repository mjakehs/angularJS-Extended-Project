const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    pool.query('SELECT id, username FROM person WHERE id = $1', [id]).then((result) => {
      // Handle Errors
      const user = result && result.rows && result.rows[0];
  
      if (!user) {
        // user not found
        done(null, false, { message: 'Incorrect credentials.' });
      } else {
        // user found
        done(null, user);
      }
    }).catch((err) => {
      console.log('query err ', err);
      done(err);
    });
  });