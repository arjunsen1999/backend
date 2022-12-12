require('dotenv').config();
const secretKey = process.env.secretKey;
const jwt = require('jsonwebtoken');
const userModel = require('../models/UserAuth.model')

const verifyToken = async (req, res, next) =>{
 try {
    let token = req.headers?.authintication
    const decoded = await jwt.verify(token, secretKey);
     if(!decoded){
        res.status(400).send({msg : "Sorry! you have to login first"});
     }
   let userExists = await userModel.findOne({_id : decoded._id});
   if(!userExists){
    res.status(400).send({msg : "Sorry! you have to login first"});
   }
   req.userId = decoded._id;
   next();
 } catch (error) {
    res.status(400).send({msg : "Sorry! you have to login first", error});
 }
}


module.exports = verifyToken;