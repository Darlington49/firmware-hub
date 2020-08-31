const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");

router.get('/', (req, res) => {
    res.send("hello")
});

router.get('/signup', (req, res) => {
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
            const user = new User({
                email,
                password,
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
        .catch(err => {
            console.log(err)
        });


    // res.json({
    //     message: "Successfuly post"
    // });
});


module.exports = router