const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter.js');
const ProductRouter = require('./Routes/ProductRouter.js');


require('dotenv').config();
require('./models/db.js');
// const UserModel = require('./models/user.js');

const app = express();
const PORT = process.env.PORT || 8080;

// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

// app.get("/ping",(req,res)=>{
//     res.send("hello");
// })

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`); 
})