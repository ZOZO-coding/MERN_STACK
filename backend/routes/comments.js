const express = require('express');
const {
    getComments,
    createComment,
    deleteComment
} = require('../controllers/commentController')

// require the authentication middleware 
const requireAuth = require ('../middleware/requireAuth')

const commentRouter = express.Router()

// fire the middleware function before all below routes, we want to "protect" these routes, this middleware is going to ensure that
// commentRouter.use(requireAuth)

// get all comments
commentRouter.get('/api/comments', getComments)

// create a comment
commentRouter.post('/api/comments', createComment)

// delete a comment
commentRouter.delete('/api/comments/:id', deleteComment)

module.exports = commentRouter;