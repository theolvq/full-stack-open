import React, { useState } from 'react';
import AnecdoteList from './components/AnecdoteList';
import About from './components/About';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import Anecdote from './components/Anecdote';
import { Route, Switch, useRouteMatch } from 'react-router';
import Menu from './components/Menu';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  const [notification, setNotification] = useState('');

  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null;
  console.log(anecdotes.map(anecdote => anecdote.id));
  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = id => anecdotes.find(a => a.id === id);

  const vote = id => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Switch>
        <Route exact path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
};

export default App;
