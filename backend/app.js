require('dotenv').config();

const { connectDB, disconnectDB } = require('./models/db');
const express = require('express');
const cors = require('cors');

const loginRouter = require('./controllers/login');
const landingRouter = require('./controllers/landing');
const registerRouter = require('./controllers/register');
const productsRouter = require('./controllers/products');
const authenticateToken = require('./auth/auth');

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/landing', landingRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authenticateToken, (req, res) => {
  res.status(200).end();
})

module.exports = app;