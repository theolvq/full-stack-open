import anecdoteService from '../service/anecdotes';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdote = state.find(anecdote => anecdote.id === id);
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      return state.map(anecdote =>
        anecdote.id === id ? changedAnecdote : anecdote
      );
    case 'ADD_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdote = (id, anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.update(id, anecdote);
    dispatch({
      type: 'VOTE',
      data: newAnecdote,
    });
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;
