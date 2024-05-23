import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { KeybanEddsaProvider } from '@keyban/sdk-react';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KeybanEddsaProvider>
      <App />
    </KeybanEddsaProvider>
  </React.StrictMode>,
);
