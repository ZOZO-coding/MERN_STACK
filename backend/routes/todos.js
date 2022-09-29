const express = require('express');
const {
    getTodos,
    createTodo,
    deleteTodo
} = require('../controllers/todoController')

const todoRouter = express.Router()

// get all todos
todoRouter.get('/api/todos', getTodos)

// create a todo
todoRouter.post('/api/todos', createTodo)

// delete a todo
todoRouter.delete('/api/todos/:id', deleteTodo)

module.exports = todoRouter;