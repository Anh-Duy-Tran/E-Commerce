import './App.css';
import { BrowserRouter, Routes as Router, Route } from 'react-router-dom'

import LandingPage from "./pages/landing/LandingPage";
import ProductsPage from "./pages/product/ProductsPage";


function App() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Router>
    </BrowserRouter>
  );
}

export default App;
