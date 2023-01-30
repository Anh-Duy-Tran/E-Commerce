import './App.css';
import { BrowserRouter, Routes as Router, Route } from 'react-router-dom'

import LandingPage from "./pages/landing/LandingPage";
import StorePage from "./pages/store/StorePage"
import ProductPage from "./pages/product/ProductPage";

import { UserProvider } from './context/User/UserProvider';
import AdminStore from './pages/admin/AdminStore';
import AdminUser from './pages/admin/AdminUser';


function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Router>
          <Route path="/" element={<LandingPage/>}/>
          
          <Route path="/store/:id1" element={<StorePage/>}/>
          <Route path="/store/:id1/:id2" element={<StorePage/>}/>

          <Route path="/products/:id" element={<ProductPage/>}/>

          <Route path="/admin/store" element={<AdminStore/>}/>
          <Route path="/admin/user" element={<AdminUser/>}/>
        </Router>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;