import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';

import loginService from '../services/login';
import userService from '../services/user';
import cartController from '../controllers/cart';
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

const SignIn = ({handleSubmit}) => {
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
            Sign in
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Typography>
              {state.loginMessage}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={LoginButtonStyle}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
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

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const LoginModal = () => {
  const { state, dispatch } = React.useContext(UserContext)

  const handleClose = () => dispatch({ type: "close-login" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      username: data.get('username'),
      password: data.get('password'),
    };

    try {
      const token = await loginService.login(credentials);
      Cookies.set('access_token', token);
  
      dispatch({type : 'set-user', payload : parseJwt(token)});
      dispatch({ type : "set-login-message", payload : ""})
      handleClose();
    } catch (error) {
      dispatch({ type : "set-login-message", payload : "username or password is incorrect"})
    }
  };


  return (
    <div>
      <Modal
        open={state.loginOpen}
        onClose={handleClose}
      >
        <Fade in={state.loginOpen}>
          <Box sx={style}>
            <SignIn handleSubmit={handleSubmit}></SignIn>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}



export default LoginModal;
