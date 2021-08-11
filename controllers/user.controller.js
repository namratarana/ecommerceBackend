const UserModel = require('../models/user.model')
const Bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const signUp = async(req,res)=>{

    try
    {
        const Salt = await Bcrypt.genSalt(10);                          // generates a key ro encrypt
        const HashPW = await Bcrypt.hash(req.body.password, Salt);      // encrypts the input pw using above salt(key)

        const user= new UserModel({
            NAME: req.body.name,
            EMAIL:req.body.email,
            PASSWORD: HashPW
        })
        await user.save()
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
                const token = await JWT.sign({Id: user._id},process.env.PRIVATE_KEY,{expiresIn:'24h'})
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

module.exports = {signUp, login};