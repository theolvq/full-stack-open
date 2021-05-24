import React, { useState } from 'react';
import AddContact from './AddContact';
import Contact from './Contact';
import Search from './Search';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumChange = e => {
    setNewNumber(e.target.value);
  };

  const handleFilterChage = e => {
    setFilterInput(e.target.value);
  };

  const addContact = e => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const alreadyAdded = persons.some(
      person => person.name === personObject.name
    );
    if (alreadyAdded) {
      alert(`${personObject.name} is already added to phonebook`);
      setNewName('');
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const contactsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterInput.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={filterInput} handleFilterChange={handleFilterChage} />
      <h2>Add a new contact</h2>
      <AddContact
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
        addContact={addContact}
      />

      <h2>Numbers</h2>
      {contactsToShow.map(person => (
        <Contact key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
