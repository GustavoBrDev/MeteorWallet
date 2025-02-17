import React from 'react';;
import { Header } from './Header';
// @ts-ignore
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './Home';


export const App = () => (

  <BrowserRouter>
    <Routes>
      <Route
        index
        element={
          <div>
            <Header />
            <div className="min-h-full">
              <div className="max-w-4xl mx-auto p-2">
                <Home/>
              </div>
            </div>
          </div>
        }
      />
      <Route path="/chat/:chatId" element={<div>Chat!</div>} />
    </Routes>
  </BrowserRouter>
);
