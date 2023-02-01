import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/User/UserProvider"
import adminService from '../services/admin'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container } from "@mui/system";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, CardActions, TextField } from "@mui/material";


const buttonStyle = {
  fontSize : 10,
  color : "white",
  fontFamily : "Futura",
  marginLeft : "12px",
  marginRight : "50px",
  backgroundColor : "black",
  "&:hover": {
    backgroundColor : "black",
    textDecoration: "underline #FFFFFF"
  }
}

const BasicCard = ({ user }) => {
  return (
    <Card sx={{ width : 300, flexGrow : 1, maxWidth: 400 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14, fontFamily : "Futura" }}>
          {
            `Username: ${user.username}`
          }
        </Typography>
        <Typography sx={{fontSize: 12, mb: 1.5, fontFamily : "Futura" }} color="text.secondary">
          {
            `Role: ${user.role}`
          }
        </Typography>
        <Typography sx={{fontSize: 14, fontFamily : "Futura" }} variant="body2">
          {
            `Contact information:`
          }
        </Typography>
        <Typography sx={{fontSize: 14, mb: 1.5, fontFamily : "Futura" }} variant="body2">
          {
            `Email: ${user.email}`
          }
        </Typography>
      </CardContent>
      <CardActions sx={{ mb: 1, display : "flex", justifyContent : "space-around"}}>
        
        <Button sx={buttonStyle}>
          Delete user
        </Button>

        <Button sx={buttonStyle}>
          {`Change role to ${user.role === 'admin' ? 'customer' : 'admin'}`}
        </Button>
      
      </CardActions>
    </Card>
  );
}

const UserCards = () => {
  
  const { state, dispatch } = useContext(UserContext);

  const [ searchSetting, setSearchSetting ] = useState('name');
  const [ searchPrompt, setSearchPrompt ] = useState('');

  useEffect(() => {
    dispatch({ type : "fetching" });
    
    adminService
      .getAllUser(Cookies.get('access_token'))
      .then(users => {
        dispatch({ type : "set-user-list", payload : users });
        dispatch({ type : "fetch-success" });
      })
      .catch(e => {
        console.log(e);
      })
  }, [])
  
  return (
    <>
      <Container component="main" sx={{mt : 15, display : "flex", gap : 1}}>
        <FormControl sx={{ width : 150}}>
          <InputLabel id="demo-simple-select-label">Search by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchSetting}
            label="Search by"
            onChange={(e) => { setSearchSetting(e.target.value)}}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormControl>
        <TextField 
                  sx={{ flexGrow : 1}}
                  variant="outlined"
                  label={`Search by ${searchSetting}`}
                  value={searchPrompt}
                  onChange={(e) => { setSearchPrompt( e.target.value )}}>

        </TextField>
      </Container>
      {
        state.userList
        ? <Container component="main" sx={{mt : 7, display : "flex", flexWrap: "wrap", gap : 2}}>
            <Container>
              <Typography sx={{ fontFamily : "Futura", fontSize : 30}}>
                Admin users:
              </Typography>  
              
              <Container sx={{mt : 3, display : "flex", flexWrap: "wrap", gap : 2}}>
              {
                state.userList
                  .filter( user => user.role === 'admin')
                  .filter( user => searchSetting === 'email' ? user.email.toUpperCase().includes(searchPrompt.toUpperCase()) 
                                                             : user.username.toUpperCase().includes(searchPrompt.toUpperCase()))
                  .map(
                    user => <BasicCard user={user}/>
                  )
              }
              </Container>
            
            </Container>

            <Container>
              <Typography sx={{mt : 5, fontFamily : "Futura", fontSize : 30}}>
                Customer users:
              </Typography>  
              
              <Container sx={{mt : 3, display : "flex", flexWrap: "wrap", gap : 2}}>
              {
                state.userList
                  .filter( user => user.role === 'customer')
                  .filter( user => searchSetting === 'email' ? user.email.toUpperCase().includes(searchPrompt.toUpperCase()) 
                                                             : user.username.toUpperCase().includes(searchPrompt.toUpperCase()))
                  .map(
                    user => <BasicCard user={user}/>
                  )
              }
              </Container>
            
            </Container>

          </Container>

        : null
      }
    </>
  )
}

export default UserCards