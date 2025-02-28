const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  body: String
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)