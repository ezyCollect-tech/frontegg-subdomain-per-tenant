import React from 'react';
import ReactDOM from 'react-dom'; // For react 17
// For react 18: import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://yourcustomdomain.com/',
  clientId: '[CLIENT_ID]', // Client ID from Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings page
  appId: "[APPLICATION_ID]", // ID of the application from Frontegg Portal ➜ [ENVIRONMENT] ➜ Applications

  tenantResolver: () => {
    const domainParts = window.location.host.split('.');
    // Check if the host is accessed with a subdomain
    if (domainParts.length > 2) {
        const organization = domainParts[0]; // Assuming 'client1' is the tenant identifier i.e 'client1.yourdomain.com'
        return { tenant: organization };
    } else {
        return { tenant: undefined }; // Default tenant or behavior for accessing the root domain (this is the default login box you see in the builder)
    }
},
};

const authOptions = {
 keepSessionAlive: true, // refreshes user token automatically when it reaches 80% expiration time
 enableSessionPerTenant: true
};

ReactDOM.render(
  <FronteggProvider 
    contextOptions={contextOptions}
    hostedLoginBox={false} // Embedded login mode
    authOptions={authOptions}
  >
    <App />
  </FronteggProvider>,
  document.getElementById('root')
);