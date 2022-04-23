import { createSlice } from '@reduxjs/toolkit';
import { contacts } from 'contactData/contacts';
import { nanoid } from 'nanoid';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: { value: contacts },
  reducers: {
    addContact(state, { payload }) {
      state.value = [
        { createdAt: Date.now(), id: nanoid(), ...payload },
        ...state.value,
      ];
    },
    editContact(state, { payload }) {
      const contactIndex = state.value.findIndex(el => el.id === payload.id);
      state.value[contactIndex] = { ...state.value[contactIndex], ...payload };
    },
    deleteContact(state, { payload }) {
      state.value = state.value.filter(el => el.id !== payload);
    },
  },
});
