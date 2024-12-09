import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n'; // Important: importer i18n avant App
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);