const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

router
  .route('/')
  .get(messageController.getMessages)
  .post(messageController.createMessage);

router
  .route('/:id')
  .get(messageController.getMessage);

module.exports = router; 