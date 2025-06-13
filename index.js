import express from 'express';
import {create} from 'express-handlebars';


const app = express();
const hbs = create({
    defaultLayout: 'main',
    extname: '.hbs',
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
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

