import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  requestGetContacts,
  requestDeleteContactId,
  requestPOSTContacts,
} from '../services/API';

//санка для отримання усіх контактів
export const getRequestContacts = createAsyncThunk(
  'contacts/get',
  async (_, thunkAPI) => {
    try {
      const contactsData = await requestGetContacts();
      return contactsData; // ЦЕ БУДЕ ЗАПИСАНО В ЕКШИН ПЕЙЛОАД
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//санка для отримання id контакта, який потрібно видалити
export const deleteRequestContact = createAsyncThunk(
  'contacts/delete',
  async (id, thunkAPI) => {
    try {
      const contactId = await requestDeleteContactId(id);
      return contactId; // ЦЕ БУДЕ ЗАПИСАНО В ЕКШИН ПЕЙЛОАД
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addRequestContact = createAsyncThunk(
  'contacts/add',
  async (newContact, thunkAPI) => {
    try {
      const contact = await requestPOSTContacts(newContact);
      return contact; // ЦЕ БУДЕ ЗАПИСАНО В ЕКШИН ПЕЙЛОАД
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  // contacts: [],
  // isLoading: false,
  // error: null,
  // filter:'',
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      //кейси для отримання контактів
      .addCase(getRequestContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRequestContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload; // state.posts = action.payload
      })
      .addCase(getRequestContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //кейси для видалення контактів
      .addCase(deleteRequestContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteRequestContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(deleteRequestContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //кейси для додавання контактів
      .addCase(addRequestContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addRequestContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
        // state.items = [action.payload, ...state.items];
        // state.items.push(action.payload); для прикладу собі зберегла :D
      })
      .addCase(addRequestContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
