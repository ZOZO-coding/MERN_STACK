const express = require('express');

// controller functions
const { signupUser, loginUser } = require('../controllers/userController')

const userRouter = express.Router();

// login route
userRouter.post('/api/user/login', loginUser)

// signup route
userRouter.post('/api/user/signup', signupUser)

module.exports = userRouter