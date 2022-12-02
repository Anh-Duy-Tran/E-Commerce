import './App.css';
import { BrowserRouter, Routes as Router, Route, useParams } from 'react-router-dom'

import LandingPage from "./pages/landing/LandingPage";
import StorePage from "./pages/store/StorePage"
import ProductPage from "./pages/product/ProductPage";

// TODO: convert this to fetch data (catagory titles) from backend
import allCategory from './category.json';
import allProducts from './products.json';
import allStore from './store.json';

import UserContextProvider from './context/UserContextProvider';


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
  );
}

export default App;