const express = require('express');
// You will need `users-model.js` and `posts-model.js` both
const Posts = require('../posts/posts-model');
const Users = require('./users-model');

// The middleware functions also need to be required
const {
  logger,
  validateUserId,
  validateUser,
} = require('../middleware/middleware');

const router = express.Router();

router.use(logger);

router.get('/', (req, res, next) => { 
  Users.get(req.query)
   .then(users => {
     res.status(200).json(users);
   }) 
   .catch(next);
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/',validateUser, (req, res, next) => {
  Users.insert(req.user) 
  .then(user => {
    res.status(201).json(user);
  })
  .catch(next);
  
});

router.put('/:id', validateUserId,(req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next)
});

router.delete('/:id', validateUserId,(req, res, next) => {
  Users.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: 'The user removed' });
  })
  .catch(next);
});

router.get('/:id/posts', validateUserId,(req, res, next) => {
  Posts.get(req.params.id)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(next);
});

router.post('/:id/posts', validateUserId,(req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  const postsInfo= { ...req.body, user_id: req.params.id };

  Posts.insert(postsInfo)
    .then(posts => {
      res.status(210).json(posts);
    })
    .catch(next)
});

// do not forget to export the router
module.exports = router;