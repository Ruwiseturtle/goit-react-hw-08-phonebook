import React from 'react';
import css from './IconButtons.module.css';
// import PropTypes from 'prop-types';

const IconButton = ({ children, onClick }) => (
  <button type="button" className={css.IconButton} onClick={onClick}>
    {children}
  </button>
);


export default IconButton;
