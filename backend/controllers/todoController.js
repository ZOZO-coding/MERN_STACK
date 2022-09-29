const ToDo = require('../models/ToDoModel')
const mongoose = require('mongoose');

// get all comments
const getTodos = async (req, res) => {
    const todos = await ToDo.find({}).sort({createdAt: -1})

    res.status(200).json(todos);
}

// crete a comment
const createTodo = async (req, res) => {
    const { item, priority } = req.body;
    
    try {
        // create a new comment using async func
        const todo = await ToDo.create({item, priority});
        res.status(200).json(todo)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// delete a comment
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