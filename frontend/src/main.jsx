import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import { SampleWorksContextProvider } from './context/SampleWorksContext.jsx';
import { PersonalInfoContextProvider } from './context/PersonalInfoContext.jsx'; 

const root = createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <SampleWorksContextProvider>
      <PersonalInfoContextProvider>
        <App />
      </PersonalInfoContextProvider>
    </SampleWorksContextProvider>
  </React.StrictMode>
);
