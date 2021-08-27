const UserModel = require('../models/user.model')
const Bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const nodemailer = require('nodemailer'); 


const signUp = async(req,res)=>{

    try
    {
        const Salt = await Bcrypt.genSalt(10);                          // generates a key ro encrypt
        const HashPW = await Bcrypt.hash(req.body.password, Salt);      // encrypts the input pw using above salt(key)

        const user= new UserModel({
            NAME: req.body.name,
            EMAIL:req.body.email,
            PASSWORD: HashPW,
            CONTACT_DETAILS: [{Phone: req.body.phone, Address : req.body.address}]
        })
        await user.save()
        let mailer = await nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        let mailOptions ={
            from:"ecommerce system",
            to:req.body.email,
            subject:"Welcome to stalkNbuy",
            text:"Hi "  + req.body.name +",\n\n Welcome to stalkNbuy"
        }
        mailer.sendMail(mailOptions)
        .then((result)=>{
            console.log("email send")
        })
        .catch((err)=>{
            console.log(err)
        })
        res.status(200).json({message:"signUp successfully"})
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json({message:"signUp error"})
    }
}

const login = async(req,res)=>
{
    try
    {
        const user = await UserModel.find({EMAIL: req.body.email})
        console.log(user);
        
        if(user)
        {
            console.log(req.body.password, user[0].PASSWORD)
            const ValidPW = await Bcrypt.compare(req.body.password, user[0].PASSWORD);
            if(ValidPW)
            {
                const token = await JWT.sign({_id: user[0]._id},process.env.PRIVATE_KEY,{expiresIn:'24h'})
                res.status(200).json({message:"Logged in successfully", myToken:token});
            }
            else
            {
                res.status(400).json({message:"Incorrect Password"});
            }
        }
        else
        {
            
            res.status(400).json({message:"user not found"})
        }
       
    }
    catch(err)
    {
        console.log(err);
        res.status(400).json({message:"login error"});
    }
}

const addNewAddress = async(req,res)=>
{
    let userId = req.query.id;
    try
    {
        console.log('reqbody-->',req.body, userId);

        await UserModel.findByIdAndUpdate({_id : userId}, {$set:{CONTACT_DETAILS: req.body}})
        res.status(200).json({message:"Added to wishlist"});
    }
    catch(err)
    {
        res.status(400).json({message:"there is an error"});
        
    }
}
const verifyToken =async(req,res)=>{
    const token = req.query.token
    if(!token)
    {
        return res.status(400).json({message:"Access deined"})
    }
    try
    {
        const verify =JWT.verify(token,process.env.PRIVATE_KEY)
        const user = await UserModel.find({_id:verify._id})
        console.log(user)
        res.status(200).json({user:user})

    }
    catch(err)
    {
        res.status(400).json({message:"token expired"})
    }
}
const getOtp= async(req,res)=>{
    const otp =Math.floor(100000+Math.random()*900000)
    try{
        const salt= await Bcrypt.genSalt(10)
        const hashotp= await Bcrypt.hash(otp.toString(),salt)
        const user=await UserModel.findOneAndUpdate({EMAIL:req.body.email},{$set:{OTP:hashotp}})
        let mailer = await nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        let mailOptions ={
            from:"ecommerce system",
            to:req.body.email,
            subject:"Welcome to stalkNbuy",
            text:"Your OTP is "+ otp
        }
        mailer.sendMail(mailOptions)
        .then((result)=>{
            console.log("email send")
        })
        .catch((err)=>{
            console.log(err)
        })
        res.status(200).json({message:"Otp Sent"})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"Otp Failed"})

    }

}
  const verifyotp= async(req,res)=>{
      try{
       const user= await UserModel.find({EMAIL:req.body.email})
       console.log(req.body.otp,user[0].OTP)
       const verify=await Bcrypt.compare(req.body.otp.toString(),user[0].OTP)
       
       if(verify){
           res.status(200).json({message:"Verified"})
       }
       else{
           res.status(400).json({message:"Not Verified"})
       }
      }
      catch(err){
          console.log(err)
          res.status(400).json({message:"Not Verified"})
      }
  }

  const resetPass = async(req,res) =>
  {
        try
        {
            const user = await UserModel.find({EMAIL: req.body.email});
            if(user)
            {
                console.log(req.body.nPassword);
                const Salt = await Bcrypt.genSalt(10);
                const newPass = await Bcrypt.hash(req.body.nPassword, Salt);
                await UserModel.findOneAndUpdate({EMAIL:req.body.email},{$set:{PASSWORD:newPass}})
                
                let mailer = await nodemailer.createTransport({
                    service:"gmail",
                    auth:{
                        user:process.env.EMAIL,
                        pass:process.env.PASSWORD
                    }
                })
                let mailOptions ={
                    from:"stalkNbuy",
                    to:req.body.email,
                    subject:"Successful Reset",
                    text:"Your password is reset successfully"
                }
                mailer.sendMail(mailOptions)
                .then((result)=>{
                    console.log("email send")
                })
                .catch((err)=>{
                    console.log(err)
                })
                res.status(200).json({message:"password reset successfully"})
            }
            else
            {
                res.status(400).json({message: "User does not exist"});
            }
            
        }
        catch(err)
        {
            res.status(400).json({message: "error occured"})
        }
  }

  const updateWishlist = async(req, res)=>
  {
        let userId = req.query.id;
        try
        {
            await UserModel.findByIdAndUpdate({_id : userId}, {$set:{WISHLIST: req.body}})
            res.status(200).json({message:"Added to wishlist"});
        }
        catch(err)
        {
            res.status(400).json({message:"there is an error"});
            
        }
  }

  const updateCart = async(req,res)=>
  {
    let userId = req.query.id;
    try
    {
        await UserModel.findByIdAndUpdate({_id : userId}, {$set:{CART: req.body}})
        res.status(200).json({message:"Added to cart"});
    }
    catch(err)
    {
        res.status(400).json({message:"there is an error"});
        
    }
  }
module.exports = {signUp, login,verifyToken,getOtp,verifyotp, resetPass, updateWishlist, updateCart, addNewAddress};