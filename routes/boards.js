const express = require('express');
const {
  getBoards
} = require('../controllers/boards');

// model import

const router = express.Router();

router.route('/')
  .get(getBoards);

module.exports = router;

