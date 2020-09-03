const express = require('express');
const {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
} = require('../controllers/boards');

// model import

//import other resource routers
const threadRouter = require('./threads');

const router = express.Router();

//reroute to other resources
router.use('/:boardId/threads', threadRouter);

router.route('/')
  .get(getBoards)
  .post(createBoard);

router.route('/:id')
  .get(getBoard)
  .put(updateBoard)
  .delete(deleteBoard);

module.exports = router;

