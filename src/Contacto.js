
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
/*
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
*/
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

/*

const url_confirmacion = 'http://localhost/ws-login/confirmacion.php';

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
    window.localStorage.setItem('confirmacion', JSON.stringify(json));
    const user = JSON.parse(window.localStorage.getItem('confirmacion'));
    const confirmacion = user.confirmacion;
    if (confirmacion == true) {
        window.location.replace("/Validación");
        window.localStorage.removeItem('registro');
        window.localStorage.removeItem('confirmacion');

    }

    console.warn();



}
*/



export default function Register() {

/*
    const handleAsignacion = () => {
        const data = {
            dpi: dpi,
            dosis: dosis_verificada
        }
        console.log(data);
        enviarDatos(url_confirmacion, data);
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






    const data = JSON.parse(localStorage.getItem('registro'));
    const dpi = data.dpi;
    const nombre = (data.nombre + ' ' + data.apellido);
    const nacimiento = data.fecha_nacimiento;
    const dosis_verificada = data.dosis;
    const vacuna = data.vacuna;
    const dosis1_fecha = data.dosis1_fecha;
    const dosis2_fecha = data.dosis2_fecha;
    const refuerzo_fecha = data.refuerzo_fecha;
    const dosis1 = data.dosis1;
    const dosis2 = data.dosis2;
    const dosis3 = data.dosis3;
*/


    return (

        <Container component="main" maxWidth="xs" id="contacto" >
            <CssBaseline />
            <div className="form" id="divContacto">
                <Box fullWidth

                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Comentarios
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 , width: '80%'}}>

                            <TextField
                                margin="normal"
                                fullWidth
                                multiline
                                rows={15}
                                id="comentario"
                                
                            />
    
           

                        <Button
                            
                            type="submit"
                            
                            variant="contained"
                            sx={{ mt: 3, mb: 2, maxWidth: 500 , width: '90%'}}
                        >
                            Enviar
                        </Button>
                    </Box>
                </Box>
            </div>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}