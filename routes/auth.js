import {Router} from 'express';
const router= Router();

router.get('/login',(req,res)=>{
    res.render('login',{
        title: 'Login | Balu',
        isLogin: true
    });
})
router.get('/register',(req,res)=>{
    res.render('register',{
        title: 'Register | Balu',
        isRegister: true
    });
})

export default router;