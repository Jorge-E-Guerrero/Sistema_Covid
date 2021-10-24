
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

import Reporte1 from './reporte1';






export default function Reportes() {





    return (

        <Container component="main" maxWidth="xs" id="confirmacion" >
            <CssBaseline />
            <div className="form" id="divReportes">
                <Box

                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >

                    <Reporte1 />
                </Box>
            </div>
        </Container>
    );
}