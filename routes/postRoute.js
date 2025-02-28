const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

router
    .route('/')
    .get(PostController.getPosts)
    .post(PostController.createPost)

router
    .route('/:id')
    .get(PostController.getPost)

router.post('/:id/comment', PostController.createComment)
router.post('/:id/like', PostController.likePost)

module.exports = router;