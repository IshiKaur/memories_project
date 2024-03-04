import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());
app.use('/posts', postRoutes); //adds a prefix /posts for all routes
app.use('/user', userRoutes)

// const CONNECTION_URL = 'mongodb+srv://javascriptapplications:javascriptapplications123@cluster0.jgauidh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true})
    .then(()=>{
        app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`))
    })
    .catch((error)=> {
        console.log(error);
    });
