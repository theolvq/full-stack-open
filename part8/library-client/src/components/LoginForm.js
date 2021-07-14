import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LOGIN } from '../queries';

function LoginForm({ setError, setToken, setPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(LOGIN, {
    onError: err => {
      setError(err.graphQLErrors[0].message);
    },
  });
  console.log(result.data);
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
    }
  }, [result.data]); //eslint-disable-line

  const submit = async e => {
    e.preventDefault();
    await login({ variables: { username, password } });
    setPage('authors');
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <label>
        username
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        password
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button>login</button>
    </form>
  );
}

export default LoginForm;
