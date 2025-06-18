import {Router} from 'express';
import Product from '../models/product.js';
const router= Router();

router.get('/',(req,res)=>{
    res.render('index',{
        title: 'Boom shop | Balu',
        token:true,
    });
})
router.get('/add',(req,res)=>{
    res.render('add',{
        title: 'Add Product',
        isAdd: true
    });
})
router.get('/products',(req,res)=>{
    res.render('products',{
        title: 'Products | Balu',
        isProducts: true
    });
})
router.post('/add-products',async(req,res,)=>{
    console.log(req.body);
    
    const {title, description, image, price} = req.body;
    if(!title || !description || !image || !price){
        return res.status(400).send('All fields are required');
    }
    const products = await Product.create(req.body);
    console.log(products);
    
    res.redirect('/');
    
})

export default router;