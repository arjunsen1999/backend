require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const {connection} = require('./db/db');
const cors = require('cors');
const userAuthRouter = require('./Routes/UserAuth.route');
const todoRouter = require('./Routes/todos.route');
app.use(express.json());
app.use(cors());

app.use("/todos", userAuthRouter);
app.use("/todos", todoRouter);

app.listen(PORT, () =>{
    connection();
    console.log(`Listening at the http://localhost:${PORT}`);
})