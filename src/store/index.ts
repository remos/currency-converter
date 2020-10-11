import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: (state, action) => ({ ...state }),
});

export const dispatch = store.dispatch;
export const getState = store.getState;
export const subscribe = store.subscribe;
