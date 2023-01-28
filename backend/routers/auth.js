const authRouter = require('express').Router();

const authenticateToken = require('../auth/auth');

authRouter.get('/', authenticateToken, (req, res) => {
  return res.status(200).end();
})

module.exports = authRouter;