import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
dotenv.config();


mongoose.connect(process.env.MONGO_ESTATE)
.then(() => {
    console.log('Mongodb is conected');
}).catch((err) => {
    console.log(err);
}); 

const app = express()


app.listen(3000, () => {
    console.log('server is running we did it!!!')
});

app.use('/Api/user', userRouter)