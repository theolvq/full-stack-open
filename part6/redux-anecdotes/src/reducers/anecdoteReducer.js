const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state);
  // console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToBeChanged = state.find(anecdote => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToBeChanged,
        votes: anecdoteToBeChanged.votes + 1,
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

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createAnecdote = data => {
  return {
    type: 'ADD_ANECDOTE',
    data,
  };
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export default anecdoteReducer;
