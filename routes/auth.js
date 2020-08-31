const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("hello")
});

router.get('/signup', (req, res) => {
    res.send(req.body.name)
});


module.exports = router