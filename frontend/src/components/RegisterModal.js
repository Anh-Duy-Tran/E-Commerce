import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';

import loginService from '../services/login';
import { UserContext } from '../context/User/UserProvider';

const theme = createTheme();

const LoginButtonStyle = {
  color : "white",
  fontFamily : "Futura",
  backgroundColor : "black",
  mt: 3, 
  mb: 2,
  "&:hover": {
    backgroundColor : "black",
    textDecoration: "underline #FFFFFF"
  }
}

const Signup = ({handleSubmit}) => {
  const { state, } = React.useContext(UserContext);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{fontFamily: 'Futura', }} component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Grid container>
              <Grid item xs>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password-repeat"
                  label="Repeat password"
                  type="password"
                  id="password-repeat"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Typography>
              {state.signupMessage}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={LoginButtonStyle}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  bgcolor: 'background.paper',
  p: 4,
};

const RegisterModal = () => {
  const { state, dispatch } = React.useContext(UserContext)

  const handleClose = () => dispatch({ type: "close-register" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const information = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      repeat_password: data.get('password-repeat')
    };

    if (information.password !== information.repeat_password) {
      dispatch({ type : "set-signup-message", payload : "The repeat password does not match the original password. Please re-enter your password."});
      return;
    }
    
    try {
      await loginService.register(information);
      dispatch({ type : "set-signup-message", payload : "Sign up new account success."});
      setTimeout(handleClose, 1000);
    } catch (error) {
      console.log(error.response.data.error.message);
    }
  };


  return (
    <div>
      <Modal
        open={state.registerOpen}
        onClose={handleClose}
      >
        <Fade in={state.registerOpen}>
          <Box sx={style}>
            <Signup handleSubmit={handleSubmit}></Signup>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}



export default RegisterModal;
