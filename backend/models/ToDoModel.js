const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// define our Schema
const todoSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    }
}, {timestamps: true})

// make a model based on the schema, we can then use the model to interact with the collection in the database
module.exports = mongoose.model('ToDo', todoSchema);