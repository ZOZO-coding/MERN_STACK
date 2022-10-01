const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const requireAuth = async (req, res, next) => {

    // verify the user is authenticated
    const { authorization } = req.headers

    // console.log(req.headers)

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }
    // get the token from headers
    const token = authorization.split(' ')[1]
    // verify the token
    try {
        // grab the id from the payload
        const { _id } = jwt.verify(token, process.env.SECRET)

        // attaching user property to req object, get the user from db, only return the id
        req.user = await User.findOne({ _id }).select('_id')

        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth;