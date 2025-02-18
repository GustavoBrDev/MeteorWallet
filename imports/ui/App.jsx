import React from 'react';;
import { Header } from './Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './Home';
import { NotFound } from './NotFound';
import { SignUp } from './SignUp';
import { RoutePaths } from './RoutePaths';

export const App = () => (

  <BrowserRouter>
    <div>
      <Header />
      <div className="min-h-full">
        <div className="max-w-4xl mx-auto p-2">
          <Routes>
            <Route path= {RoutePaths.HOME} element={<Home/>} />
            <Route path= {RoutePaths.SIGN_UP} element={<SignUp/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </div>
    </div>
  </BrowserRouter>
);
