import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { refreshThunk } from '../redux/authReducer';
import Layout from '../Layout/Layout';
import { useDispatch } from 'react-redux';
import PrivateRoute from '../components/PrivateRoutes/PrivateRoute';
import RestictedRoute from '../components/RestictedRoute/RestictedRoute';

const ContactsBookPage = lazy(() => import('../pages/ContactsBook/ContactsBookPage'));
const LoginPage = lazy(() => import('../pages/Login/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Register/RegisterPage'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));

const App = () => {  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={'Loading.....'}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="register"
              element={
                <RestictedRoute>
                  <RegisterPage />
                </RestictedRoute>
              }
            />

            <Route
              path="contacts"
              element={
                <PrivateRoute>
                  <ContactsBookPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
