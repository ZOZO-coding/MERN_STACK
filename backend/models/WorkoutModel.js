const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// define our Schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true})

// make a model based on the schema, we can then use the model to interact with the collection in the database
module.exports = mongoose.model('Workout', workoutSchema);