const storeRouter = require('express').Router();

const Products = require('../models/product');

const allowedStores = ['all', 'men', 'women', 'shirt', 'trouser'];

storeRouter.get('/:id', async (req, res) => {
  return res.json(await Products.find({ type : req.params.id}));
});

storeRouter.get('/:id1/:id2', async (req, res) => {
  return res
    .json(
      await Products.find({ type : { $all : [req.params.id1, req.params.id2] } })
    );
})

module.exports = storeRouter;