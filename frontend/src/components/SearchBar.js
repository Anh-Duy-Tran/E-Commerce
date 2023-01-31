import { TextField } from '@mui/material';
import * as React from 'react';
import { UserContext } from '../context/User/UserProvider';


const SearchBar = () => {
  const { state, dispatch } = React.useContext(UserContext);

  const clearSearch = () => dispatch({ type : "set-search-prompt", payload : ""});
  const setSearch = (s) => dispatch({ type : "set-search-prompt", payload : s});

  React.useEffect(
    () => {
      clearSearch()    
    }, []
  )

  return (
    <TextField
      sx={{
        mt : 15, 
        input : {color : "black" }, 
        "& .MuiOutlinedInput-root": {
                                      "&.Mui-focused fieldset": {
                                        borderColor: "black",
                                        color : 'black'
                                      }
                                    }
      }}
      margin='none'
      fullWidth
      onChange={(e) => setSearch(e.target.value)}
      label="Search product"
      autoComplete="search-product"
      value={state.searchPrompt}
    />
  )
}

export default SearchBar