import {Router} from 'express';
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

export default router;