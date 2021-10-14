import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';


import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Typography } from '@mui/material';
import axios from 'axios';

const theme = createTheme();

export default function Noticias() {




    const contenido_url = "http://localhost/ws-login/infoContenido.php";

    





    React.useEffect(() => {
        axios.post(contenido_url).then(response => {
            setContenido((response.data));
        });
    }, []);

    const [contenido, setContenido] = React.useState(['']);

    console.log(contenido);
    console.log(contenido[0]);
    console.log(contenido[1]);
    console.log(contenido[2]);
    console.log(contenido[3]);

    return (
        <div>
        { contenido != '' &&
            <CardMedia
                component="img"
                height="200"
                image={ 'http://localhost/img/' + contenido[3].[1] }
                alt="vacuna"
                id="imagenPrueba"
            />
    }
            <Typography id="tituloHome">Noticias</Typography>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" id="noticias">
                    <CssBaseline />
                    <div className="form2" id="divNoticias">
                    { contenido != '' &&
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                        <div id="divContenido">
                            <div id="noticia">
                            <h1>{contenido[0].[2]}</h1>
                            <p>{contenido[0].[3]}</p>
                            </div>
                            <CardMedia
                                component="img"
                                image={ 'http://localhost/img/' + contenido[0].[1] }
                                alt="vacuna"
                                id="imagen"
                            />
                        </div>
                        </Box>
                        }
                        { contenido != '' &&
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                        <div id="divContenido">
                            <div id="noticia">
                            <h1>{contenido[1].[2]}</h1>
                            <p>{contenido[1].[3]}</p>
                            </div>
                            <CardMedia
                                component="img"
                                image={ 'http://localhost/img/' + contenido[1].[1] }
                                alt="vacuna"
                                id="imagen"
                            />
                        </div>

                        </Box>
                        }
                        { contenido != '' &&
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                        <div id="divContenido">
                            <div id="noticia">
                            <h1>{contenido[2].[2]}</h1>
                            <p>{contenido[2].[3]}</p>
                            </div>
                            <CardMedia
                                component="img"
                                image={ 'http://localhost/img/' + contenido[2].[1] }
                                alt="vacuna"
                                id="imagen"
                            />
                        </div>
                        
                        </Box>
                        }

                    </div>
                </Container>

            </ThemeProvider>
        </div>
    );
}