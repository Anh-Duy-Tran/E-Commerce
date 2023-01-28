const User = require('../models/user');

const registerRouter = require('express').Router()

registerRouter.post('/', async (req, res) => {
  const data = req.body;

  const username = data.username;
  const password = data.password;
  const email = data.email;

  if (await User.findOne({username : username}) !== null) {
    return res.status(400).json({ error : "Username already exist."});
  }
  
  if (await User.findOne({email : email}) !== null) {
    return res.status(400).json({ error : "Email already exist."});
  }
  
  try {
    const newUser = new User({ username : username, password : password, email : email, cart : {} });
    await newUser.save();
    return res.status(201).json({ message : "New user created" });
  } catch (error) {
    return res.status(500).json({ error : error});
  }
})

module.exports = registerRouter