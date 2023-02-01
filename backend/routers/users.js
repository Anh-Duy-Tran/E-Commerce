const usersRouter = require('express').Router()

const authenticate = require('../auth/auth');

const Users = require('../models/user');

const ROLES = ['customer', 'admin'];

usersRouter.get('/all', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message : "Only admins are allowed to view all users."});
  }

  return res.status(200).json(await Users.find({}));
})

usersRouter.post('/role/:id', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message : "Only admins are allowed to update users' role."});
  }

  const userId = req.params.id;
  const newRole = req.body.role;

  const user = await Users.findOne({ _id : userId}).exec();

  if (user === null) return res.status(400).json({ message : "Target user not found. "});

  if (!ROLES.includes(newRole)) {
    return res.status(400).json({message : 'Role is not valid'});
  }

  try {
    user.role = newRole;
    return responseUtils.sendJson(response, await user.save());
  } catch (error) {
    return responseUtils.badRequest(response);
  }
})

module.exports = usersRouter