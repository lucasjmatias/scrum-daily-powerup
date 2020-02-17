const express = require('express');
const app = express();
const cors = require('cors');

const feriadoRoute = require('./src/routes/FeriadoRoute');
const trelloRoute = require('./src/routes/TrelloRoute');

app.use(cors());
app.use(express.static('public'));
app.use('/feriados', feriadoRoute);
app.use('/trello', trelloRoute);

module.exports = app;
