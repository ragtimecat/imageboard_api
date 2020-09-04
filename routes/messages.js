const express = require('express');
const {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage
} = require('../controllers/messages');

const { protect, authorize } = require('../middleware/auth');

//import other resource routers
// const threadRouter = require('./threads');

const router = express.Router({ mergeParams: true });

//reroute to other resources
// router.use('/:boardId/threads', threadRouter);

router.route('/')
  .get(getMessages)
  .post(createMessage);

router.route('/:id')
  .put(protect, authorize('moderator', 'admin'), updateMessage)
  .delete(protect, authorize('moderator', 'admin'), deleteMessage);

module.exports = router;

