const express = require('express');
const {
  getThreads
} = require('../controllers/threads');


const router = express.Router({ mergeParams: true });
// const router = express.Router();

router.route('/')
  .get(getThreads);

module.exports = router;