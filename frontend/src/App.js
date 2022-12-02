import './App.css';
import { BrowserRouter, Routes as Router, Route, useParams } from 'react-router-dom'

import * as React from 'react';

import LandingPage from "./pages/landing/LandingPage";
import StorePage from "./pages/store/StorePage"
import ProductPage from "./pages/product/ProductPage";

import UserContext from './context/UserContext';

function App() {

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Router>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/store/:id" element={<StorePage/>}/>
          <Route path="/products/:id" element={<ProductPage/>}/>
        </Router>
      </BrowserRouter>
    </UserContextProvider>
    <UserContext.Provider>
      <BrowserRouter>
        <Router>
            <Route path="/" 
                  element={<LandingPage />} 
                  />
            {/* <Route path="/store/:id" 
                  element={<StorePage category={allCategory}
                                      allProducts={allProducts}
                                      allStore={allStore}
                                      />} 
                  />
            <Route path="/products/:id" 
                  element={<ProductPage category={allCategory}
                                        allProducts={allProducts}
                                        allStore={allStore}
                                        />} 
                  /> */}
        </Router>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
