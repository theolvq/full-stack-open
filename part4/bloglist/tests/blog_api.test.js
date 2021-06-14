const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

describe('Blog tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialList);
  });

  describe('GET tests', () => {
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
  describe('POST tests', () => {
    test('creates new post', async () => {
      const user = {
        username: 'Daawa',
        password: 'password',
      };
      const res = await api.post('/api/login').send(user);
      const token = res.body.token;

      const newPost = {
        title: 'Jest is really cool',
        author: 'Theo Leveque',
        url: 'https://www.theoleveque.com',
        likes: 351,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const postsAfterUpdate = await helper.notesInDb();
      expect(postsAfterUpdate).toHaveLength(helper.initialList.length + 1);

      const titles = postsAfterUpdate.map(post => post.title);
      expect(titles).toContain('Jest is really cool');
    });

    test('no likes default to zero (0)', async () => {
      const user = {
        username: 'Daawa',
        password: 'password',
      };
      const res = await api.post('/api/login').send(user);
      const token = res.body.token;
      const newPost = {
        title: 'Jest is really cool',
        author: 'Theo Leveque',
        url: 'https://www.theoleveque.com',
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newPost);

      const newPostInDb = await Blog.findOne({ title: 'Jest is really cool' });
      expect(newPostInDb.likes).toEqual(0);
    });

    test('no title and/or url returns 400 Bad Request', async () => {
      const user = {
        username: 'Daawa',
        password: 'password',
      };
      const res = await api.post('/api/login').send(user);
      const token = res.body.token;
      const newPost = {
        author: 'Wes Bos',
        likes: 35,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newPost)
        .expect(400);
    });
    test('adding blog fails with code 401 if token is not provided', async () => {
      const newPost = {
        title: 'Considered harmful sucks',
        author: 'Scott Tolinski',
        url: 'https://syntax.fm',
        likes: 1609,
      };

      await api.post('/api/blogs').send(newPost).expect(401);
    });
  });

  describe('DELETE test', () => {
    test('deletes a note and return 204', async () => {
      const user = {
        username: 'Daawa',
        password: 'password',
      };
      const loginRes = await api.post('/api/login').send(user);
      const token = loginRes.body.token;
      console.log(token);
      const res = await api.get('/api/blogs');
      const validId = res.body[0].id;
      console.log(validId);
      await api
        .delete(`/api/blogs/${validId}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204);
    });
  });

  describe('PUT test', () => {
    test('updates a blog', async () => {
      const res = await api.get('/api/blogs');
      const validId = res.body[0].id;

      const updatedBlog = {
        title: 'Updating stuff is done with PUT',
        author: 'Lily',
        url: 'https://lilyloveleveque.dev',
        likes: 15,
      };

      await api.put(`/api/blogs/${validId}`).send(updatedBlog);

      const postsAfterUpdate = await helper.notesInDb();
      expect(postsAfterUpdate).toHaveLength(helper.initialList.length);

      const titles = postsAfterUpdate.map(post => post.title);
      expect(titles).toContain('Updating stuff is done with PUT');
    });
  });
});

xdescribe('User tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('password', 10);
    for (const user of helper.userList) {
      const userObj = new User({
        username: user.username,
        passwordHash,
      });
      await userObj.save();
    }
  });
  describe('POST user tests', () => {
    test('creates valid user', async () => {
      const newUser = {
        username: 'McLovin',
        name: 'Fogell',
        password: 'sex',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAfterUpdate = await helper.usersInDb();
      expect(usersAfterUpdate).toHaveLength(helper.userList.length + 1);

      const usernames = usersAfterUpdate.map(user => user.username);
      expect(usernames).toContain('McLovin');
    });

    test('user with short password is rejected', async () => {
      const invalidUser = {
        username: 'McLovin',
        name: 'Fogell',
        password: 's',
      };

      await api.post('/api/users').send(invalidUser).expect(400);
    });
    test('user missing password is rejected', async () => {
      const invalidUser = {
        username: 'McLovin',
        name: 'Fogell',
      };

      await api.post('/api/users').send(invalidUser).expect(400);
    });

    test('user missing username is rejected', async () => {
      const invalidUser = {
        name: 'Fogell',
        password: 'sex',
      };

      await api.post('/api/users').send(invalidUser).expect(400);
    });
  });
  describe('Post login tests', () => {
    test('existing user can login', async () => {
      const user = {
        username: 'Daawa',
        password: 'password',
      };
      const res = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      console.log(res.body);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
