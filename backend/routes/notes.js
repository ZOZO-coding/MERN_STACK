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
router.get('/', getNotes)

// GET a single Note
router.get('/:id', getNote)

// POSt a new Note
router.post('/', createNote)

// DELETE a new Note
router.delete('/:id', deleteNote)

// UPDATE a new Note
router.patch('/:id', updateNote)


module.exports = router;