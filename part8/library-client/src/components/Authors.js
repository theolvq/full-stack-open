import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

function Authors(props) {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const result = useQuery(ALL_AUTHORS);
  const [editAuhor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error => {
      console.log(error);
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    editAuhor({
      variables: { name, setBornTo: Number(birthdate) },
    });
    setBirthdate('');
    setName('');
  };

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }
  const { allAuthors: authors } = result.data;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          <option></option>
          {authors.map(a => (
            <option key={a.id}>{a.name}</option>
          ))}
        </select>
        <input
          type="number"
          value={birthdate}
          onChange={({ target }) => setBirthdate(Number(target.value))}
        ></input>
        <button>Add Birthyear</button>
      </form>
    </div>
  );
}

export default Authors;
