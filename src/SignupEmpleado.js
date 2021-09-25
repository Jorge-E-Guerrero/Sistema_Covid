
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';




import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




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

const url_signup = 'http://localhost/ws-login/signup.php';

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
    window.localStorage.setItem('NuevoEmpleado', JSON.stringify(json));
    const user = JSON.parse(window.localStorage.getItem('NuevoEmpleado'));
  
    const conexion = user.conectado;
    if (conexion === true) {
      window.location.replace("/Administración");
      window.localStorage.removeItem('NuevoEmpleado');
    }

}



export default function Signup() {


    const refDPI = React.useRef(null);
    const refNombre = React.useRef(null);
    const refApellido = React.useRef(null);
    const refPassword = React.useRef(null);
    const refDia = React.useRef(null);
    const refMes = React.useRef(null);
    const refYear = React.useRef(null);
    const refEmail = React.useRef(null);
    const refPhone = React.useRef(null);
    
    const handleSignup = () => {
        const nacimiento =  refYear.current.value + '-' + refMes.current.value + '-' + refDia.current.value;
        const data = {
            dpi: refDPI.current.value,
            password: refPassword.current.value,
            nombre: refNombre.current.value,
            apellido: refApellido.current.value,
            fecha_nacimiento: nacimiento,
            telefono: refPhone.current.value,
            email: refEmail.current.value,
            centro: selectedCentro,
            enfermedad: selectedEnfermedad,
            grupo: selectedGrupo,
            //gender: selectedValue,
            tipo_usuario: '2'

        }
        console.log(data);
        if(refDPI.current.value != '' && refPassword.current.value != '' && 
        refNombre.current.value != '' && refApellido.current.value != '' && nacimiento != '' && 
        refPhone.current.value != '' && selectedCentro != '' ){
            enviarDatos(url_signup, data);
        }else {
            window.alert('Llena todos los campos requeridos')
        }
        
    };



    const [selectedCentro, setSelectedCentro] = React.useState('');

    const handleChangeCentro = (event) => {
        setSelectedCentro(event.target.value);
    };


    const [selectedEnfermedad, setSelectedEnfermedad] = React.useState('');

    const handleChangeEnfermedad = (event) => {
        setSelectedEnfermedad(event.target.value);
    };

    const [selectedGrupo, setSelectedGrupo] = React.useState('');

    const handleChangeGrupo = (event) => {
        setSelectedGrupo(event.target.value);
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

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="form">
                    <Box
                        sx={{
                            minWidth: 400,
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Crear Usuario Empleado
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="dpi"
                                label="DPI"
                                name="dpi"
                                autoComplete="dpi"
                                autoFocus
                                inputRef={refDPI}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={refPassword}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="nombre"
                                label="Nombre"
                                type="nombre"
                                id="nombre"
                                autoComplete="nombre"
                                inputRef={refNombre}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="apellido"
                                label="Apellido"
                                type="apellido"
                                id="apellido"
                                autoComplete="apellido"
                                inputRef={refApellido}
                            />
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: 120 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    margin="normal"
                                    required

                                    name="dia"
                                    label="Día"
                                    type="number"
                                    id="dia"
                                    autoComplete="apellido"
                                    inputRef={refDia}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    name="mes"
                                    label="Mes"
                                    type="number"
                                    id="mes"
                                    autoComplete="mes"
                                    inputRef={refMes}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    name="año"
                                    label="Año"
                                    type="number"
                                    id="year"
                                    autoComplete="year"
                                    inputRef={refYear}
                                />
                            </Box>
                            
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="telefono"
                            label="Teléfono"
                            type="number"
                            name="telefono"
                            autoComplete="telefono"
                            autoFocus
                            inputRef={refPhone}
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
                            inputRef={refEmail}
                        />
                        <FormControl sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-helper-label" >Centro de Vacunacíon</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={selectedCentro}
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
                            <InputLabel id="demo-simple-select-helper-label" >Enfermedad Crónica</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={selectedEnfermedad}
                                label="Centro de Vacunacion"
                                onChange={handleChangeEnfermedad}
                            >
                                <MenuItem value="">
                                    <em>Ninguno</em>
                                </MenuItem>
                                <MenuItem value='Alzheimer'>Alzheimer</MenuItem>
                                <MenuItem value='Artritis'>Artritis</MenuItem>
                                <MenuItem value='Asma'>Asma</MenuItem>
                                <MenuItem value='Cáncer'>Cáncer</MenuItem>
                                <MenuItem value='Fibrosis quistica'>Fibrosis quistica</MenuItem>
                                <MenuItem value='Diabetes'>Diabetes</MenuItem>
                                <MenuItem value='Epilepsia'>Epilepsia</MenuItem>
                                <MenuItem value='VIH/SIDA'>VIH/SIDA</MenuItem>
                                <MenuItem value='Esclerosis múltiple'>Esclerosis múltiple</MenuItem>
                                <MenuItem value='Parkinson'>Parkinson</MenuItem>
                                <MenuItem value='Otro'>Otro</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-helper-label" >Grupo Prioritario</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={selectedGrupo}
                                label="Centro de Vacunacion"
                                onChange={handleChangeGrupo}
                            >
                                <MenuItem value="">
                                    <em>Ninguno</em>
                                </MenuItem>
                                <MenuItem value='Resisdentes'>Resisdentes</MenuItem>
                                <MenuItem value='Personal de primera linea'>Personal de primera linea</MenuItem>
                                <MenuItem value='Personal sanitario'>Personal sanitario</MenuItem>
                                <MenuItem value='Fuerzas de seguridad'>Fuerzas de seguridad</MenuItem>
                                <MenuItem value='Fuerzas de emergencia'>Fuerzas de emergencia</MenuItem>
                                <MenuItem value='Fuerzas armadas'>Fuerzas armadas</MenuItem>
                                <MenuItem value='Educacion infantil/especial'>Educacion infantil/especial</MenuItem>
                                <MenuItem value='Educacion primaria/secundaria'>Educacion primaria/secundaria</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            onClick={handleSignup}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Crear 
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/Contacto" variant="body2">
                                    El DPI ya ha sido registrado?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Ya tienes una cuenta? Log In
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider >
    );
}