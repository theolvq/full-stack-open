const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>by {anecdote.author}</div>
      <div>has {anecdote.votes} votes</div>
    </div>
  );
};

export default Anecdote;
