import {Router} from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router= Router();

router.get('/login',(req,res)=>{
    res.render('login',{
        title: 'Login | Balu',
        isLogin: true,
        loginError: req.flash('loginError')
    });
})
router.get('/register',(req,res)=>{
    res.render('register',{
        title: 'Register | Balu',
        isRegister: true,
        registerError: req.flash('registerError')
    });
})
router.post('/login',async (req,res)=>{
    const {email, password} = req.body;
    if (!email || !password) {
        req.flash('loginError', 'All fields are required');
        res.redirect('/login');
        return;
    }
    const existUser = await User.findOne({email: email});
    if (!existUser) {
        req.flash('loginError', 'User not found');
        res.redirect('/login');
        return;
    }
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
        req.flash('loginError', 'Password is incorrect');
        res.redirect('/login');
        return;
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
    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
        req.flash('registerError', 'All fields are required');
        res.redirect('/register');
        return;
    }
    const candidate = await User.findOne({email: userData.email});
    if (candidate) {
        req.flash('registerError', 'User with this email already exists');
        res.redirect('/register');
        return;
    }
    const user = await User.create(userData);
    console.log('User created:', user);

    
    res.redirect('/')
})

export default router;