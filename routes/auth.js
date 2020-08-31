const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.send("hello")
});

router.post('/signup', (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    if (!email || !password || !name) {
        //unprocessable Entity undertstood the error but can not process
        return res.status(422).json({
            error: "please add allthe fields"
        });
    }
    User.findOne({
            email: email
        })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({
                    error: "User Already exist"
                });
            }
            bcrypt.hash(password, 12)
                .then(hashedPasword => {
                    const user = new User({
                        email,
                        password: hashedPasword,
                        name
                    });
                    user.save()
                        .then(user => {
                            res.json({
                                message: "saved sucessfuly"
                            })
                        })
                        .catch(err => {
                            conole.log(err)
                        })
                })
        })
        .catch(err => {
            console.log(err)
        });


    // res.json({
    //     message: "Successfuly post"
    // });
});

router.post('/signin', (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        res.status(422).json({
            error: "Please add email and password"
        });
    }
    User.findOne({
            email: email
        })
        .then(saveduser => {
            if (!saveduser) {
                return res.status(422).json({
                    error: "Invalid Email or password"
                });
            }
            bcrypt.compare(password, saveduser.password)
                .then(doMatch => {
                    if (doMatch) {
                        res.json({
                            message: "successfuly singned"
                        })
                    } else {
                        return res.status(422).json({
                            error: "Invalid Email or password"
                        });
                    }
                })
                .catch(err=>console.log(err))
        })
        // .catch
});

module.exports = router