const express = require('express');
// You will need `users-model.js` and `posts-model.js` both
const Posts = require('../posts/posts-model');
const Users = require('./users-model');

// The middleware functions also need to be required
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
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
  Users.insert({name: req.name}) //(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(next);
  
});

router.put('/:id', validateUserId, validateUser,(req, res, next) => {
  Users.update(req.params.id, {name: req.name})
    .then(() => {
      return Users.getById(req.params.id)
      c
    })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId,(req, res, next) => {
  Users.remove(req.params.id)
  .then(() => {
    res.status(200).json(req.user);
  })
  .catch(next);
});

router.get('/:id/posts', validateUserId,(req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(next);
});
//☝️☝️☝️☝️☝️☝️☝️☝️☝️☝️☝️☝️
// try{
//  const result = await Users.getUserPosts(req.params.id)
//  res.json(result)
// } catch (err) {
//   next(err)
// }

router.post('/:id/posts', validateUserId, validatePost,(req, res, next) => {
  const postsInfo= { ...req.body, user_id: req.params.id };

  Posts.insert(postsInfo)
    .then(posts => {
      res.status(201).json(posts);
    })
    .catch(next)
});

// do not forget to export the router
module.exports = router;