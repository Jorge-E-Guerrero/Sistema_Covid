import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';


import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Typography } from '@mui/material';
import BasicTabs from './tab';
import Acordeon from './acordeon';

const theme = createTheme();

export default function Informacion() {
    return (
        <div>

            <CardMedia
                component="img"
                height="200"
                image="http://localhost/img/imagen_informacion.jpg"
                alt="vacuna"
            />
            <Typography id="tituloHome">Información</Typography>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" id="home">
                    <CssBaseline />
                    <div className="form2" id="divHome">
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                        <Acordeon />
                        </Box>
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                        <BasicTabs />
                        </Box>
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                        
                        </Box>

                    </div>
                </Container>

            </ThemeProvider>
        </div>
    );
}