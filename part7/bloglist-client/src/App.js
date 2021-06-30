import React, { useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { initBloglist } from './actions/blogActions';
import BlogList from './components/BlogList';
import { setUser, unsetUser } from './actions/userAction';
import {
  setNotification,
  unsetNotification,
} from './actions/notificationActions';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initBloglist());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser');
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      dispatch(setUser(loggedInUser));
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser');
    dispatch(unsetUser());
    blogService.setToken(null);
    dispatch(setNotification(`${user.username} just logged out`));
    setTimeout(() => {
      dispatch(unsetNotification());
    }, 5000);
  };

  return (
    <div>
      <h1>Blog List App</h1>
      <Notification />
      {!user ? (
        <>
          <h2>Log in to the app</h2>
          <Togglable buttonLabel="Login">
            <LoginForm />
          </Togglable>
        </>
      ) : (
        <>
          <h2>{user.name} is logged in</h2>
          <button id="logout-btn" onClick={handleLogout}>
            Log out
          </button>
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <BlogList />
        </>
      )}
    </div>
  );
};

export default App;
