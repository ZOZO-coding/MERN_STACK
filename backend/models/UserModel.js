const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// the validator npm package is going to validate the email and password before it get hashed and submitted
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true // avoid duplicate signup
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true})

// create a static method: signup of the User model (not instance method, need to find the difference!)
userSchema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    // validator.isEmail() is going to return boolean value of whether the email is valid
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    //
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    // check if the email already exists
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    // hash the password, using the npm package "bcrypt", bcrypt adds a "salt" which is a random string to the password before it gets hashed
    // generate a salt
    const salt = await bcrypt.genSalt(10) // default value 10, higher the value, longer time for hacker to crack and for users to sign up
    const hash = await bcrypt.hash(password, salt)

    // store the doc(user email and the hashed password) in db
    const user = await this.create({ email, password: hash})

    return user 
}

// create a static method for log in
userSchema.statics.login = async function(email, password) {
    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    // find the user
    const user = await this.findOne({ email })

    // if we cant find the user with that email
    if (!user) {
        throw Error('Incorrect email')
    }

    // compare the password with the hashed version, 1st argument is the input password, 2nd argument is the hashed version stored in user, this method is going to return boolean
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    // if both email and password match
    return user
}

module.exports = mongoose.model('User', userSchema);