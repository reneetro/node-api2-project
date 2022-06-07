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

router.post('/', (req, res) => {
    if(req.body.title == null || req.body.contents == null){
        res.status(400).json({ message: 'provide title and contents'});
        return;
    }
    Post.insert(req.body)
        .then(result => {
            res.status(201)
            .json({
                id: result, 
                contents: req.body.contents, 
                title: req.body.title
            });
        })
         .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'error adding the post' })
     })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    if(req.body.title && req.body.contents){
        Post.update(req.params.id, changes)
            .then(result => {
                if(result) {
                    res.status(200).json({id:result, title: req.body.title, contents:req.body.contents})
                } else {
                    res.status(404).json({message: 'does not exist'})
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({message: 'error updating the post'})
            })
    } else {
        res.status(400).json({message: 'provide title and contents'})
    }
})

router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(result => {
            if(result){
                res.status(200).json({ id: req.params.id, title: req.body.title, contents: req.body.contents})
            } else {
                res.status(404).json({ message: 'does not exist'})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'error deleting the post'})
        })
})
module.exports = router