const Note = require('../models/NoteModel')
const mongoose = require('mongoose');

// get all notes
const getNotes = async (req, res) => {
    // if you need to only show the notes created by one user
    // const user_id = req.user._id
    // then add "user_id" inside the curly braces

    // pagination:
    // the || is going to set the default page to page 0, the page query is from something like "localhost:3000/?page=1"
    // page * notesPerPage is going to be the number of notes skipped, where skip is a mongoose method, for example, if page is 1, we are going to skip 5 notes.
    const page = req.query.page || 1
    const searchTerm = req.query.searchTerm || ""
    const notesPerPage = 5

    let difficulty = req.query.difficulty || ''
    // const difficulties = ["Easy", "Medium", "Hard"]
    // difficulty === 'All' ? (difficulty = [...difficulties]) : (difficulty = req.query.difficulty)

    const regexQuery = {
        title: new RegExp(searchTerm, 'i'),
        difficulty: new RegExp(difficulty)
    }

    try {
        const total = await Note.countDocuments({})
        const notes = await Note.find(regexQuery)
            .limit(notesPerPage)
            .skip((page - 1) * notesPerPage)
            .sort({ createdAt: -1 })

        res.status(200).json({
            notes,
            totalPages: Math.ceil(total / notesPerPage)
        });

    } catch (error) {
        res.status(500).json({ error: 'Could not fetch notes' })
    }

}

// get a single note
const getNote = async (req, res) => {
    const { id } = req.params;

    // check the validity of the id, so that mongoose doesn't throw any errors
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such note' })
    }

    const note = await Note.findById(id);

    if (!note) {
        return res.status(404).json({ error: 'No such note!' })
    }

    res.status(200).json(note);
}

// get a note edit page
const getNoteEdit = async (req, res) => {
    const { id } = req.params;

    // check the validity of the id, so that mongoose doesn't throw any errors
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such note' })
    }

    const note = await Note.findById(id);

    if (!note) {
        return res.status(404).json({ error: 'No such note!' })
    }

    res.status(200).json(note);
}

// create new note
const createNote = async (req, res) => {
    const { title, difficulty, link, content } = req.body;

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!difficulty) {
        emptyFields.push('difficulty')
    }
    if (!link) {
        emptyFields.push('link')
    }
    // if(!content) {
    //     emptyFields.push('content')
    // }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db
    try {
        // from the requireAuth middleware, we attached user to req, and that user has a _id property, so we can use that property here to relate each note to a specific user
        // const user_id = req.user._id;
        // create a new note, .create() is asynchronous, so we need to change the callback function to async func
        const note = await Note.create({ title, difficulty, link, content });
        // now we have the note object
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a note(find and delete)
const deleteNote = async (req, res) => {
    const { id } = req.params;

    // check the validity of the id, so that mongoose doesn't throw any errors
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such note' })
    }
    // in mongoose the id parameter is "_id"
    const note = await Note.findOneAndDelete({ _id: id })

    if (!note) {
        return res.status(404).json({ error: 'No such note!' })
    }

    res.status(200).json(note);
}

// update a note
const updateNote = async (req, res) => {
    const { id } = req.params;

    // check the validity of the id, so that mongoose doesn't throw any errors
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such note' })
    }
    // first argument the id, second argument is the object that represents the updates we want to make
    const note = await Note.findOneAndUpdate({ _id: id }, {
        // spread the properties of the object "req.body"
        ...req.body
    })

    if (!note) {
        return res.status(404).json({ error: 'No such note!' })
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