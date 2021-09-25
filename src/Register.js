
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import { createTheme, ThemeProvider } from '@mui/material/styles';

//import { useParams } from 'react-router-dom';

//import MultipleSelect from './MultipleSelect';


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

/*
const theme = createTheme({
    palette: {
        primary: {
            main: '#00ff20',
        },
        secondary: {
            main: '#f44336',
        },
    },
});
*/



const url_login = 'http://localhost/ws-login/validacion.php';

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
  window.localStorage.setItem('registro', JSON.stringify(json));
  const user = JSON.parse(window.localStorage.getItem('registro'));
  console.warn();

  const dosis_verificada = user.dosis;
  if (dosis_verificada === 'dosis1_fecha') {
    window.location.reload();
    window.location.replace("/Aplicacíon");

  } else if(dosis_verificada === 'dosis2_fecha') {
    //window.location.removeItem('registro');  
    window.location.replace('/Confirmación');
    
  } else if(dosis_verificada === 'refuerzo_fecha') {
    //window.location.removeItem('registro');  
    window.location.replace('/Confirmación');
    
  }else{
      window.alert('Error');
  }
  //ToHome();

}


export default function Register() {


    const refDPI = React.useRef(null);
    const handleLogin = () => {
        const data = {
        dpi: refDPI.current.value,
        centro: validacion_centro,
        dosis: validacion_dosis
        }
        console.log(data);
        enviarDatos(url_login, data);
    };






    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const [validacion_dosis, setDosis] = React.useState('');

    const handleChangeDosis = (event) => {
        setDosis(event.target.value);
    };

    const [validacion_centro, setCentro] = React.useState('');

    const handleChangeCentro = (event) => {
        setCentro(event.target.value);
    };


/*
    const data = JSON.parse(localStorage.getItem('info'));
    const dpi = data.dpi;
    const nombre = (data.nombre + ' ' + data.apellido);
*/


    return (

        <Container component="main" maxWidth="xs" >
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
                        Validación
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            
                            id="dpi"
                            label="DPI"
                            inputRef={refDPI}
                        />
                        <FormControl sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-helper-label" >Centro de Vacunacíon</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={validacion_centro}
                                label="Centro de Vacunacion"
                                onChange={handleChangeCentro}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value='UNIS'>UNIS</MenuItem>
                                <MenuItem value='Pradera Concepción'>Pradera Concepción</MenuItem>
                                <MenuItem value='Municipalidad Fraijanes'>Municipalidad Fraijanes</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-helper-label" >Dosis</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={validacion_dosis}
                                label="Dosis"
                                onChange={handleChangeDosis}
                            >
                                <MenuItem value='dosis1_fecha'>Primera</MenuItem>
                                <MenuItem value='dosis2_fecha'>Segunda</MenuItem>
                                <MenuItem value='refuerzo_fecha'>Refuerzo</MenuItem>
                            </Select>
                        </FormControl>


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                        >
                            Validar
                        </Button>
                        
                    </Box>
                </Box>
            </div>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}