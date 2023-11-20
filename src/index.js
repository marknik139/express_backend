import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './auth/authRouter.js';
import userRouter from './users/userRouter.js';
import config from './config.js';

dotenv.config();

const { connectionString } = config;
// eslint-disable-next-line
const PORT = process.env.PORT || 3228;

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', userRouter);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

const start = async () => {
    try {
        await mongoose.connect(connectionString);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
};

await start();