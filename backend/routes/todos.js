const express = require('express');
const {
    getTodos,
    createTodo,
    deleteTodo
} = require('../controllers/todoController')

// require the authentication middleware 
const requireAuth = require ('../middleware/requireAuth')

const todoRouter = express.Router()

// fire the middleware function before all below routes, we want to "protect" these routes, this middleware is going to ensure that

// get all todos
todoRouter.get('/api/todos', getTodos)

// create a todo
todoRouter.post('/api/todos', createTodo)

// delete a todo
todoRouter.delete('/api/todos/:id', deleteTodo)

module.exports = todoRouter;