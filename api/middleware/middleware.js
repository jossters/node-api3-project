const User = require('../users/users-model');


function logger(req, res, next) {
  const datetime = new Date();
  const formatted_date =
    datetime.getFullYear() +
    "-" +
    (datetime.getMonth() + 1) +
    "-" +
    datetime.getDate() +
    " " +
    datetime.getHours() +
    ":" +
    datetime.getMinutes() +
    ":" +
    datetime.getSeconds();
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  let log = `[${formatted_date}] [${method}]:${url} ${status}`;
  console.log('Logger',log);
  next();
}

function validateUserId(req, res, next) {
  User.getById(req.params.id)
  .then(user => {
    if (!user) {
      res.status(404).json({
        message: "user not found"
      })
    } else {
      req.user = user
      next()
    }
  })
  .catch(next)
}

function validateUser(req, res, next) {
  const {name} = req.body
  if (!name ||
  typeof name !== "string" ||
  name.trim().length <= 2
){
  next({
    message: "missing required name field",
    status: 400,
  })
} else {
  req.user = { name: req.body.name.trim() }
  next()
}
}

function validatePost(req, res, next) {
  const {title} = req.body
  if (!title ||
  typeof title !== "string" ||
  title.trim().length <= 2
){
  next({
    message: "missing required text field",
    status: 400,
  })
} else {
  req.post = { name: req.body.title.trim() }
  next()
}
}

// do not forget to expose these functions to other modules
module.exports = {
  validatePost,
  validateUser,
  validateUserId,
  logger,
}