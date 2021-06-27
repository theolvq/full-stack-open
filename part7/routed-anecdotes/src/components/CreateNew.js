import { useField } from '../hooks/useField';

const CreateNew = ({ addNew }) => {
  const { reset: contentReset, ...content } = useField('text');
  const { reset: authorReset, ...author } = useField('text');
  const { reset: infoReset, ...info } = useField('text');

  const handleSubmit = e => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };
  const clearFields = () => {
    contentReset();
    authorReset();
    infoReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <label>
          content
          <input {...content} />
        </label>
        <label>
          author
          <input {...author} />
        </label>
        <label>
          url for more info
          <input {...info} />
        </label>
        <button type='submit'>create</button>
        <button type='reset' onClick={clearFields}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
