const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {
    MONGOURI
} = require('./keys');

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo");
})

mongoose.connection.on('connected',(err)=>{
    console.log("err connecting",err);
})

require('./Models/user');
app.use(express.json());
app.use(require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})