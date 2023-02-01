import React, { useEffect } from "react";
import { reducer, initialState } from "./reducer";

import cartController from "../../controllers/cart";

import productService from '../../services/products';
import Cookies from "js-cookie";

export const UserContext = React.createContext(initialState);

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const UserProvider = ({ children }) => {
  
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      try {
        dispatch({type : 'set-user', payload : parseJwt(token)});
        dispatch({ type : "set-login-message", payload : ""});
      } catch (error) {
        Cookies.remove('access_token');
      }
    }

    dispatch({ type : "fetching" });
    productService
      .fetchCategory()
      .then(category => {
        dispatch({ type : "fetch-success" });
        dispatch({ type : "update-count", payload : cartController.getCartCount()})
        dispatch({ type : "update-total-price", payload : cartController.getTotalCartPrice()})
        dispatch({ type : "update-category", payload : category });
      })
  }, [])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
    	{ children }
    </UserContext.Provider>
  )
}