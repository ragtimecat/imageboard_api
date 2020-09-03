// const Thread = require('../models/Thread');
const asyncHandler = require('../middleware/async');
// const ErrorResponse = require('../utils/errorResponse');

// exports.getThreads = asyncHandler(async (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     data: {}
//   })
// });


// @desc    Get all boards
// @route   GET /api/v1/boards
// @access  Public
exports.getThreads = asyncHandler(async (req, res, next) => {

  res.status(200).json({
    success: true,
    data: {}
  })
});