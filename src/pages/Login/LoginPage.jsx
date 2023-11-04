import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuthenticated } from '../../redux/authSelectors';
import './LoginPage.css';
import LoginForm from "../../components/LoginForm/LoginForm";

const Authentication = () => {
  const navigate = useNavigate();
  const authenticated = useSelector(selectAuthenticated);
  
  useEffect(() => {
    if (authenticated) {
      navigate('/contacts');
    }
  }, [authenticated, navigate]);
  
  

  return (
    <div className='loginPageBody'>
      <LoginForm/>
    </div>
      
    
  );
};

export default Authentication;
