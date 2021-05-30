import React, { useEffect, useState } from 'react';
import AddContact from './components/AddContact';
import Contact from './components/Contact';
import Notification from './components/Notification';
import Search from './components/Search';
import contactService from './services/contacts';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

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
        .then(returnedContact => {
          setPersons(
            persons.map(person =>
              person.id !== alreadyAddedContact.id ? person : returnedContact
            )
          );
          setConfirmationMessage(
            `${personObject.name}'s number was changed to ${personObject.number}.`
          );
          setTimeout(() => setConfirmationMessage(null), 5000);
        })
        .catch(err => {
          console.log(err.response.data);
          setConfirmationMessage(err.response.data.error);
          setTimeout(() => setConfirmationMessage(null), 5000);
        });
      setNewName('');
      setNewNumber('');
      return;
    }
    contactService
      .create(personObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact));
        setConfirmationMessage(
          `${personObject.name} was added to the contacts list.`
        );
        setTimeout(() => setConfirmationMessage(null), 5000);
        setNewName('');
        setNewNumber('');
      })
      .catch(err => {
        console.log(err.response.data.error);
        setConfirmationMessage(err.response.data.error);
        setTimeout(() => setConfirmationMessage(null), 5000);
      });
  };

  const handleDelete = id => {
    const person = persons.find(person => person.id === id);
    const confirmation = window.confirm(
      `Are you sure you want to delete ${person.name}`
    );
    if (confirmation) {
      contactService
        .deleteContact(id)
        .then(_ => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(err => {
          setConfirmationMessage(err.response.data.error);
          setTimeout(() => setConfirmationMessage(null), 5000);
        });
    }
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
      <Notification message={confirmationMessage} />
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
