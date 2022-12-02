import * as React from "react";
import allCategory from '../category.json';
import allProducts from '../products.json';
import UserContext from "./UserContext";
import allStore from '../store.json';
import Cookies from 'js-cookie';

import loginService from '../services/login';

const UserContextProvider = ({children}) => {
  const [user, setUser] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);

  const toggleMenu = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenuOpen(! menuOpen);
  };

  const toggleCart = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setCartOpen(! cartOpen);
  };

  const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  React.useEffect(() => {
    const token = Cookies.get('access_token');
    if (token === null) {
      setUser(null);
    } else {
      loginService
        .authenticate(token)
        .then(() => setUser(parseJwt(token)))
        .catch(() => setUser(null));
    }
  }, [])

  return (
    <UserContext.Provider 
      value = {{
        user : [user, setUser],
        products : allProducts,
        category : allCategory,
        menu : [menuOpen, toggleMenu],
        cart : [cartOpen, toggleCart],
        stores : allStore
      }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;