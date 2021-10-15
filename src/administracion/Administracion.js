
import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



import Button from '@mui/material/Button';

import MultipleSelect from '../componentes/MultipleSelect';
import MultipleSelect2 from '../componentes/MultipleSelect2';


//import { Link } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';

import CambioAtributos from './CambioAtributos';
import ImportarCsv from './importarCsv';


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

const url_cambiarUsuario = 'http://localhost/ws-login/cambiarUsuario.php';
const url_borrarUsuario = 'http://localhost/ws-login/borrarUsuario.php';
//const url_cambiarAtributo = 'http://localhost/ws-login/cambiarAtributo.php';


const enviarDatosCambio = async (url, data) => {
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
    window.localStorage.setItem('CambioUsuario', JSON.stringify(json));
    const user = JSON.parse(window.localStorage.getItem('CambioUsuario'));

    const operacion = user.operacion;
    if (operacion == true) {
        window.location.reload();
        //window.location.removeItem('CambioUsuario');
    } else {
        window.alert('Error');
    }

}

const enviarDatosBorrar = async (url, data) => {
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
    window.localStorage.setItem('BorrarUsuario', JSON.stringify(json));
    const user = JSON.parse(window.localStorage.getItem('BorrarUsuario'));

    const operacion = user.operacion;
    if (operacion == true) {
        window.location.reload();
        window.alert('Se ha borrado exitosamente');
        //window.location.removeItem('CambioUsuario');
    } else {
        window.alert('Error');
    }

}


export default function Administracion() {



    const refDPIUsuario = React.useRef(null);


    const handleCambioUsuario = () => {
        const data = {
            dpi: refDPIUsuario.current.value,
            tipo_usuario: selectedUsuario

        }
        console.log(data);
        if (selectedUsuario != '') {
            enviarDatosCambio(url_cambiarUsuario, data);
        } else {
            window.alert('Ingresa un tipo de usuario');
        }

    };


    const refDPIUsuarioBorrar = React.useRef(null);
    const handleBorrarUsuario = () => {
        const data = {
            dpi: refDPIUsuarioBorrar.current.value,

        }
        console.log(data);
        if (refDPIUsuarioBorrar.current.value != '') {
            enviarDatosBorrar(url_borrarUsuario, data);
        } else {
            window.alert('Ingresa un DPI');
        }

    };



    const [selectedUsuario, setSelectedUsuario] = React.useState('');

    const handleChangeUsuario = (event) => {
        setSelectedUsuario(event.target.value);
    };

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
                    <Typography component="h1" variant="h5">
                        Cambiar usuario
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Box component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: 300 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="dpi"
                                label="DPI"
                                name="dpi"
                                autoComplete="dpi"
                                autoFocus
                                inputRef={refDPIUsuario}
                            />
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <InputLabel id="demo-simple-select-helper-label" >Usuario</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={selectedUsuario}
                                    label="Usuario"
                                    onChange={handleChangeUsuario}
                                >
                                    <MenuItem value='1'>Usuario Default</MenuItem>
                                    <MenuItem value='2'>Empleado</MenuItem>
                                    <MenuItem value='3'>Administrador</MenuItem>
                                </Select>

                            </FormControl>
                            <Button
                                onClick={handleCambioUsuario}
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Cambiar Privilegios
                            </Button>
                        </Box>
                    </Box>
                    <Typography component="h1" variant="h5">
                        Borrar usuario
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Box component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: 300 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="dpi"
                                label="DPI"
                                name="dpi"
                                autoComplete="dpi"
                                autoFocus
                                inputRef={refDPIUsuarioBorrar}
                            />
                            <Button
                                onClick={handleBorrarUsuario}
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Borrar Usuario
                            </Button>
                        </Box>
                    </Box>
                    <CambioAtributos />
                    <Typography component="h1" variant="h5">
                        Crear Nuevo Usuario Empleado
                    </Typography>
                    <Link to='/SignupEmpleado'>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Crear Usuario
                        </Button>
                    </Link>
                    <ImportarCsv />
                </Box>
            </div>

        </Container>
    );
}