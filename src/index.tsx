import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import {SessionProvider} from './contexts/session/SessionProvider';

import {theme} from './chakra-themes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <SessionProvider>
          <App />
        </SessionProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
