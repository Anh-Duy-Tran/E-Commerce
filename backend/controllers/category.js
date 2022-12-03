const categoryRouter = require('express').Router();

const categories = require('../static/category.json').map(category => ({ ...category }));

categoryRouter.get('/', async (req, res) => {
  return res.json(categories);
});

module.exports = categoryRouter;