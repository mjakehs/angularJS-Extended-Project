const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));
app.use('/entries', require('./routes/entries.router'));
app.use('/projects', require('./routes/projects.router'));

app.listen(PORT, () => {
    console.log('App is listening on port: ', PORT);
})