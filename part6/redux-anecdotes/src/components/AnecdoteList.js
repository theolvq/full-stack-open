import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  createNotification,
  deleteNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
  );
  console.log(anecdotes);
  const dispatch = useDispatch();

  const vote = anecdote => {
    const { id, content } = anecdote;
    dispatch(voteAnecdote(id, anecdote));
    console.log(anecdote);
    dispatch(
      createNotification(`You voted for the following anecdote: ${content}`)
    );
    setTimeout(() => {
      dispatch(deleteNotification());
    }, 5000);
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
