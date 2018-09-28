const cookieSession = require('cookie-session');
const warnings = require('../constants/warnings');
//add cookieSession to allow for users to remain logged in for sustained periods

const serverSessionSecret = () => {
    if (!process.env.SERVER_SESSION_SECRET ||
        process.env.SERVER_SESSION_SECRET.length < 8 ||
        process.env.SERVER_SESSION_SECRET === warnings.exampleBadSecret) {
        // Warning if user doesn't have a good secret
        console.log(warnings.badSecret);
    }

    return process.env.SERVER_SESSION_SECRET;
};


module.exports = cookieSession({
    secret: serverSessionSecret() || 'secret', // please set this in your .env file
    key: 'user', // this is the name of the req.variable. 'user' is convention, but not required
    resave: 'false',
    saveUninitialized: false,
    cookie: { maxage: 60000, secure: false },
});

//when this module is required, exports function that will send a token to a user upon login
