const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404).end();
  }
});

blogRouter.post('/', async (req, res) => {
  const body = req.body;
  if (req.user) {
    const user = req.user;
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  } else {
    res.status(401).end();
  }
});

blogRouter.put('/:id', async (req, res) => {
  const body = req.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  const user = req.user;

  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  }
});

module.exports = blogRouter;
