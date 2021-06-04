const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

morgan.token('body', req => JSON.stringify(req.body));
app.use(morgan(':method :url :response-time ms \n :body'));

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server Working' });
});

app.get('/api/blogs', (req, res) => {
  Blog.find({})
    .then(blogs => {
      res.json(blogs);
    })
    .catch(err => console.log(err));
});

app.get('/api/blogs/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/api/blogs', (req, res) => {
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

app.delete('/api/blogs/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      console.log(err);
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
