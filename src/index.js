import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import store from './states/store';
import NotifyProvider from './contexts/NotifyContext';
import ProfileProvider from './states/user';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './states/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ProfileProvider>
          <NotifyProvider>
            <App />
          </NotifyProvider>
        </ProfileProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
