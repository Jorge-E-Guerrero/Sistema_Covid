//import { useParams } from 'react-router-dom';
//import logo from './logo.svg';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';


import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MediaCard from './homepage/card';
import { Typography } from '@mui/material';

const theme = createTheme();

/*
<header className="App-header">

            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code>  and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
            <img src="http://localhost/img/imagen_homepage.png" />

        </header>
*/

export default function Home() {
    return (
        <div>

            <CardMedia
                component="img"
                height="200"
                image="http://localhost/img/imagen_homepage.png"
                alt="vacuna"
            />
            <Typography id="tituloHome">Bienvenidos al registro de vacunación </Typography>
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
                            <MediaCard imagen="http://localhost/img/imagen2.jpg" titulo="Inicia tu proceso de vacunación" texto="Para ello debes crear una cuenta, la cual permitira registrarse a aquellas personas que cumplan con los requisitos para la fase. Para saber mas sobre si cumples los requerimientos visita la pagina de información" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                        <MediaCard imagen="http://localhost/img/imagen3.jpg" titulo="Descubre los beneficios de estar vacunado" texto="Tu salud nos importa y por medio de la vacuna nos protegemos. La vacunacion es voluntaria pero puedes descubrir mas acerca de como funcionan las vacunas en tu cuerpo y como nos protegen de las enfermedades" />
                        </Box>

                    </div>
                </Container>

            </ThemeProvider>
        </div>
    );
}