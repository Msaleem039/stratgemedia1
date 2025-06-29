import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from '../product/productSlice'
import productSlice from "../product/productSlice";

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import authReducer from '../auth/authSlice'
    const persistConfig = {
    key: 'root',
    storage
};
const reducers = combineReducers({
   products:productSlice,
    
        auth:authReducer
})
const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
 reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
})

export default store

