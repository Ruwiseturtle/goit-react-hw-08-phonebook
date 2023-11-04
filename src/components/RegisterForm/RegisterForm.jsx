import React from 'react';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/authReducer';
import "./RegisterForm.css";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    
    const newUser = {
      name: event.currentTarget.elements.name.value,
      email: event.currentTarget.elements.email.value.trim(),
      password: event.currentTarget.elements.password.value.trim(),
    };
    
      dispatch(registerThunk(newUser)); 
      
    event.currentTarget.elements.name.value = '';
    event.currentTarget.elements.email.value = '';
    event.currentTarget.elements.password.value = '';
  };

    return (
      <div className="boxForm">
        <form className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="text">
            <span className="labelText"> name</span>
            <input
              className="loginInput"
              type="text"
              name="name"
              autoComplete="on"
            />
          </label>
          <label htmlFor="email">
            <span className="labelText"> email</span>
            <input
              className="loginInput"
              type="email"
              name="email"
              autoComplete="on"
            />
          </label>
          <label htmlFor="password">
            <span className="labelText"> password</span>
            <input
              className="loginInput"
              type="password"
              name="password"
              autoComplete="on"
            />
          </label>
          <button className="loginBtn" type="submit" onClick={handleSubmit}>
            sign up
          </button>
        </form>
      </div>
    );
};

export default RegisterForm;
