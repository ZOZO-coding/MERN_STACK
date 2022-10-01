const User = require('../models/UserModel')
// the jsonwebtoken package is going to create a JWT token when the server receives signup/login information, and send the token back to the front end, when user is logging in, the front end is going to send the decoded token to the server to verify
const jwt = require('jsonwebtoken');

// this function is going to return the token
const createToken = (_id) => {
    // second argument is the "secret(check the docs if you forgot what secret it is)", we store it in the enviroment file
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => { 
    const { email, password } = req.body;
    console.log(req.headers);
    try {
        const user = await User.login(email, password)
        
        // create a token for that user
        const token = createToken(user._id)
        
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
 
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // create the user with the static signup method defined in the User model
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message}) // why message, because error is an object, it has a message property
    }

}

module.exports = {signupUser, loginUser}