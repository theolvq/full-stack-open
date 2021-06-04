const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const blogRouter = require('./controllers/blogs');
require('dotenv').config();

morgan.token('body', req => JSON.stringify(req.body));
app.use(morgan(':method :url :response-time ms \n :body'));

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
