import {Router} from 'express';
import authMidlleware from '../middlewares/auth.js';
import userMiddleware from '../middlewares/user.js';
import Product from '../models/product.js';
 const router= Router();

router.get('/',async (req,res)=>{
    const products = await Product.find().lean()
    
    res.render('index',{
        title: 'Boom shop | Balu',
        
        products: products,
    });
})
router.get('/add',authMidlleware,(req,res)=>{
    res.render('add',{
        title: 'Add Product',
        isAdd: true,
        errorAddProducts: req.flash('errorAddProducts'),
    });
})
router.get('/products',(req,res)=>{
    res.render('products',{
        title: 'Products | Balu',
        isProducts: true,
        
    });
})
router.post('/add-products', userMiddleware, async(req,res,)=>{
    const {title, description, image, price} = req.body;
    if (!title || !description || !image || !price) {
        req.flash('errorAddProducts', 'All fields are required');
        res.redirect('/add');
        return;
    }
    console.log(req.userID);
    
    const products = await Product.create(req.body);
    console.log(products);
    res.redirect('/');


})

export default router;