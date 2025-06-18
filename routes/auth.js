import {Router} from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateJWTToken } from '../services/token.js';
import { re } from 'mathjs';

const router= Router();

router.get('/login',(req,res)=>{
    if(req.cookies.token) {
        res.redirect('/');
        return
    }
    res.render('login',{
        title: 'Login | Balu',
        isLogin: true,
        loginError: req.flash('loginError')
    });
})
router.get('/register',(req,res)=>{
    if(req.cookies.token) {
        res.redirect('/');
        return
    }
    res.render('register',{
        title: 'Register | Balu',
        isRegister: true,
        registerError: req.flash('registerError')
    });
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.redirect('/');
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
    const token = generateJWTToken(existUser._id);
    res.cookie('token', token, {httpOnly:true,secure:true,sameSite:'strict'});
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
    const token = generateJWTToken(user._id);
    res.cookie('token', token, {httpOnly:true,secure:true,sameSite:'strict'});
    console.log(token);
    

    
    res.redirect('/')
})

export default router;