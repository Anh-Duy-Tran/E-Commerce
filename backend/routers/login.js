require('dotenv').config();

const User = require('../models/user');

const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = await User.findOne({username : username});
  if (foundUser === null) {
    return res.status(401).json({error : "Username not found."});
  }
  
  if (! (await foundUser.checkPassword(password))) {
    return res.status(401).json({error : "Wrong password."});
  }

  const user = { username : username, role : foundUser.role }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json(accessToken);
})

module.exports = loginRouter