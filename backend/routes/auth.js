const express = require('express')
const  { body, validationResult } = require('express-validator') ;
const  User = require('../models/User') ;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');

const router = express.Router()

router.post('/register', 
[body('email','Please enter valid email ').isEmail(),
body('password','Password should be atleast 8 character').isLength({ min: 8 })] 
,
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user = await  User.findOne({email: req.body.email})
        if(user){
            res.status(400).json({message:'Email Already Exist'})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            phone: req.body.phone
        })
        const data = {
            user:{

                id: user.id
            }
        }
        const authtoken = jwt.sign(data,"my-secret-key")
        res.json({authtoken})

    }catch{
        res.status(500).json({message: "internal server error"})
    }

})

router.post('/login', async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try{

        let user = await User.findOne({email})
        if(!user){
            success = false
            return res.status(400).json({message: 'Please enter the valid credentials '})
        }
        const passwordCompare = await bcrypt.compare(password, user.password )
        if(!passwordCompare){
            success = false
            return res.status(400).json({success,message: 'Please enter the valid credentials '})
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,"my-secret-key")
        success = true;
            res.json({success, authtoken})
    }catch{
        res.status(500).json({message: "internal server error"})
    }

})

router.post('/getuser',authentication, async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{

        userId = req.user.id
        const user = await User.findById(userId).select('-password');
        res.json({user})
    }catch{
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router