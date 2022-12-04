import React, { useEffect } from "react";
import { reducer, initialState } from "./reducer.js";

import cartController from "../../controllers/cart.js";
import productService from '../../services/products';

export const UserContext = React.createContext(initialState);

export const UserProvider = ({ children }) => {
  
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type : "fetching" });
    productService
      .fetchCategory()
      .then(category => {
        dispatch({ type : "update-count", payload : cartController.getCartCount()})
        dispatch({ type : "update-total-price", payload : cartController.getTotalCartPrice()})
        dispatch({ type : "update-category", payload : category });
        dispatch({ type : "fetch-success" });
      })
  }, [])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
    	{ children }
    </UserContext.Provider>
  )
}