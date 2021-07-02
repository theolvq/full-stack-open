const Blog = require('../models/blog');
const User = require('../models/user');

const initialList = [
  {
    title: 'Test',
    author: 'MCLovin',
    url: 'https://MCLovin.love',
    likes: 69,
  },
  {
    title: 'Backend is pretty cool',
    author: 'Theo',
    url: 'https://backendmasters.com',
    likes: 8,
  },
  {
    title: 'I love MongoDB',
    author: 'Theo',
    url: 'https://backendmasters.com',
    likes: 87,
  },
  {
    title: 'Refactoring',
    author: 'Theo',
    url: 'https://backendmasters.com',
    likes: 65,
  },
  {
    title: 'Refactoring is a core part of programming',
    author: 'Scott',
    url: 'https://syntax.fm',
    likes: 55,
  },
  {
    title: 'CLI Heroes rock',
    author: 'Soran',
    url: 'https://redhat.com',
    likes: 1000,
  },
  {
    title: 'Syntax fm is a great podcast',
    author: 'Scott',
    url: 'https://syntax.fm',
    likes: 1000,
  },
  {
    title: 'Considered harmful is considered harmful',
    author: 'Wes',
    url: 'https://syntax.fm',
    likes: 1000,
  },
  {
    title: "You'l never believe what happens next",
    author: 'Wes',
    url: 'https://syntax.fm',
    likes: 15,
  },
];

const notesInDb = async () => {
  const posts = await Blog.find({});
  return posts.map((post) => post.toJSON());
};

const userList = [
  {
    username: 'Daawa',
    name: 'Theo',
    password: 'Whistler',
  },
  {
    username: 'RadMama',
    name: 'Kristina',
    password: 'grateful',
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialList,
  notesInDb,
  userList,
  usersInDb,
};
