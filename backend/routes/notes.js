const express = require('express');
const {
    createNote,
    getNotes,
    getNote,
    getNoteEdit,
    deleteNote,
    updateNote
} = require('../controllers/noteController')

// require the authentication middleware 
const requireAuth = require ('../middleware/requireAuth')

// create an instance of express Router class
const router = express.Router()

// fire the middleware function before all below routes, we want to "protect" these routes, this middleware is going to ensure that
// router.use(requireAuth)

// GET all Notes
router.get('/api/notes', getNotes)

// GET a single Note edit page
router.get('/api/notes/:id/edit', getNoteEdit)

// GET a single Note
router.get('/api/notes/:id', getNote)

// POSt a new Note
router.post('/api/notes', createNote)

// DELETE a new Note
router.delete('/api/notes/:id', deleteNote)

// UPDATE a new Note
router.patch('/api/notes/:id', updateNote)


module.exports = router;