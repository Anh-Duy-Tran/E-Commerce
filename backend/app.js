require('dotenv').config();

const { connectDB, disconnectDB } = require('./models/db');
const express = require('express');
const cors = require('cors');

const loginRouter = require('./routers/login');
const landingRouter = require('./routers/landing');
const registerRouter = require('./routers/register');
const productsRouter = require('./routers/products');
const authRouter = require('./routers/auth');
const storeRouter = require('./routers/store');
const categoryRouter = require('./routers/category');
const cartRouter = require('./routers/cart');
const authenticateToken = require('./auth/auth');

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
app.use('/api/cart', cartRouter);

module.exports = app;