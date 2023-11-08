import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderComponent.css';
// import { GiClosedDoors } from 'react-icons/gi';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { useSelector, useDispatch } from 'react-redux';
import { selectAuthenticated, selectUser } from '../../redux/authSelectors';
import { logOut } from '../../redux/authReducer';
import { dellToken } from '../../services/authAPI';

const HeaderComponent = () => {
  const authenticated = useSelector(selectAuthenticated);
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    dellToken();
  };

  return (
    <header className="containerHeader">
      {authenticated ? (
        <div className="container">
          <NavLink className="text" to="contacts">
            CONTACT BOOK
          </NavLink>

          <div className="AuthContainer">
            <NavLink className="text2">{userData.name}</NavLink>
            <button className="btn" type="submit" onClick={handleLogOut}>
              {/* <GiClosedDoors size={40}/> */}
              <ExitToAppIcon color="primary" fontSize="large" />
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <div>
            <NavLink className="text2" to="/">
              Home
            </NavLink>
          </div>
          <div className="AuthContainer">
            <NavLink className="textLogin" to="/login">
              Login
            </NavLink>
            <NavLink className="textSignUp" to="/register">
              Sign up
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
