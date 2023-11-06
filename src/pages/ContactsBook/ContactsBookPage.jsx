import Filter from '../../components/Filter/Filter';
import ContactList from '../../components/ContactList/ContactList';
import ContactForm from '../../components/ContactForm/ContactForm';
import {useDispatch } from 'react-redux';
import { getRequestContacts } from '../../redux/phoneBookReducer';
import { useEffect } from 'react';
import './ContactsBookPage.css';


const ContactsBookPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequestContacts());
  }, [dispatch]);

  return (
    <div className="containerContacts">
      {/* <div className="boxTitle">
        <h1>My contacts</h1>
      </div> */}
      <div className="boxForm">
        <ContactForm />
        <Filter />
      </div>
      <div className="boxContacts">
        <ContactList />
      </div>
    </div>
  );
};

export default ContactsBookPage;
