const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require("../Models/User.model");

const userRouter = express.Router();

userRouter.get(`/`, async(req, res) =>{
    try{
        const user = await userModel.find();
        res.send(user)

    }
    catch(err){
        res.status(500).send({Error: "Something went wrong"})
    }
    res.send("signup sucessfully done")
}); 

userRouter.post(`/signup`, async (req, res) =>{
    try{
        const {email, password} = req.body;

        bcrypt.hash(password, 4, async function(err, hash) {
            const users = await userModel.find({email:email})
            if(users.length > 0)
            {
                res.send("email already exists")
            }
            else{
                
                if(hash){
                    const user = new userModel({email,password:hash});
                    await user.save();
                    res.send("signup sucessfully done")
                }
                
            }
        });
        
            
        }
    
    catch(err){
        res.status(400).send("Singup Failed : error detected")

    }
}); 

userRouter.post(`/login`, async(req, res) =>{

    try {
        const{email,password} = req.body;
        const userEmail = await userModel.find({email})
        
        if(userEmail.length > 0)
        {
                bcrypt.compare(password, userEmail[0].password, async function(err, result) {
                    
                    if(result)
                    {
                        var token = jwt.sign({userID:userEmail[0]._id }, 'anand');
                        res.send({msg:`login done`,token: token})
                    }
                    else{
                        res.send({msg:`login failed`})
                    }
                });
            }
        
            
    } 
    catch (error) {
        res.status(400).send("Login Failed")
        
    }
});
 



module.exports={userRouter};