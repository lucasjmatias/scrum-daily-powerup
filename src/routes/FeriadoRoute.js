const express = require('express');
const router = express.Router();
const controller = require('../controllers/FeriadoController');

router.get('?:ano', controller.get);

module.exports = router;
