
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import Grid from '@mui/material/Grid';




import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Typography } from '@mui/material';

const theme = createTheme();


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Sistema Covid
            </Link>{' '}
            {new Date().getDate()}/
            {new Date().getMonth() + 1}/
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



export default function Footer() {
    return (
        <div id="footer">
                <Box
                    px={{ xs: 3, sm: 10 }}
                    py={{ xs: 5, sm: 10 }}

                    color="white"
                    id="footerPadding"
                >
                    <Container maxWidth="lg">
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={4}>
                                <Box borderBottom={1}>Páginas</Box>
                                <Box>
                                    <Link href="/Home" color="inherit">
                                        Home
                                    </Link>
                                </Box>
                                <Box>
                                    <Link href="/Información" color="inherit">
                                        Información
                                    </Link>
                                </Box>
                                <Box>
                                    <Link href="/Noticias" color="inherit">
                                        Noticias
                                    </Link>
                                </Box>
                                <Box>
                                    <Link href="/Contacto" color="inherit">
                                        Contacto
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box borderBottom={1}>Redes Sociales</Box>
                                <Box>
                                    <Link href="https://es-la.facebook.com/" color="inherit">
                                        Facebook
                                    </Link>
                                </Box>
                                <Box>
                                    <Link href="https://twitter.com/?lang=es" color="inherit">
                                        Twitter
                                    </Link>
                                </Box>
                                <Box>
                                    <Link href="https://www.instagram.com/?hl=es" color="inherit">
                                        Instagram
                                    </Link>
                                </Box>
                                <Box>
                                    <Link href="https://www.linkedin.com/in/jorge-eduardo-guerrero-garcia-3b67701bb/" color="inherit">
                                        Linkedin
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box borderBottom={1}>Otros</Box>
                                <Box>
                                    <Link href="/" color="inherit">
                                        Soporte
                                    </Link>
                                </Box>
                                <Box>
                                    <Link href="/" color="inherit">
                                        Contactanos
                                    </Link>
                                </Box>
                                <Box>
                                    <Link href="/" color="inherit">
                                        Ayuda
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 8, mb: 4 }} color="white" />
                    </Container>
                </Box>


            
        </div>
    );
}