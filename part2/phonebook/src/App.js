import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddContact from './AddContact';
import Contact from './Contact';
import Search from './Search';

const App = () => {
  const [persons, setPersons] = useState([]);
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

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data));
  }, []);

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
