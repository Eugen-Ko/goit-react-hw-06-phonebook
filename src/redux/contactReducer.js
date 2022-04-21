import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { contacts } from 'contactData/contacts';

import storage from 'redux-persist/lib/storage';

const contactSlice = createSlice({
  name: 'contact',
  initialState: { value: contacts },
  reducers: {
    addContact(state) {
      state.value = { ...state.value };
    },
    editContact(state, { payload }) {
      const contactIndex = state.value.findIndex(el => el.id === payload);
      console.log(contactIndex, payload);
      state.value[contactIndex] = {
        ...state.value[contactIndex],
        name: 'qqq',
        phone: '000-000-0000',
      };
    },
    deleteContact(state, { payload }) {
      state.value = state.value.filter(el => el.id !== payload);
    },
  },
});

const persistConfig = {
  key: 'contact',
  storage,
  whitelist: ['value'],
};

export const contactReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);

export const { addCntact, editContact, deleteContact } = contactSlice.actions;
export const getContactList = state => state.value;
