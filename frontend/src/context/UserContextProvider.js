import React, { createContext } from "react";
import allCategory from '../category.json';
import allProducts from '../products.json';
import UserContext from "./UserContext";
import allStore from '../store.json';

const UserContextProvider = ({children}) => {

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

  return (
    <UserContext.Provider 
      value = {{
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