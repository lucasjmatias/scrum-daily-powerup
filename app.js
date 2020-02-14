const express = require('express');
const app = express();
const cors = require('cors');

const feriadoRoute = require('./src/routes/FeriadoRoute');

app.use(cors());
app.use(express.static('public'));
app.use('/feriados', feriadoRoute);

module.exports = app;
