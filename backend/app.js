require('dotenv').config();

const { connectDB, disconnectDB } = require('./models/db');
const express = require('express');
const cors = require('cors');

const loginRouter = require('./controllers/login');
const landingRouter = require('./controllers/landing');
const registerRouter = require('./controllers/register');
const productsRouter = require('./controllers/products');
const authRouter = require('./controllers/auth');
const storeRouter = require('./controllers/store');
const categoryRouter = require('./controllers/category');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/landing', landingRouter);
app.use('/api/products', productsRouter);
app.use('/api/store', storeRouter);
app.use('/api/category', categoryRouter);
app.use('/api/auth', authRouter);

module.exports = app;