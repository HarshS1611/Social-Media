import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postsRouter from './routes/posts.js';
import usersRouter from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.get('/', (req, res) => {
    res.send('THIS IS THE BUCKET LIST API WEBPAGE');
});
app.use('/posts', postsRouter);
app.use('/user', usersRouter);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

mongoose.set('useFindAndModify', false);
