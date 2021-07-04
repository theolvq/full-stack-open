const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', {
      content: 1,
    });
  res.json(blogs);
});

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('comments', {
    content: 1,
  });
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404).end();
  }
});

blogRouter.get('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('comments', {
    content: 1,
  });
  if (blog.comments) {
    const { comments } = blog;
    res.status(200).json(comments);
  } else {
    res.status(404).end();
  }
});

blogRouter.post('/', async (req, res) => {
  const { body } = req;
  if (req.user) {
    const { user } = req;
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  } else {
    res.status(401).end();
  }
});

blogRouter.post('/:id/comments', async (req, res) => {
  const { body } = req;
  const blog = await Blog.findById(req.params.id);
  const comment = new Comment({
    content: body.content,
    blog,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();
  res.status(201).json(savedComment);
});

blogRouter.put('/:id', async (req, res) => {
  const { body } = req;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: req.user,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1 });
  res.json(updatedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  // const blog = await Blog.findById(req.params.id);
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
  // if (req.user) {
  //   const { user } = req;
  //   if (blog.user.toString() === user._id.toString()) {
  //     console.log(blog.user, user._id);
  //     await Blog.findByIdAndDelete(req.params.id);
  //     res.status(204).end();
  //   } else {
  //     res.status(401).end();
  //   }
  // }
});

module.exports = blogRouter;
