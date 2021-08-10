const UserModel = require('../models/user.model')

const signUp = async(req,res)=>{

    try
    {
        const user= new UserModel({
            NAME: req.body.name,
            EMAIL:req.body.email,
            PASSWORD:req.body.password
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