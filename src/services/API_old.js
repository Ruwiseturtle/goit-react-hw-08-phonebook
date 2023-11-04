import axios from 'axios';

const contactsInstance = axios.create({
  // baseURL: 'https://6538cb3ca543859d1bb1ed9f.mockapi.io',
     baseURL: 'https://connections-api.herokuapp.com',
});

export const requestGetContacts = async () => {
  const { data } = await contactsInstance.get('/contacts');
  console.log('API контакти');
  console.log(data);
    return data;
}


export const requestDeleteContactId = async (id) => {
  const { data } = await contactsInstance.delete(`/contacts/${id}`);
  return data;
};

export const requestPOSTContacts = async (newContact) => {
   const obj  = await contactsInstance.post('/contacts', newContact);
   return obj.data;
  
};