const express = require('express');
const Router = express.Router();
const todoModel = require('../models/todos.model');
const verifyToken = require('../middleware/verifyToken');


Router.post("/add",verifyToken, async (req, res) =>{
 try {
    let {taskname, status, tag} = req.body;
    let userId = req.userId;
    if(!taskname || !status || !tag){
        res.status(400).send({msg : "Plz fill all the input"});
    }
    let createTodo = await todoModel.create({userId, taskname, status, tag});
    res.status(200).send({msg : "Added Successfully!"})
 } catch (error) {
    res.status(400).send({msg : "Somthing went wrong in todo add!", error});
 }
});

Router.get("/",verifyToken, async (req, res) =>{
   try {
      let {status, tag} = req.query;
      let userId = req.userId;
       let todos = null
      if(status && tag){
          todos = await todoModel.find({userId, status, tag});
      }else if(status){
         todos = await todoModel.find({userId, status});
      }else if(tag){
         todos = await todoModel.find({userId, tag});
      }else{
         todos = await todoModel.find({userId});
      }
      
      res.status(200).send(todos)
   } catch (error) {
      res.status(400).send({msg : "Somthing went wrong in todo get all the todo!", error});
   }
  });

  Router.get("/:todoID",verifyToken, async (req, res) =>{
   try {
      let userId = req.userId;
      let todoId = req.params.todoID;
      let todos = await todoModel.find({userId, _id : todoId});
      res.status(200).send(todos)
   } catch (error) {
      res.status(400).send({msg : "Somthing went wrong in todo get todoId!", error});
   }
  });

  Router.patch("/update/:todoID",verifyToken, async (req, res) =>{
   try {
      let userId = req.userId;
      let todoId = req.params.todoID;
      let todos = await todoModel.findByIdAndUpdate({userId, _id : todoId}, req.body);
      res.status(200).send({msg : "update Successfully!", todos})
   } catch (error) {
      res.status(400).send({msg : "Somthing went wrong in todo update!", error});
   }
  });

  Router.delete("/delete/:todoID",verifyToken, async (req, res) =>{
   try {
      let userId = req.userId;
      let todoId = req.params.todoID;
      let todos = await todoModel.findByIdAndDelete({userId, _id : todoId});
      res.status(200).send({msg : "Deleted Successfully!", todos})
   } catch (error) {
      res.status(400).send({msg : "Somthing went wrong in todo delete!", error});
   }
  });

module.exports = Router;