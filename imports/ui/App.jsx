import React from 'react';;
import { Header } from './Header';
import { BrowserRouter } from "react-router";
import { Home } from './Home';


export const App = () => (

  <BrowserRouter>
    <div>
      <Header />
      <div className="min-h-full">
        <div className="max-w-4xl mx-auto p-2">
          <Home/>
        </div>
      </div>
    </div>
  </BrowserRouter>
);
