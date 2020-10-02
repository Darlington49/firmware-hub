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
require('./Models/post');

app.use(express.json());
// respond with "hello world" when a GET request is made to the homepage

app.get('/', function(req, res) {
    res.send('hello world');
  });

app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})