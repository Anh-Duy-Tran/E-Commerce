import './App.css';
import { BrowserRouter, Routes as Router, Route } from 'react-router-dom'

import LandingPage from "./pages/landing/LandingPage";
import StorePage from "./pages/store/StorePage"
import ProductPage from "./pages/product/ProductPage";

import { UserProvider } from './context/User/UserProvider';


function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Router>
          <Route path="/" element={<LandingPage/>}/>
          
          <Route path="/store/:id1" element={<StorePage/>}/>
          <Route path="/store/:id1/:id2" element={<StorePage/>}/>

          <Route path="/products/:id" element={<ProductPage/>}/>
        </Router>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;