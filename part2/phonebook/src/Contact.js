const Contact = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

export default Contact;
