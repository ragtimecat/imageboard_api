const express = require('express');
const {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
} = require('../controllers/boards');

const { protect, authorize } = require('../middleware/auth');

//import other resource routers
const threadRouter = require('./threads');

const router = express.Router();

//reroute to other resources
router.use('/:boardId/threads', threadRouter);

router.route('/')
  .get(getBoards)
  .post(protect, authorize('admin'), createBoard);

router.route('/:id')
  .get(getBoard)
  .put(protect, authorize('moderator', 'admin'), updateBoard)
  .delete(protect, authorize('admin'), deleteBoard);

module.exports = router;

