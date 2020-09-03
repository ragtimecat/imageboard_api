const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add message text'],
    maxlength: [10000, 'Message cannot be more than 10000 chars'],
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread"
  },
  picture_paths: [{
    type: String
  }],
  outgoingReplies: [{
    type: String
  }],
  incomingReplies: [{
    type: String
  }]
}, { timestamps: true });

MessageSchema.post('save', async function () {
  await this.model('Thread').findByIdAndUpdate(this.thread, {
    $addToSet: { messages: this._id }
  })
});

MessageSchema.pre('remove', async function () {
  await this.model('Thread').findByIdAndUpdate(this.thread, {
    $pull: { messages: this._id }
  })
});

module.exports = mongoose.model('Message', MessageSchema);