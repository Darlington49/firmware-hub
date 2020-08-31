"use strict";

var express = require('express');

var app = express();
var PORT = 5000;

var mongoose = require('mongoose');

var _require = require('./keys'),
    MONGOURI = _require.MONGOURI;

require('./Models/user');

app.use(require('./routes/auth')); // mongoose.connect(MONGOURI, {
//     useNewUrlParser: true,
//     // useUnifiedTopology: true
// })
// mongoose.connection.on('connected',()=>{
//     console.log("connected to mongo");
// })
// mongoose.connection.on('connected',(err)=>{
//     console.log("err connecting",err);
// })

var customMiddleware = function customMiddleware(req, res, next) {
  console.log("Middleware Executed"); // console.log(req);

  next();
};

app.use(customMiddleware);
app.listen(PORT, function () {
  console.log("server running on ".concat(PORT));
});