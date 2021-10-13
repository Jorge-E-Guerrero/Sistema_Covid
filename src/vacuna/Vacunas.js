
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
/*
import CrearCentro from './crearCentro';
import HabilitarCentro from './habilitarCentro';
import EditarCentro from './editarCentro';
*/

import CrearVacuna from './crearVacuna';
import HabilitarVacuna from './habilitarVacuna';
import EditarVacuna from './editarVacuna';

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






export default function Vacunas() {





    return (

        <Container component="main" maxWidth="xs" id="vacunas" >
            <CssBaseline />
            <div className="form" id="divVacuna">
                <Box

                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                <CrearVacuna />
                <HabilitarVacuna />
                <EditarVacuna />

                </Box>
            </div>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}