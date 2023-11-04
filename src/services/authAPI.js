import axios from 'axios';

const phoneBookInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

export const setToken = token => {
    phoneBookInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

//__________________реєстрація користувача___________
export const requestRegister = async newUser => {
  // formData - {email: "adwad@gmail.com", password: "123456788", name: "Oleg"}
  const { data } = await phoneBookInstance.post('/users/signup', newUser);
  setToken(data.token);
  return data;
};

//__________________логінізація користувача___________
export const requestLogin = async formData => {
    // formData - {email: "adwad@gmail.com", password: "123456788"}
  const { data } = await phoneBookInstance.post('/users/login', formData);
  setToken(data.token);
  return data;
};

export const dellToken = () => {
  delete phoneBookInstance.defaults.headers.common['Authorization'];
};


export const requestLogout = async () => {
  const { data } = await phoneBookInstance.post('/users/logout');

  return data;
};

export const requestGetUser = async () => {
  const { data } = await phoneBookInstance.get('/users/current');

  return data;
};

// ******************для книги контактів*******************
export const requestAllContacts = async () => {
  const { data } = await phoneBookInstance.get('/contacts');

  return data;
};

export const requestAddContact = async newContact => {
  const { data } = await phoneBookInstance.post('/contacts', newContact);
  return data;
};

export const requestDeleteContact = async contactId => {
  const { data } = await phoneBookInstance.delete(`/contacts/${contactId}`);

  return data;
};