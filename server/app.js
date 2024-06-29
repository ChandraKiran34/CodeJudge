import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import morgan from 'morgan';

const app = express();
import errorMiddleware from './middleware/error.middleware.js'

// importing routes 
import authRoutes from './routes/authRoutes.js';

// Middlewares
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'))

// server status checking route

app.get('/ping', (req,res) =>{
    res.send('Pong');
})

// Routes
app.use('/auth',authRoutes);


app.all('*', (req, res) => {
    res.status(404).send('OOPS!!! 404 Page Not Found');
  });


app.use(errorMiddleware);


export default app;