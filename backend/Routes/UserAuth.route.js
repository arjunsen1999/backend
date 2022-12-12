require('dotenv').config();
const express = require('express');
const Router = express.Router();
const userModel = require('../models/UserAuth.model');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secretKey = process.env.secretKey;

Router.post('/signup',[
    body('first_name', "Enter Your First name").not().isEmpty(),
    body('last_name', "Enter Your Last name").not().isEmpty(),
    body('email', "Enter Your valid email id").isEmail(),
    body('password', "password min 3 char").isLength({ min: 3 })
], async (req, res) =>{
 try {
    let {first_name, last_name, email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    let isUserExists = await userModel.findOne({email});
    if(isUserExists){
        res.status(400).send({ msg : "This Email Already Exists plz login" });
    }
    let hash = await bcrypt.hash(password, saltRounds);
    let createUser = await userModel.create({first_name, last_name, email, password : hash});

    if(createUser){
        res.status(200).send({ msg : "Signup Successfully!" });
    }

 } catch (error) {
    res.status(400).send({msg : "Somthing went wrong in signup!", error});
 }
});


Router.post('/login',[
    body('email', "Enter Your valid email id").isEmail(),
    body('password', "password min 3 char").isLength({ min: 3 })
], async (req, res) =>{
 try {
    let { email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    let isUserExists = await userModel.findOne({email});
    if(!isUserExists){
        res.status(400).send({ msg : "Sorry! You have to Login first!" });
    }
    let isPassword = await bcrypt.compare(password, isUserExists.password);
    if(isPassword){
        const token = jwt.sign({_id : isUserExists._id}, secretKey);
        res.status(200).send({ token, user : isUserExists });
    }else{
        res.status(400).send({ msg : "Sorry! fill the right credential" });
    }

    if(createUser){
        res.status(200).send({ msg : "Signup Successfully!" });
    }

 } catch (error) {
    res.status(400).send({msg : "Somthing went wrong in login!", error});
 }
});

module.exports = Router;