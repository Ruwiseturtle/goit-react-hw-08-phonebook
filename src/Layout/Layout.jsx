// import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import  Header  from '../components/Header/HeaderComponent';
import './Layout.css';

export const Layout = () => {
  return (
    <div className='containerMain'>
      <Header />
      <Outlet />
     
    </div>
  );
};

export default Layout;