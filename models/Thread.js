const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a thread name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 charachters"]
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  }
}, { timestamps: true });

ThreadSchema.methods.addFirstMessage = async function (text) {
  const message = await this.model('Message').create({ text, thread: this._id });
  this.messages.push(message._id);
}

ThreadSchema.post('save', async function () {
  await this.model('Board').findByIdAndUpdate(this.board, {
    $addToSet: { threads: this._id }
  })
});

ThreadSchema.pre('remove', async function () {
  await this.model('Board').findByIdAndUpdate(this.board, {
    $pull: { threads: this._id }
  })
})

module.exports = mongoose.model('Thread', ThreadSchema);