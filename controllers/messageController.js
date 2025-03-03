const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createMessage = catchAsync(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new AppError('Please provide name, email and message', 400));
  }

  const newMessage = await Message.create({
    name,
    email,
    message
  });

  res.status(201).json({
    status: 'success',
    data: newMessage
  });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  
  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: messages
  });
});

exports.getMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findById(req.params.id);
  
  if (!message) {
    return next(new AppError('No message found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: message
  });
}); 