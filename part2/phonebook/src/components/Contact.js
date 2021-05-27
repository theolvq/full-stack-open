const Contact = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} {person.number}{' '}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </p>
  );
};

export default Contact;
