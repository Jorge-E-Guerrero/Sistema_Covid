
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




}




export default function Register() {


    const handleAsignacion = () => {
        const data = {
            dpi: dpi
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



    return (

        <Container component="main" maxWidth="xs" id="confirmacion" >
            <CssBaseline />
            <div className="form" id="divConfirmacion">
                <Box

                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Confirmación de datos
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: 300 },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                            <TextField
                                margin="normal"
                                fullWidth
                                disabled
                                id="dpi"
                                label="DPI"
                                defaultValue={dpi}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                disabled
                                id="full-name"
                                label="Nombre"
                                defaultValue={nombre}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                disabled
                                id="nacimiento"
                                label="Nacimiento"
                                defaultValue={nacimiento}
                            />
                            <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="Dosis-Aplicada"
                            label="Dosis Aplicada"
                            defaultValue={vacuna}
                            />
                            <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="Dosis-Verificada"
                            label="Dosis verificada"
                            defaultValue={dosis_verificada}
                            />
                        </Box>
                        <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: 300 },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="fecha1"
                            label="Fecha de la primera dosis"
                            defaultValue={dosis1_fecha}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="aplicacion1"
                            label="1ra Dosis Aplicada"
                            defaultValue={dosis1}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="fecha2"
                            label="Fecha de la segunda dosis"
                            defaultValue={dosis2_fecha}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="aplicacion2"
                            label="2da Dosis Aplicada"
                            defaultValue={dosis2}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="fecha3"
                            label="Fecha de la tercera dosis"
                            defaultValue={refuerzo_fecha}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="aplicacion3"
                            label="2da Dosis Aplicada"
                            defaultValue={dosis3}
                        />
                        </Box>
                        

                        <Button
                            onClick={handleAsignacion}
                            type="submit"
                            
                            variant="contained"
                            sx={{ mt: 3, mb: 2, maxWidth: 500 , width: '90%'}}
                        >
                            Confirmar datos
                        </Button>
                    </Box>
                </Box>
            </div>

        </Container>
    );
}