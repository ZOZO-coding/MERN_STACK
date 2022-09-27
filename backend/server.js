require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
// require the note, comment routes from the routes folder
const noteRoutes = require('./routes/notes');
const commentRoutes = require('./routes/comments');

// express app
const app = express();

// middleware
// for any incoming request, below middleware will look at the data, parse the data and attach to the req object, like "req.body", similar middleware like express.urlencoded
app.use(express.json())

// logger middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
// when we fire a request of this specific route, then use the routes in noteRoutes
app.use('/', noteRoutes)
app.use('/', commentRoutes)

// connect to DB, connect() returns a Promise
mongoose.connect(process.env.MONG_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        // listen for request, better to save port number to environment variable, which need a npm package "dotenv", which loads environment variables from a .env file into the process.env object
        app.listen(process.env.PORT, () => {
        console.log('connected to db & listening to port ' + process.env.PORT);
        })
    })
    .catch(err => {
        console.log(err)
    })

