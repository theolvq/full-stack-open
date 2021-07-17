import { useApolloClient } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import Recommended from './components/Recommended';

function App() {
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    if (localStorage.length > 0 && token === null) {
      const loggedInUserToken = JSON.stringify(
        localStorage.getItem('library-user-token')
      );
      setToken(loggedInUserToken);
    }
  }, []); // eslint-disable-line

  const notify = message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <>
            {' '}
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={logout}>logout</button>{' '}
          </>
        )}
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      {!token && page === 'login' ? (
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
          setPage={setPage}
        />
      ) : (
        <>
          {' '}
          <NewBook show={page === 'add'} setPage={setPage} />
          <Recommended show={page === 'recommended'} />{' '}
        </>
      )}
    </div>
  );
}

export default App;
