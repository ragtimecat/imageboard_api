const express = require('express');
const {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage
} = require('../controllers/messages');

// model import

//import other resource routers
// const threadRouter = require('./threads');

const router = express.Router({ mergeParams: true });

//reroute to other resources
// router.use('/:boardId/threads', threadRouter);

router.route('/')
  .get(getMessages)
  .post(createMessage);

router.route('/:id')
  .put(updateMessage)
  .delete(deleteMessage);

module.exports = router;

