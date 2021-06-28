import axios from 'axios';
import React, { useState, useEffect } from 'react';

const useNotes = url => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(url).then(res => {
      setNotes(res.data);
    });
  }, [url]);
  return notes;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const notes = useNotes(BACKEND_URL);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };
  return (
    <div className="container">
      <h1>Hello Webpack {counter}</h1>
      <button onClick={handleClick}>press</button>
      <div>
        {notes.length} notes on server {BACKEND_URL}{' '}
      </div>
    </div>
  );
};

export default App;
