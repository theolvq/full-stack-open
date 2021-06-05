const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (req, res) => {
  Blog.find({})
    .then(blogs => {
      res.json(blogs);
    })
    .catch(err => console.log(err));
});

blogRouter.get('/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

blogRouter.post('/', (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

blogRouter.delete('/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = blogRouter;
