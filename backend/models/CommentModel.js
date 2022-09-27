const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// define our Schema
const commentSchema = new Schema({
    body: String, 
    username: String
}, {timestamps: true})

// make a model based on the schema, we can then use the model to interact with the collection in the database
module.exports = mongoose.model('Comment', commentSchema);