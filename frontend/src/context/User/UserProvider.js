import React, { useEffect } from "react";
import { reducer, initialState } from "./reducer.js";

import allCategory from '../../category.json';
import allProducts from '../../products.json';
import allStore from '../../store.json';

import loginService from '../../services/login';
import productService from '../../services/products';

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const authToken = (token) => {
  if (token === undefined) {
    return Promise.resolve(false);
  }

  return loginService
    .authenticate(token)
    .then(() => true)
    .catch(() => false);
}

export const UserContext = React.createContext({
  state: initialState,
  dispatch: () => null
});

export const UserProvider = ({ children }) => {
  
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type : "fetching", payload : allProducts });

    productService
      .fetchCategory()
      .then(products => {
        console.log(products);
        dispatch({ type : "update-products", payload : products });
        dispatch({ type : "update-category", payload : allCategory });
        dispatch({ type : "fetch-success", payload : allProducts });
      })
  }, [])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
    	{ children }
    </UserContext.Provider>
  )
}