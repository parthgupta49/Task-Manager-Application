import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducers } from './reducer';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: rootReducers
})


root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </Provider>
);

