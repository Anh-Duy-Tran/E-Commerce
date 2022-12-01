import './App.css';
import { BrowserRouter, Routes as Router, Route, useParams } from 'react-router-dom'

import LandingPage from "./pages/landing/LandingPage";
import StorePage from "./pages/store/StorePage"
import ProductPage from "./pages/product/ProductPage";

// TODO: convert this to fetch data (catagory titles) from backend
import allCategory from './category.json';
import allProducts from './products.json';
import allStore from './store.json';

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" 
               element={<LandingPage category={allCategory}/>} 
               />
        <Route path="/store/:id" 
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
               />
      </Router>
    </BrowserRouter>
  );
}

export default App;
