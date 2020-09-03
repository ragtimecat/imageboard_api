const Board = require('../models/Board');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');


// @desc    Get all boards
// @route   GET /api/v1/boards
// @access  Public
exports.getBoards = asyncHandler(async (req, res, next) => {
  const boards = await Board.find();

  res.status(200).json({
    success: true,
    count: boards.length,
    data: boards
  })
});

// @desc Get board by id
// @route GET /api/v1/boards/:id
// @access Public
exports.getBoard = asyncHandler(async (req, res, next) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    return next(new ErrorResponse(`No board with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    succes: true,
    data: board
  })
});

// @desc Create new board
// @route POST /api/v1/boards
// @access Private
exports.createBoard = asyncHandler(async (req, res, next) => {
  const board = await Board.create(req.body);

  res.status(200).json({
    success: true,
    data: board
  })
});

// @desc Update board
// @route PUT /api/v1/boards/:id
// @access Private
exports.updateBoard = asyncHandler(async (req, res, next) => {
  let board = await Board.findById(req.params.id);

  if (!board) {
    return next(new ErrorResponse(`No board with id of ${req.params.id}`, 404));
  }

  board = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    data: board
  })
});

// @desc Delete board
// @route DELETE /api/v1/boards/:id
// @access Private
exports.deleteBoard = asyncHandler(async (req, res, next) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    return next(new ErrorResponse(`No board with id of ${req.params.id}`, 404));
  }

  board.remove();

  res.status(200).json({
    success: true,
    data: {}
  })
});



