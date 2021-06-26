import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  // createNotification,
  // deleteNotification,
  setNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
  );
  const dispatch = useDispatch();

  const vote = anecdote => {
    const { id, content } = anecdote;
    dispatch(voteAnecdote(id, anecdote));
    console.log(anecdote);
    dispatch(
      setNotification(`You vote for the following anecdote: ${content}`, 3)
    );
  };
  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
