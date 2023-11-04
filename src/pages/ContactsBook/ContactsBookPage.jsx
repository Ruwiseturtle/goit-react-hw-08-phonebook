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
      <h1 className="title">My contacts</h1>      
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactsBookPage;
