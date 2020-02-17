const express = require('express');
const router = express.Router();
const controller = require('../controllers/TrelloController');

router.get('/boards', controller.getBoards);
router.get('/boards/:boardId', controller.getBoard);
router.get('/boards/:boardId/lists', controller.getLists);
router.get('/lists/:listId/cards', controller.getCards);

module.exports = router;