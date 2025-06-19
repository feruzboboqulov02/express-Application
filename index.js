import express, { json } from 'express';
import {create} from 'express-handlebars';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import flash from 'connect-flash';
import session from 'express-session';
import varMiddleware from './middlewares/var.js';
import userMidlleware from './middlewares/user.js';
import cookieParser from 'cookie-parser';

import hbsHelper from './utils/index.js';
import AuthRoutes from './routes/auth.js';
import ProductRoutes from './routes/products.js';



dotenv.config();


const app = express();
const hbs = create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers:hbsHelper
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(flash());
app.use(session({secret: "Balu",resave:false,saveUninitialized:false}));
app.use(varMiddleware);
app.use(userMidlleware);


app.use(AuthRoutes);
app.use(ProductRoutes);
 

const PORT = process.env.PORT || 4100;
 const startApp = ()=>{
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).then(() => console.log('MongoDB connected'))
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});
    } catch (error) {
        console.log(error);
        
    }
 }

startApp();

//mongodb+srv://feruzjon:<db_password>@express.fybujwc.mongodb.net/?retryWrites=true&w=majority&appName=express