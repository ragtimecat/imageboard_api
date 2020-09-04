const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: [true, 'Please enter a login'],
    minlength: [5, 'Minimal length is 5 chars']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [5, 'Minimal length is 5 chars'],
    select: false
  },
  role: {
    type: String,
    enum: ['moderator', 'admin'],
    default: 'moderator'
  },
  name: {
    type: String
  },
  surname: {
    type: String
  },
  fullName: {
    type: String
  }
}, { timestamps: true });

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.pre('save', function () {
  if (!this.name && this.surname) {
    this.fullName = this.surname;
  } else if (this.name && !this.surname) {
    this.fullName = this.name;
  } else if (this.name && this.surname) {
    this.fullName = `${this.name} ${this.surname}`;
  }
})

// UserSchema.methods.addFirstMessage = async function (text) {
//   const message = await this.model('Message').create({ text, thread: this._id });
//   this.messages.push(message._id);
// }

// UserSchema.post('save', async function () {
//   await this.model('Board').findByIdAndUpdate(this.board, {
//     $addToSet: { threads: this._id }
//   })
// });

// UserSchema.pre('remove', async function () {
//   await this.model('Board').findByIdAndUpdate(this.board, {
//     $pull: { threads: this._id }
//   })
// })

module.exports = mongoose.model('User', UserSchema);