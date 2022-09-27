const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// define our Schema
const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, {timestamps: true})

// make a model based on the schema, we can then use the model to interact with the collection in the database
module.exports = mongoose.model('Note', noteSchema);