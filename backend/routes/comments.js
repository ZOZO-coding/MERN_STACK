const express = require('express');
const {
    getComments,
    createComment,
    deleteComment
} = require('../controllers/commentController')

const commentRouter = express.Router()

// get all comments
commentRouter.get('/', getComments)

// create a comment
commentRouter.post('/', createComment)

// delete a comment
commentRouter.delete('/:id', deleteComment)

module.exports = commentRouter;