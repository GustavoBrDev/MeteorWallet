import React from 'react';;
import { Header } from './Header';
import { BrowserRouter } from "react-router-dom";
import { Router } from './Router';
import { AlertProvider, Alert } from 'meteor/quave:alert-react-tailwind';

export const App = () => (

  <BrowserRouter>
    <AlertProvider>
    <div>
      <Header />
      <Alert Component={Alert}/>
      <div className="max-h-screen">
        <div className="max-w-4xl p-2 mx-auto">
          <Router></Router>
        </div>
      </div>
    </div>
    </AlertProvider>
  </BrowserRouter>
);
