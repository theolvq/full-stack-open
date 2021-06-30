import React from 'react';
import { useDispatch } from 'react-redux';
import { login, setUser } from '../actions/userAction';
import {
  setNotification,
  unsetNotification,
} from '../actions/notificationActions';

const LoginForm = () => {
  const dispatch = useDispatch();

  const logUser = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      dispatch(login({ username, password }));
      dispatch(setUser({ username, password }));
      dispatch(setNotification(`${username} just logged in`));
      setTimeout(() => {
        dispatch(unsetNotification());
      }, 5000);
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification(`${exception}`));
      setTimeout(() => {
        dispatch(unsetNotification());
      }, 5000);
    }
    e.target.username.value = '';
    e.target.password.value = '';
  };

  return (
    <form onSubmit={logUser}>
      <label>
        username:
        <input type="text" name="username" id="username" />
      </label>
      <label>
        password:
        <input type="password" name="password" id="password" />
      </label>
      <button id="login-btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
