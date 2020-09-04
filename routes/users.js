const express = require('express');
const {
  getUsers,
  // getUser,
  // createUser,
  // updateUser,
  // deleteUser
} = require('../controllers/users');

const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(createUser);

// router.route('/:id')
//   .get(getThread)
//   .put(updateThread)
//   .delete(deleteThread);

module.exports = router;