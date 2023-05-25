// frontend\src\index.js  
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom'; // createRoot'u react-dom'dan import edin
import store from './store';
import App from './App';

// ReactDOM.render yerine createRoot kullanın
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);





