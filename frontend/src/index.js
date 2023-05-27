// frontend/src/index.js
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'; // createRoot'u react-dom/client modülünden alın
import store from './store';
import App from './App';

// ReactDOM.render yerine createRoot kullanın
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);





