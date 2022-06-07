// implement your posts router here
const express = require('express');

const router = express.Router();

const Post = require('./posts-model');

router.get('/', (req, res) => {
    Post.find().then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json({message: 'something went wrong retrieving the posts :('})
    })
})

module.exports = router