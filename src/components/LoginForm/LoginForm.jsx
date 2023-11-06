import { React } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/authReducer';
import './LoginForm.css';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: event.currentTarget.elements.email.value.trim(),
      password: event.currentTarget.elements.password.value.trim(),
    };

    dispatch(loginThunk(user));
  };

  return (
    <div className="boxForm1">
      <form className="loginForm" onSubmit={handleSubmit}>
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
        <button className="loginBtn" type="submit">
         ok
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
