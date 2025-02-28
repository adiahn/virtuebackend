const catchAsync = require("../utils/catchAsync");
const Post = require("../models/PostModel");
const AppError = require("../utils/appError");
const Comment = require("../models/CommentModel");

exports.createPost = catchAsync(async (req, res, next) => {
    const { title, content } = req.body;
    const user = req.user;

    if(!title || !content) {
        return next(new AppError('Please provide title and content!', 400));
    }

    const newPost = await Post.create({
        title,
        content,
        user
    })

    res.status(201).json({
        status: 'success',
        data: newPost
    })
})   

exports.getPosts = catchAsync(async (req, res, next) => {
    const posts = await Post.find();
    res.status(200).json({
        status: 'success',
        results: posts.length,
        data:posts
    })
})

exports.getPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if(!post) {
        return next(new AppError('No post found with that ID', 404));
    }  
    post.viewsCount++;
    await post.save();
    
    res.status(200).json({
        status: 'success',
        data: post
    })
})

exports.createComment = catchAsync(async (req, res, next) => {
    const { body } = req.body;
    const post = await Post.findById(req.params.id);
    if(!post) {
        return next(new AppError('No post found with that ID', 404));
    }
    const comment = await Comment.create({
        body,
        post
    })
    res.status(201).json({
        status: 'success',
        data: comment
    })
})

exports.likePost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if(!post) {
        return next(new AppError('No post found with that ID', 404));
    }
    post.likes.push(req.user.id);
    await post.save();
    res.status(200).json({
        status: 'success',
        data: post
    })
})