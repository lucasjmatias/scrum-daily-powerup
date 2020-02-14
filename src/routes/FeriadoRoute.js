const express = require('express');
const router = express.Router();
const controller = require('../controllers/FeriadoController');

router.get('/', controller.get);

module.exports = router;
