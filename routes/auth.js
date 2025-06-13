import {Router} from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
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
router.post('/login',async (req,res)=>{
    const existUser = await User.findOne({email: req.body.email});
    if (!existUser) {
        return res.status(400).send('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(req.body.password, existUser.password);
    if (!isMatch) {
        return res.status(400).send('Invalid email or password');
    }
    res.redirect('/')
})
router.post('/register', async(req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData= {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    }
    const user = await User.create(userData);
    console.log('User created:', user);

    
    res.redirect('/')
})

export default router;