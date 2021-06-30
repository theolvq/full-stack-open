import React, { useEffect, useState, useRef } from 'react';
// import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import { useDispatch } from 'react-redux';
import { initBloglist } from './actions/blogActions';
import BlogList from './components/BlogList';

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initBloglist());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      await blogService.create(newBlog);
      setBlogs(blogs.concat(newBlog));
      setMessage(`${newBlog.title} was added`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (exception) {
      setMessage(`${exception}`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setMessage('Thanks for logging in');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (exception) {
      setMessage(`${exception}`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser');
    setUser(null);
    blogService.setToken(null);
    setMessage('You are now logged out');
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  return (
    <div>
      <h1>Blog List App</h1>
      {message && <Notification message={message} />}

      {!user ? (
        <>
          <h2>Log in to the app</h2>
          <Togglable buttonLabel="Login">
            <LoginForm login={login} />
          </Togglable>
        </>
      ) : (
        <>
          <h2>{user.name} is logged in</h2>
          <button id="logout-btn" onClick={handleLogout}>
            Log out
          </button>
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} user={user} />
          </Togglable>
          <BlogList />
        </>
      )}
    </div>
  );
};

export default App;
