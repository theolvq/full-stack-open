const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const { body } = req;
  if (body.password === undefined) {
    return res.status(400).json({ error: 'password required' });
  }
  if (body.password.length < 3) {
    return res
      .status(400)
      .json({ error: 'password must be at least 3 characters' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUSer = await user.save();
  return res.status(201).json(savedUSer);
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    likes: 1,
  });
  res.status(200).json(users);
});

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('blogs', {
    title: 1,
    author: 1,
    likes: 1,
  });

  res.status(200).json(user);
});

module.exports = usersRouter;
