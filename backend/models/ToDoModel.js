const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// define our Schema
const todoSchema = new Schema({
    item: String, 
    isComplete: {
        type: Boolean,
        default: true
    },
    priority: String
}, {timestamps: true})

// make a model based on the schema, we can then use the model to interact with the collection in the database
module.exports = mongoose.model('ToDo', todoSchema);