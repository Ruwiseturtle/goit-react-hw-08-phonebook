import './ContactList.css';
// import { deleteContact} from '../../redux/phoneBookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRequestContact } from '../../redux/phoneBookReducer';
import {
  selectContacts,
  selectContactIsLoading,
  selectContactError,
  selectContactFilter,
} from '../../redux/contacts.selectors';
import { ChakraProvider } from '@chakra-ui/react';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectContactFilter);
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactIsLoading);
  const error = useSelector(selectContactError);
  const selectedContacts = filteredContacts();

  function filteredContacts() {
    if (filter === '') {
      return contacts;
    } else {
      return contacts.filter(
        ({ name, phone }) =>
          name.toLowerCase().includes(filter.toLowerCase()) ||
          phone.split('-').join('').includes(filter)
      );
    }
  }

  //ф-ція викликається при натиснення кнопки видалення контакту
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(deleteRequestContact(e.target.name));
  };

  return (
    <div className="conteinerContactList">
      {isLoading && <h3>Loading...</h3>}
      {error && <p>{error}</p>}
      <ul className="contactList">
        {selectedContacts &&
          selectedContacts.map(contact => (
            <li
              key={`${contact.name}_${contact.phone}`}
              className="contactInfo"
            >
              <p className="contactName">{contact.name}: </p>
              <p className="contactPhone"> {contact.phone}</p>
              <button
                className="btnContact"
                name={contact.id}
                onClick={handleSubmit}
              >
                delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ContactList;
