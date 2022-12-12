const mongoose = require('mongoose');


const todoSchema =  mongoose.Schema({
    taskname  : {
    type : String,
    required : true
 },
 status : {
    type : String,
    required : true
 },
 tag  : {
    type : String,
    required : true,
    unique : true
 },
 userId : {
    type : mongoose.Types.ObjectId,
    ref : "user"
 },
}, {
    versionKey : false,
    timestemps : true
});


const todoModel = mongoose.model('todo', todoSchema);
module.exports = todoModel;