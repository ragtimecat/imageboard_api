const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a board name"],
    unique: true,
    trim: true,
    maxlength: [20, "name can not be more than 20 charachters"]
  },
  description: {
    type: String,
    required: true,
    maxlength: [40, "Please add a short description"]
  },
  threads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread'
  }]
});

module.exports = mongoose.model('Board', BoardSchema);