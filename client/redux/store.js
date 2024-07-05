import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slices/authSlice.js'

const store = configureStore({
    reducer : {
        auth : authReducer
    },
    devTools : true
});

export default store;