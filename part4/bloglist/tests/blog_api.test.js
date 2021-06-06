const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialList);

  // for (const blog of helper.initialList) {
  //   const blogObject = new Blog(blog);
  //   await blogObject.save();
  // }
  // await Promise.all(
  //   helper.initialList
  //     .map(async blog => new Blog(blog))
  //     .map(blog => blog.save())
  // );
});

xdescribe('GET tests', () => {
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
  test('is identifier property named "id"?', async () => {
    const res = await api.get('/api/blogs');
    const id = res.body.map(post => post.id);
    expect(id).toBeDefined();
  });
});
xdescribe('POST tests', () => {
  test('creates new post', async () => {
    const newPost = {
      title: 'Jest is really cool',
      author: 'Theo Leveque',
      url: 'https://www.theoleveque.com',
      likes: 351,
    };

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const postsAfterUpdate = await helper.notesInDb();
    expect(postsAfterUpdate).toHaveLength(helper.initialList.length + 1);

    const titles = postsAfterUpdate.map(post => post.title);
    expect(titles).toContain('Jest is really cool');
  });

  test('no likes default to zero (0)', async () => {
    const newPost = {
      title: 'Jest is really cool',
      author: 'Theo Leveque',
      url: 'https://www.theoleveque.com',
    };

    await api.post('/api/blogs').send(newPost);

    const newPostInDb = await Blog.findOne({ title: 'Jest is really cool' });
    expect(newPostInDb.likes).toEqual(0);
  });

  test('no title and/or url returns 400 Bad Request', async () => {
    const newPost = {
      author: 'Wes Bos',
      likes: 35,
    };

    await api.post('/api/blogs').send(newPost).expect(400);
  });
});

describe.skip('DELETE test', () => {
  test('deletes a note and return 204', async () => {
    const res = await api.get('/api/blogs');
    const validId = res.body[0].id;
    await api.delete(`/api/blogs/${validId}`).expect(204);
  });
});

describe('PUT test', () => {
  test('updates a note', async () => {
    const res = await api.get('/api/blogs');
    const validId = res.body[0].id;

    const updatedNote = {
      title: 'Updating stuff is done with PUT',
      author: 'Lily',
      url: 'https://lilyloveleveque.dev',
      likes: 15,
    };

    await api.put(`/api/blogs/${validId}`).send(updatedNote);

    const postsAfterUpdate = await helper.notesInDb();
    expect(postsAfterUpdate).toHaveLength(helper.initialList.length);

    const titles = postsAfterUpdate.map(post => post.title);
    expect(titles).toContain('Updating stuff is done with PUT');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
