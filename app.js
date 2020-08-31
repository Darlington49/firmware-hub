const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {
    MONGOURI
} = require('./keys');

require('./Models/user');

app.use(express.json())
app.use(require('./routes/auth'))

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

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

const customMiddleware = (req, res, next) => {
    console.log("Middleware Executed");
    // console.log(req);
    next();
}

app.use(customMiddleware);


app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})