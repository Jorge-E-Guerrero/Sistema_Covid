import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


/*
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
*/




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const url_login = 'http://localhost/ws-login/login2.php';

const enviarDatos = async (url, data) => {
  const respuesta = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': "application/json"
    }
  })
  console.log(respuesta);
  const json = await respuesta.json();
  console.log(json);
  window.localStorage.setItem('info', JSON.stringify(json));
  const user = JSON.parse(window.localStorage.getItem('info'));
  console.warn();

  const conexion = user.conectado;
  if (conexion === true) {
    window.location.reload();
    window.location.replace("/Home");
  }

  //ToHome();

}

/*

function ToHome() {
  let history = useHistory();
  history.push('/Home');
}
*/



export default function Login() {


  const refDPI = React.useRef(null);
  const refPassword = React.useRef(null);
  const handleLogin = () => {
    const data = {
      dpi: refDPI.current.value,
      clave: refPassword.current.value
    }
    console.log(data);
    enviarDatos(url_login, data);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      dpi: data.get('dpi'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="form">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ minWidth:400 , mt: 1 }}>
              <TextField
                inputRef={refDPI}
                margin="normal"
                required
                fullWidth
                id="dpi"
                label="dpi"
                name="dpi"
                autoComplete="DPI"
                autoFocus

              />
              <TextField
                inputRef={refPassword}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Log in
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Aún no tienes cuenta? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          
        </div>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      
    </ThemeProvider>
  );
}