const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts);
}

// get a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params;

    // check the validity of the id, so that mongoose doesn't throw any errors
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({error: 'No such workout!'})
    }

    res.status(200).json(workout);
}

// create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;
    // add doc to db
    try {
        // create a new workout, .create() is asynchronous, so we need to change the callback function to async func
        const workout = await Workout.create({title, load, reps});
        // now we have the workout object
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout(find and delete)
const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    // check the validity of the id, so that mongoose doesn't throw any errors
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    // in mongoose the id parameter is "_id"
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: 'No such workout!'})
    }

    res.status(200).json(workout);
}

// update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;

    // check the validity of the id, so that mongoose doesn't throw any errors
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    // first argument the id, second argument is the object that represents the updates we want to make
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        // spread the properties of the object "req.body"
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({error: 'No such workout!'})
    }

    res.status(200).json(workout);
}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}