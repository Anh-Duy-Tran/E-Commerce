const productsRouter = require('express').Router()

const authenticate = require('../auth/auth');

const Products = require('../models/product');

productsRouter.get('/', async (req, res) => {
  res.json(await Products.find({}));
})

productsRouter.post('/', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message : "Only admins are allowed to add product."});
  }

  try {
    const newProduct = new Products({...req.body});
    await newProduct.save();
    return res.status(201).json({ message : "New product created" });
  } catch (error) {
    return res.status(500).json({error : error});
  }
})



module.exports = productsRouter