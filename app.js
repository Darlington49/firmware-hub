const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const {
    MONGOURI
} = require('./keys');

require('./Models/user');

app.use(require('./'))
// mongoose.connect(MONGOURI, {
//     useNewUrlParser: true,
//     // useUnifiedTopology: true
// })

// mongoose.connection.on('connected',()=>{
//     console.log("connected to mongo");
// })

// mongoose.connection.on('connected',(err)=>{
//     console.log("err connecting",err);
// })

const customMiddleware = (req, res, next) => {
    console.log("Middleware Executed");
    // console.log(req);
    next();
}

app.use(customMiddleware);

app.get('/', (req, res) => {
    res.send("hello to home")
})

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})