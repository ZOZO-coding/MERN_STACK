const express = require('express');
const {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote
} = require('../controllers/noteController')

// create an instance of express Router class
const router = express.Router()

// GET all Notes
router.get('/api/notes', getNotes)

// GET a single Note
router.get('/api/notes/:id', getNote)

// POSt a new Note
router.post('/api/notes', createNote)

// DELETE a new Note
router.delete('/api/notes/:id', deleteNote)

// UPDATE a new Note
router.patch('/api/notes/:id', updateNote)


module.exports = router;