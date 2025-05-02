import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import { persistStore,persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import userReducer from '@/redux/slices/userSlice';
import adminReducer from '@/redux/slices/adminSlice';
import propertyReducer from '@/redux/slices/propertSlice';

// configuration for the persisted reducer
const persistConfig = {
    key:'root',
    storage,
    whitelist:['user','admin','job']
}

// object of the root reducer
const rootReducer = {
    user:userReducer,
    admin:adminReducer,
     property:propertyReducer
}

// make the persisted reducers
const persistedReducer = persistReducer(persistConfig,combineReducers(rootReducer));
const store = configureStore({
reducer:persistedReducer,
middleware:(getDefaultMiddleware)=> {
   return getDefaultMiddleware({
        serializableCheck: false,
    }).concat(logger);
}
});


let persistor;
if(typeof window !== 'undefined'){
    persistor = persistStore(store);
}
export type AppDispatch = typeof store.dispatch; 
export type RootState = ReturnType<typeof store.getState>;

export {persistor,store};