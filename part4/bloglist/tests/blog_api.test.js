const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of helper.initialList) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
  // await Promise.all(
  //   helper.initialList
  //     .map(async blog => new Blog(blog))
  //     .map(blog => blog.save())
  // );
});

describe('Base tests', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('returns the right amount of posts', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(helper.initialList.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
