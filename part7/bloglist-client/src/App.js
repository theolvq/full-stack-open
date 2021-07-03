import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import blogService from './services/blogs';
import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';

import { initBloglist } from './actions/blogActions';
import { setUser } from './actions/userAction';
import { getThemAll } from './actions/usersAction';
import Main from './components/Main';
import Header from './components/Header';
import Blog from './components/Blog';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBloglist());
    dispatch(getThemAll());
  }, [dispatch]);

  const usersList = useSelector((state) => state.users);
  const userMatch = useRouteMatch('/users/:id');
  const matchedUser = userMatch
    ? usersList.find((user) => user.id === userMatch.params.id)
    : null;

  const blogList = useSelector((state) => state.blogs);
  const blogMatch = useRouteMatch('/blogs/:id');
  const matchedBlog = blogMatch
    ? blogList.find((blog) => blog.id === blogMatch.params.id)
    : null;

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser');
    if (loggedInUserJSON === undefined) {
      window.localStorage.clear();
    } else if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      dispatch(setUser(loggedInUser));
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  return (
    <div>
      <Header />

      <h1>Blog List App</h1>
      <Notification />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route path="/users/:id">
          <User user={matchedUser} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={matchedBlog} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

//  {
//    !user ? (
//      <>
//        <h2>Log in to the app</h2>
//        <Togglable buttonLabel="Login">
//          <LoginForm />
//        </Togglable>
//      </>
//    ) : (
//      <>
//        <h2>{user.name} is logged in</h2>
//        <button id="logout-btn" onClick={handleLogout}>
//          Log out
//        </button>
//        <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
//          <BlogForm />
//        </Togglable>
//        <BlogList />
//      </>
//    );
//  }
