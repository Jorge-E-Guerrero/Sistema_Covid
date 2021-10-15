
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

import RegistroCentro from './registroEnfermedad';
import RegistroGrupo from './registroGrupo';
import RegistroFecha from './registroFecha';
import AsignarFecha from './asignarFecha';



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






export default function Habilitacion() {





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
                    <RegistroCentro />
                    <RegistroGrupo />
                    <RegistroFecha />
                    <AsignarFecha />

                </Box>
            </div>
        </Container>
    );
}