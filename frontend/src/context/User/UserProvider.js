import React, { useEffect } from "react";
import { reducer, initialState } from "./reducer.js";

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
    dispatch({ type : "fetching" });

    productService
      .fetchCategory()
      .then(category => {
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