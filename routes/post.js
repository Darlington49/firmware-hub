const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../Middleware/requireLogin');
const Post = mongoose.model("Post")


router.get('/allpost',requireLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .then(Posts => {
            res.json({
                Posts
            })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/createpost', requireLogin, (req, res) => {
    const {
        title,
        body
    } = req.body;
    if (!title || !body) {
        return res.status(422).json({
            error: "please add all the fields"
        });
    }
    console.log("connection from ", req.user)
    //res.send("ok")
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy: req.user
    });
    post.save().then(result => {
            res.json({
                post: result
            })
        })
        .catch(err => {
            console.log(err);
        })

});

router.get('/mypost', (req, res) => {
    Post.find({
            postedBy: req.user._id
        })
        .populate("postedBy", "_id name")
        .then(myPosts => {
            res.json({
                myPosts
            })
        })
        .catch(err => {
            console.log(err)
        })
});
module.exports = router;