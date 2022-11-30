import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();


const mongoUrl = 'mongodb://localhost/bloglist';
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

export default app;