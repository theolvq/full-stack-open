const AddContact = ({
  addContact,
  handleNameChange,
  handleNumChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={addContact}>
      <label>
        name: <input value={newName} onChange={handleNameChange} />
      </label>
      <label>
        number: <input value={newNumber} onChange={handleNumChange} />
      </label>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddContact;
