const Message = require('../models/Message');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');


// @desc    Get all messages by Thread Id
// @route   GET /api/v1/threads/:threadId/messages
// @access  Public
exports.getMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({ thread: req.params.threadId });

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages
  })
});

// @desc    Create message
// @route   POST /api/v1/threads/:threadId/messages
// @access  Public
exports.createMessage = asyncHandler(async (req, res, next) => {
  req.body.thread = req.params.threadId;
  const message = await Message.create(req.body);

  res.status(200).json({
    success: true,
    data: message
  })
});

// @desc    Update message
// @route   PUT /api/v1/messages/:id
// @access  Public
exports.updateMessage = asyncHandler(async (req, res, next) => {
  let message = await Message.findById(req.params.id);

  if (!message) {
    return next(new ErrorResponse(`No message with id of ${req.params.id}`, 404));
  }

  message = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    data: message
  })
});

// @desc    Delete message
// @route   DELETE /api/v1/messages/:id
// @access  Public
exports.deleteMessage = asyncHandler(async (req, res, next) => {
  let message = await Message.findById(req.params.id);

  if (!message) {
    return next(new ErrorResponse(`No message with id of ${req.params.id}`, 404));
  }

  message.remove();

  res.status(200).json({
    success: true,
    data: {}
  })
});

