const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true
  },
  message: {
    type: String,
    required: [true, 'Message cannot be empty']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema); 