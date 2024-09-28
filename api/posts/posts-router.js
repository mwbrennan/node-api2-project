// implement your posts router here
const express = require('express');

const router = express.Router();

const Posts = require('./posts-model');

router.get('/posts', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json({
                message: 'the Posts information could not be retrieved'
            })
        })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'The post information could not be retrieved'
            })
        })
})

router.post('/posts', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(404).json({
            message: 'Please provide title and contents for the post'
        })
    }
    Posts.add(req.body)
        .then(post => {
            res.status(201).json(posts)
        })
        .catch(error => {
            res.status(500).json({
                message: 'There was an error while saving the post to the database'
            })
        })
})

router.put('/posts/:id', (req, res) => {
    const changes = req.body;

    if(!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    }

    Posts.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ 
                    message: 'The post with the specified ID does not exist'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'The post information could not be modified'
            })
        })
})

router.delete('/posts/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(400).json({
                    message: 'The post with the specified ID does not exist'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'The post could not be removed'
            })
        })
})

router.get('/api/posts/:id/comments', (req, res) => {
    Posts.findPostsComments(req.params.id)
        .then(comments => {
            if (comments) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'The comments information could not be retrieved'
            })
        })
})

module.exports = router;