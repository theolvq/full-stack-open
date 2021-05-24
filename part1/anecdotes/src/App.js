import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    Array.from({ length: anecdotes.length }, () => 0)
  );

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => {
    setPoints(points => {
      const newPoints = [...points];
      newPoints[selected] += 1;
      return newPoints;
    });
  };

  const winner = anecdotes[points.indexOf(Math.max(...points))];

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>
        This anecdote has {points[selected]} vote
        {points[selected] > 1 ? 's' : ''}
      </p>
      <button onClick={handleNext}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      <h2>Anecdote with most votes</h2>
      <p>{winner}</p>
      {}
    </div>
  );
};

export default App;
