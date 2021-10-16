
import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


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



export default function Proceso() {



    const info = JSON.parse(localStorage.getItem('proceso'));
    const nombre = (info.nombre + ' ' + info.apellido);
    /*
    const dpi = json.dpi;
    
    const nacimiento = json.fecha_nacimiento;
    //const dosis_verificada = info.dosis;
    const vacuna = json.vacuna;
    const dosis1_fecha = json.dosis1_fecha;
    const dosis2_fecha = json.dosis2_fecha;
    const refuerzo_fecha = json.refuerzo_fecha;
    const dosis1 = json.dosis1;
    const dosis2 = json.dosis2;
    const dosis3 = json.dosis3;
    */

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
                        Registro de vacunación
                    </Typography>
                    <Box component="form"  noValidate sx={{ mt: 1 }}>
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
                                defaultValue={info.dpi}
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
                                defaultValue={info.fecha_nacimiento}
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
                            defaultValue={info.dosis1_fecha}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="aplicacion1"
                            label="1ra Dosis Aplicada"
                            defaultValue={info.dosis1}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="fecha2"
                            label="Fecha de la segunda dosis"
                            defaultValue={info.dosis2_fecha}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="aplicacion2"
                            label="2da Dosis Aplicada"
                            defaultValue={info.dosis2}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="fecha3"
                            label="Fecha de la tercera dosis"
                            defaultValue={info.refuerzo_fecha}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="aplicacion3"
                            label="2da Dosis Aplicada"
                            defaultValue={info.dosis3}
                        />
                        </Box>
                    </Box>
                </Box>
            </div>

        </Container>
    );
}