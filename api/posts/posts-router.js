// implement your posts router here
const express = require('express');

const router = express.Router();

const Post = require('./posts-model');

router.get('/', (req, res) => {
    Post.find().then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.log(error)
        res.status(500)
        .json({message: 'something went wrong retrieving the posts :('})
    })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(result => {
        if(result == null){
            res.status(404).json({ message: 'does not exist' });
            return;
        }
        res.status(200).json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'something went wrong :('})
    })
})

module.exports = router