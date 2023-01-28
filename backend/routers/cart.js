const cartRouter = require('express').Router();

const Users = require('../models/user');

const authenticate = require('../auth/auth');

cartRouter.get('/', authenticate, async (req, res) => {
  const user = await Users.findOne({ username : req.user.username})
  return user === null 
    ? res.status(400).json({error : "Cannot fetch the user cart"})
    : res.status(200).json(user.cart)
})

cartRouter.post('/', authenticate, async(req, res) => {
  const { key, value } = req.body;
  console.log(key, value);

  try {
    const user = await Users.findOne({ username: req.user.username });
    user.set({'cart': {...user.cart, [key]: value}});
    user.save();
    return res.status(200).json({message : `Added`})
  } catch(err) {
    return res.status(400).json({error : err});
  }
  
})

module.exports = cartRouter