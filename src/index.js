import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import * as Icon from 'react-bootstrap-icons'; */

//REDUX - import base e configureStore
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
//REDUX - import dei reducers
import bookSlice from "./states/bookState"
import myTrySlice from "./states/tryRedux"
import categorySlice from "./states/categoryState"
import commentsSlice from "./states/commentState"

const rootReducer = combineReducers({
  myReducerN1: bookSlice,
  myReducerN2: myTrySlice,
  category: categorySlice,
  bookComments: commentsSlice
});

const store = configureStore({
  reducer: rootReducer,
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

