const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Passport Session Configuration //
app.use(sessionMiddleware);
// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static('server/public'));
app.use('/api/user', require('./routes/user.router'));
app.use('/entries', require('./routes/entries.router'));
app.use('/projects', require('./routes/projects.router'));


app.listen(PORT, () => {
    console.log('App is listening on port: ', PORT);
})