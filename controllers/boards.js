const Board = require('../models/Board');


// @desc    Get all boards
// @route   GET /api/v1/boards
// @access  Public
exports.getBoards = async (req, res, next) => {
  const boards = await Board.find();

  res.status(200).json({
    success: true,
    data: boards
  })
}