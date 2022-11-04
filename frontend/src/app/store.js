import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { applyMiddleware } from 'redux';
import userReducer from './features/user/userSlice'
import globalReducer from './features/global/globalSlice'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
import projectReducer  from './features/project/project';
import taskChangeReducer  from './features/task/taskChangeSlice';

const reducers = combineReducers({
    global: globalReducer,
    user: userReducer,
    project: projectReducer,
    taskChange: taskChangeReducer
});
 
const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger)
})