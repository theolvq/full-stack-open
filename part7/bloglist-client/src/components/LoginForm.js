import React from 'react';
import { useDispatch } from 'react-redux';
import { login, setUser } from '../actions/userAction';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { setNotification } from '../actions/notificationActions';

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
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification(`Error: ${exception}`));
    }
    e.target.username.value = '';
    e.target.password.value = '';
  };

  return (
    <>
      <Typography variant="h4">Log in to the app</Typography>
      <form
        onSubmit={logUser}
        style={{ display: 'flex', justifyContent: 'flex-start' }}
      >
        <TextField type="text" name="username" id="username" label="username" />
        <TextField
          type="password"
          name="password"
          id="password"
          label="password"
        />
        <Button id="login-btn" type="submit" variant="contained">
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
