const productsRouter = require('express').Router()
const mongoose = require('mongoose');

const authenticate = require('../auth/auth');

const Products = require('../models/product');

productsRouter.get('/', async (req, res) => {
  return res.json(await Products.find({}).exec());
})

productsRouter.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error : "Product not found."})
  }
  
  const product = await Products.findOne({ _id : req.params.id}).exec();
  

  return product === null 
    ? res.status(400).json({ error : "Product not found."})
    : res.status(200).json(product);
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

productsRouter.delete('/:id', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message : "Only admins are allowed to delete product."});
  }
  
  try {
    await Products.deleteOne({ _id : req.params.id });
    return res.status(204).json({ message : "Deleted product."})
  } catch (error) {
    return res.status(500).json({error : error});
  }
  
})



module.exports = productsRouter