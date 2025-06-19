import {Router} from 'express';
import authMidlleware from '../middlewares/auth.js';
import userMiddleware from '../middlewares/user.js';
import Product from '../models/product.js';
 const router= Router();

router.get('/',async (req,res)=>{
    const products = await Product.find().lean()
    
    res.render('index',{
        title: 'Boom shop | Balu',
        products: products.reverse(),
        userID: req.userID ? req.userID.toString() : null,
    });
})
router.get('/add',authMidlleware,(req,res)=>{
    res.render('add',{
        title: 'Add Product',
        isAdd: true,
        errorAddProducts: req.flash('errorAddProducts'),
    });
})
router.get('/products',async (req,res)=>{
    const user= req.userID ? req.userID.toString() : null
    const myProducts= await Product.find({user: user}).lean();
    console.log(myProducts);
    
    res.render('products',{
        title: 'Products | Balu',
        isProducts: true,
        myProducts: myProducts,
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