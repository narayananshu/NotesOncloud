const express = require('express');
const User = require('../models/User');
const router= express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fetchuser = require('../middleware/Getuser');
const JWT_SECRET ='Anshuiscute' 
router.post('/createuser',[
    body('name').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
]
,  async (req, res)=>{

    // check if errors exist send bad request
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            erorr: error.array()
        })
    }

// check whether user already exist or not 
let user =  await User.findOne({email:req.body.email})

if (user){
    
    return res.status(400).json({error: 'Sorry a user with same email already exists'})
}
const salt= await bcrypt.genSalt(10);
const secPass=await bcrypt.hash(req.body.password, salt);
try{
    user= await  User.create({
        name :req.body.name,
        email:req.body.email,
        password :secPass,
    })
  
    res.json(user)
}
catch(error){
    console.error(error.message)
    res.status(500).send('some error occured')
}
   
   
    
 
})
// authorization of credentials 

router.post('/loginauth',[
    
    body('email',"Email doesn't match").isEmail(),
    body('password',"password doesn't match").exists()

],async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            erorr: error.array()
        })
    }
const {email,password}= req.body;
try{

const user  = await User.findOne({email});

if(!user){
    return res.status(400).json({error:"please enter correct credentials"})
}
const passwordCompare = await bcrypt.compare(password, user.password)
if(!passwordCompare)
{
    return res.status(400).json({error:"please enter correct credentials"})
}
const data={
    user:{
        id : user.id
    }
}
const authtoken =jwt.sign(data, JWT_SECRET );
res.json(authtoken);
}
catch(error){
    console.error(error.message)
    res.status(500).send('Internal server error')
}

})
// Router to get the id of the user 
router.post('/getuser', fetchuser,
async (req,res)=>{
  
    try{
        const userId = await req.user.id;
const user = await User.findById(userId).select("-password")

res.send(user);

    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send('Internal Error')
    }

})
module.exports= router