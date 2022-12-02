import React from "react";
import { reducer, initialState } from "./reducer.js";

export const UserContext = React.createContext({
  state: initialState,
  dispatch: () => null
});

export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[ state, dispatch ]}>
    	{ children }
    </UserContext.Provider>
  )
}