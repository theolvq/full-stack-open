import React, { useEffect, useState } from 'react';
import AddContact from './AddContact';
import Contact from './Contact';
import Search from './Search';
import contactService from './services/contacts';

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
      alert(
        `${personObject.name} is already added to phonebook, replace the old number with the new one?`
      );
      const alreadyAddedContact = persons.find(
        person => person.name === personObject.name
      );
      contactService
        .update(alreadyAddedContact.id, personObject)
        .then(returnedContact =>
          setPersons(
            persons.map(person =>
              person.id !== alreadyAddedContact.id ? person : returnedContact
            )
          )
        );
      setNewName('');
      setNewNumber('');
      return;
    }
    contactService.create(personObject).then(returnedContact => {
      setPersons(persons.concat(returnedContact));
      setNewName('');
      setNewNumber('');
    });
  };

  const handleDelete = id => {
    const person = persons.find(person => person.id === id);
    const confirmation = window.confirm(
      `Are you sure you want to delete ${person.name}`
    );
    if (confirmation) {
      contactService.deleteContact(id).then(_ => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }

    console.log('clicking', id);
  };

  const contactsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterInput.toLowerCase())
  );

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => setPersons(initialContacts));
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
        <Contact key={person.id} person={person} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default App;
