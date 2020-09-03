const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a thread name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 charachters"]
  },
  message: {
    type: String,
    required: true,
    maxlength: [10000, "Please add a short description"]
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
});

module.exports = mongoose.model('Thread', ThreadSchema);