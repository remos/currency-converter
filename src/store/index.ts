import { configureStore } from '@reduxjs/toolkit';

import conversion from './conversion/reducer';

const store = configureStore({
  reducer: {
    conversion,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
export const subscribe = store.subscribe;

export default store;
