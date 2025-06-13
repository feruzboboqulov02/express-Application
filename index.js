import express from 'express';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';
import {engine} from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/',(req,res)=>{
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('index');
})
app.get('/about',(req,res)=>{
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('about');
})

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

