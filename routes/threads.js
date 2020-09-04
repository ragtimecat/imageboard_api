const express = require('express');
const {
  getThreads,
  getThread,
  createThread,
  updateThread,
  deleteThread
} = require('../controllers/threads');

const { protect, authorize } = require('../middleware/auth');

//import other resource routers
const messageRouter = require('./messages');

const router = express.Router({ mergeParams: true });

//reroute to other resources
router.use('/:threadId/messages', messageRouter);

router.route('/')
  .get(getThreads)
  .post(createThread);

router.route('/:id')
  .get(getThread)
  .put(protect, authorize('moderator', 'admin'), updateThread)
  .delete(protect, authorize('moderator', 'admin'), deleteThread);

module.exports = router;