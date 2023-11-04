import React from 'react'
import  './HomePage.css';

const HomePage = () => {
  return (
    <div className="containerHomePage">
      <div>
        <p className='textTitle'>Welcome to the CONTACT BOOK website!</p>
        <p className="textHome">
          Here is you can save the phone numbers of your friends and
          acquaintances. To start using the site, log in. If you are not
          authorized, you must first register and then log in. After this, you
          can save the contacts of your friends and not worry if they get lost
          on your phone or notepad. Your contact data is always safe with us!
        </p>
      </div>
    </div>
  );
}

export default HomePage;
