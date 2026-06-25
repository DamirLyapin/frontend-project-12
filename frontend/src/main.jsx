import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './i18n.js'
import store from './app/store.js';
import './initProfanity'
import rollbar from './rollbar.js'
import { Provider as RollbarProvider } from '@rollbar/react';
createRoot(document.getElementById('root')).render(
  <RollbarProvider instance={rollbar}>
    <Provider store={store}>
      <App />
    </Provider>
  </RollbarProvider>
)
