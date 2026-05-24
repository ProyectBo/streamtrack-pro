import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if (typeof window !== 'undefined' && !window.storage) {
  window.storage = {
    get: async (key) => {
      try { const v = localStorage.getItem(key); return v ? {key, value:v} : null; }
      catch { return null; }
    },
    set: async (key, value) => {
      try { localStorage.setItem(key, value); return {key, value}; }
      catch { return null; }
    },
    delete: async (key) => {
      try { localStorage.removeItem(key); return {key, deleted:true}; }
      catch { return null; }
    },
    list: async (prefix) => {
      try {
        const keys = Object.keys(localStorage).filter(k => !prefix || k.startsWith(prefix));
        return {keys};
      } catch { return {keys:[]}; }
    }
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
