import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = props => {
  const addAnecdote = async e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    props.createAnecdote(content);
    props.setNotification(`You added the following anecdote: ${content}`, 3);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

const connectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm);
export default connectedAnecdoteForm;

// import { useDispatch } from 'react-redux';
// import { createAnecdote } from '../reducers/anecdoteReducer';
// import { setNotification } from '../reducers/notificationReducer';

// const AnecdoteForm = () => {
//   const dispatch = useDispatch();

//   const addAnecdote = async e => {
//     e.preventDefault();
//     const content = e.target.anecdote.value;
//     e.target.anecdote.value = '';
//     dispatch(createAnecdote(content));
//     dispatch(
//       setNotification(`You added the following anecdote: ${content}`, 3)
//     );
//   };
//   return (
//     <>
//       <h2>create new</h2>
//       <form onSubmit={addAnecdote}>
//         <div>
//           <input name='anecdote' />
//         </div>
//         <button type='submit'>create</button>
//       </form>
//     </>
//   );
// };

// export default AnecdoteForm;
