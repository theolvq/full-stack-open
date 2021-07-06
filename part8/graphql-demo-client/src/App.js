import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Persons from './components/Persons';
import AddPersonForm from './components/AddPersonForm';
import { ALL_PERSONS } from './queries';
import Notify from './components/Notify';
import EditNumberForm from './components/EditNumberForm';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);

  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <h1>Hello GraphQL</h1>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <AddPersonForm setError={notify} />
      <EditNumberForm setError={notify} />
    </div>
  );
}

export default App;
