const landingRouter = require('express').Router()
const category = require('../static/category.json')


landingRouter.get('/', (request, response) => {
  response.json(category);
})

module.exports = landingRouter