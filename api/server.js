const express = require('express');
// const cors = require('cors')
const usersRouter = require('../api/users/users-router')

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "Error!!!!!",
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server;
