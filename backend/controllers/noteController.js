const Note = require('../models/NoteModel')
const mongoose = require('mongoose');

// get all notes
const getNotes = async (req, res) => {
    const notes = await Note.find({}).sort({createdAt: -1})

    res.status(200).json(notes);
}

// get a single note
const getNote = async (req, res) => {
    const { id } = req.params;

    // check the validity of the id, so that mongoose doesn't throw any errors
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such note'})
    }

    const note = await Note.findById(id);

    if (!note) {
        return res.status(404).json({error: 'No such note!'})
    }

    res.status(200).json(note);
}

// get a note edit page
const getNoteEdit = async (req, res) => {
    const { id } = req.params;

    // check the validity of the id, so that mongoose doesn't throw any errors
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such note'})
    }

    const note = await Note.findById(id);

    if (!note) {
        return res.status(404).json({error: 'No such note!'})
    }

    res.status(200).json(note);
}

// create new note
const createNote = async (req, res) => {
    const {title, difficulty, link} = req.body;

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!difficulty) {
        emptyFields.push('difficulty')
    }
    if(!link) {
        emptyFields.push('link')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }

    // add doc to db
    try {
        // create a new note, .create() is asynchronous, so we need to change the callback function to async func
        const note = await Note.create({title, difficulty, link});
        // now we have the note object
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a note(find and delete)
const deleteNote = async (req, res) => {
    const { id } = req.params;

    // check the validity of the id, so that mongoose doesn't throw any errors
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such note'})
    }
    // in mongoose the id parameter is "_id"
    const note = await Note.findOneAndDelete({_id: id})

    if (!note) {
        return res.status(404).json({error: 'No such note!'})
    }

    res.status(200).json(note);
}

// update a note
const updateNote = async (req, res) => {
    const {id} = req.params;

    // check the validity of the id, so that mongoose doesn't throw any errors
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such note'})
    }
    // first argument the id, second argument is the object that represents the updates we want to make
    const note = await Note.findOneAndUpdate({_id: id}, {
        // spread the properties of the object "req.body"
        ...req.body
    })

    if (!note) {
        return res.status(404).json({error: 'No such note!'})
    }

    res.status(200).json(note);
}


module.exports = {
    createNote,
    getNotes,
    getNote,
    getNoteEdit,
    deleteNote,
    updateNote
}