import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import localStorageReducer from "../slices/localStorageslice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    storage: localStorageReducer
  },
});

export default store;
