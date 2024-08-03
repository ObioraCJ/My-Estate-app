import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();


mongoose.connect(process.env.MONGO_ESTATE)
.then(() => {
    console.log('Mongodb is conected');
}).catch((err) => {
    console.log(err);
}); 

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
    console.log('server is running we did it!!!')
});

app.use('/Api/user', userRouter);
app.use('/Api/auth', authRouter);
app.use('/Api/listing', listingRouter); 

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})