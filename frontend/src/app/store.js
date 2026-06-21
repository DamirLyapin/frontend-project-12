import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import modalReducer from '..slices/modalSlice'
import chatReducer from '../slices/chatSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    chat: ChatReducer,
    modal: modalReducer
  },
});
