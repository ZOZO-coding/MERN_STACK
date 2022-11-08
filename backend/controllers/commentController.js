const Comment = require('../models/CommentModel')
const mongoose = require('mongoose');

// get all comments
const getComments = async (req, res) => {
    const page = req.query.page || 1
    const commentsPerPage = 10;
    try {
        const total = await Comment.countDocuments({})

        const comments = await Comment.find({})
            .limit(commentsPerPage)
            .skip((page - 1) * commentsPerPage)
            .sort({ createdAt: -1 })

        res.status(200).json({
            comments,
            totalPages: Math.ceil(total / commentsPerPage)
        });
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch comments' })
    }

}

// crete a comment
const createComment = async (req, res) => {
    const { body, username } = req.body;

    try {
        // create a new comment using async func
        const comment = await Comment.create({ body, username });
        res.status(200).json(comment)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a comment
const deleteComment = async (req, res) => {
    const { id } = req.params;

    // check the validity of the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such comment' })
    }

    const comment = await Comment.findOneAndDelete({ _id: id })

    if (!comment) {
        return res.status(404).json({ error: 'No such comment!' })
    }

    res.status(200).json(comment)
}

module.exports = {
    getComments,
    createComment,
    deleteComment
}