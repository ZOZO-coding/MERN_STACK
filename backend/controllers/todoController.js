const ToDo = require('../models/ToDoModel')
const mongoose = require('mongoose');

// get all todos
const getTodos = async (req, res) => {
    const user_id = req.user._id

    const todos = await ToDo.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(todos);
}

// crete a todo item
const createTodo = async (req, res) => {
    const { item, priority } = req.body;
    
    try {
        // req.user_id is from the auth middleware
        const user_id = req.user._id
        // create a new todo using async func
        const todo = await ToDo.create({item, priority, user_id});
        res.status(200).json(todo)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// delete a todo item
const deleteTodo = async(req, res) => {
    const { id } = req.params;

    // check the validity of the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such Todo item'})
    }
    
    const todo = await ToDo.findOneAndDelete({_id: id})

    if (!todo) {
        return res.status(404).json({error: 'No such Todo item!'})
    }

    res.status(200).json(todo)
}

module.exports = {
    getTodos,
    createTodo,
    deleteTodo
}