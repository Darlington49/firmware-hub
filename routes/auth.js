const express = require('express');

const router = express.Router();

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
        res.json({
            error: "please add allthe fields"
        });
    }

    res.json({
        message: "Successfuly post"
    });
});


module.exports = router