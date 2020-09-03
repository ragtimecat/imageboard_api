const Thread = require('../models/Thread');
const Board = require('../models/Board');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all threads
// @route   GET /api/v1/boards/:boardId/threads
// @access  Public
exports.getThreads = asyncHandler(async (req, res, next) => {
  if (req.params.boardId) {
    const threads = await Thread.find({ board: req.params.boardId });

    res.status(200).json({
      success: true,
      count: threads.length,
      data: threads
    })
  } else {
    const threads = await Thread.find();

    res.status(200).json({
      success: true,
      count: threads.length,
      data: threads
    })
  }
});

// @desc    Get single thread
// @route   GET /api/v1/threads/:id
// @access  Public
exports.getThread = asyncHandler(async (req, res, next) => {
  const thread = await Thread.findById(req.params.id);

  if (!thread) {
    return next(new ErrorResponse(`No thread with id of ${req.params.id}, 404`));
  }

  res.status(200).json({
    success: true,
    data: thread
  })
});

// @desc    Create thread
// @route   POST /api/v1/boards/:boardId/courses
// @access  Public
exports.createThread = asyncHandler(async (req, res, next) => {
  req.body.board = req.params.boardId;

  const board = await Board.findById(req.params.boardId);

  if (!board) {
    return next(new ErrorResponse(`No board with id of ${req.params.boardId}, 404`));
  }

  const thread = await Thread.create(req.body);
  thread.addFirstMessage(req.body.message);

  res.status(200).json({
    success: true,
    data: thread
  })
});

// @desc    UPDATE thread
// @route   PUT /api/v1/threads/:id
// @access  Private
exports.updateThread = asyncHandler(async (req, res, next) => {
  let thread = await Thread.findById(req.params.id);

  if (!thread) {
    return next(new ErrorResponse(`No thread with id of ${req.params.id}, 404`));
  }

  thread = await Thread.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: thread
  })
});

// @desc    Delete thread
// @route   DELETE /api/v1/threads/:id
// @access  Private
exports.deleteThread = asyncHandler(async (req, res, next) => {
  let thread = await Thread.findById(req.params.id);

  if (!thread) {
    return next(new ErrorResponse(`No thread with id of ${req.params.id}, 404`));
  }

  await thread.remove();

  res.status(200).json({
    success: true,
    data: {}
  })
});

