import React, { useState } from 'react';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        username:
        <input
          type="text"
          value={username}
          name="username"
          onChange={handleChange}
          id="username"
        />
      </label>
      <label>
        password:
        <input
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
          id="password"
        />
      </label>
      <button id="login-btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
