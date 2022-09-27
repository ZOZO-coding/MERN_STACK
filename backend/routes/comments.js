const express = require('express');
const {
    getComments,
    createComment,
    deleteComment
} = require('../controllers/commentController')

const commentRouter = express.Router()

// get all comments
commentRouter.get('/api/comments', getComments)

// create a comment
commentRouter.post('/api/comments', createComment)

// delete a comment
commentRouter.delete('/api/comments/:id', deleteComment)

module.exports = commentRouter;