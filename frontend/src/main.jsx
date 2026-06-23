import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './i18n.js'
import store from './app/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
