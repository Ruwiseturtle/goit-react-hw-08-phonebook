import './ContactForm.css';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { addRequestContact } from '../../redux/phoneBookReducer';
import { selectContacts } from '../../redux/contacts.selectors';

const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleAddContact = event => {
    event.preventDefault();

    const nameInput = event.currentTarget.elements.name.value;
    const phoneInput = event.currentTarget.elements.phone.value;

    const isThereSuchUser = contacts.some(
      ({ name, phone }) =>
        name.toLowerCase() === nameInput.toLowerCase() && phone === phoneInput
    );

    if (isThereSuchUser) {
      Notiflix.Notify.info('this contact is already in the list!');
      event.currentTarget.reset();
      return;
    }

    const newContact = {
      name: nameInput,
      number: phoneInput,
    };
   
    dispatch(addRequestContact(newContact));
    event.currentTarget.reset();
  };

  return (
    <div>
      <form className="contactForm" onSubmit={handleAddContact}>
        <label>
          <p className="textLabel">Name</p>
          <input
            className="inputName"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label>
          <p className="textLabel">Number</p>
          <input
            className="inputTel"
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className="btnAdContact" type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
