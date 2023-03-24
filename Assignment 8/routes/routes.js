const express = require('express');
const route = express.Router();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const JWT_SECRET = "asdfghjkl()mnbvcxz"
route.get('/user/getAll', (req,res) => {
    User.find({}, (err, data) => {
        if(!err){
            res.send(data)
        }else{
            console.log(err)
        }
    })
});




// create user
route.post('/user/create', async (req,res) => {
    const {fullName , email, password } = req.body

    try{
        if(!fullName || !email || !password){
            res.send({error: "All fields are mandatory" })
        }
        if(validator.isEmpty(fullName)){
            res.send({error: "Name is Invalid" })
        }
        if(!validator.isEmail(email)){
            res.send({error: "Email is Invalid" })
        }
        if(!validator.isStrongPassword(password)){
            res.send({error: "Password not Strong"})
        }
        const exists = await User.findOne({email : email})
        if(exists){
            res.send({error: "Email already in use." })
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await User.create({ fullName, email, password : hashedPassword})
            res.status(200).json({user})
        }
    }catch(err){

    }
    
});

// update user
route.put('/user/edit/:email', async (req,res) => {
    const {fullName , password } = req.body

    try{
    if(!fullName || !password){
        res.send({error: "All fields are mandatory" })
    }
    if(validator.isEmpty(fullName)){
        res.send({error: "Name is Invalid" })
    }
    if(password&&!validator.isStrongPassword(password)){
        res.send({error: "Password not Strong"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const usr = {
        fullName: fullName,
        password: hashedPassword
    };
    User.findOneAndUpdate({email: req.params.email}, { $set : usr}, {new:true}, (err,data) => {
        if(!data){
            res.status(400).json({code: 400, message:"User Not Found"})
            
        }else if(!err){
            res.status(200).json({code: 200, message:"User Updated Successfully",
            updateUser:data})
        }
        else{
            console.log(err)

        }
    });
}catch(err){

}

});

// delete user
route.delete('/user/delete/:email', (req,res) => {
    User.findOneAndDelete({email: req.params.email}, (err,data) =>{
        if(!data){
            res.status(400).json({code: 400, message:"User Not Found"})
        }
        else if(!err){
            res.status(200).json({code: 200, message:"User Deleted Successfully",
            deleteUser:data})
        }
        else{
            console.log(err)
        }
    })
})

module.exports = route;