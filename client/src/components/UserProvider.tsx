import React from 'react';
import ReactDOM from 'react-dom/client';  // Use 'react-dom/client' for React 18+
import App from '../App';
import { UserProvider } from './UserContext';  // Ensure UserProvider is exported correctly

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);  // Create the root
root.render(
    <UserProvider>
        <App />
    </UserProvider>
);
