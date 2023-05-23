// frontend\src\index.js  
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createRoot } from 'react-dom/client'; // createRoot'u react-dom/client'tan import edin
import rootReducer from './reducers';
import App from './App';

const store = createStore(rootReducer);

// ReactDOM.render yerine createRoot kullanın
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);




