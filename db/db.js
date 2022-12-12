require('dotenv').config();
const mongoose = require('mongoose');
const URL = process.env.URL;

const connection = () =>{
    mongoose.connect(`${URL}`).then(() =>{
        console.log({msg : `Connection Successfully!`});
    }).catch((error) =>{
        console.log({msg : `Connection Failed!`, error});
    })
}

module.exports = {connection}