import './Filter.css';
import { setFilter } from '../../redux/phoneBookReducer';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  const selectByValues = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="containerFilter">
      <label className='labelFilter'>
        <p className="textLabel">Find contacts by name</p>
        <input
          className="inputFilter"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={selectByValues}
        />
      </label>
    </div>
  );
};

export default Filter;
