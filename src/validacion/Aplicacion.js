
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import { createTheme, ThemeProvider } from '@mui/material/styles';

//import { useParams } from 'react-router-dom';
import axios from 'axios';
import MultipleSelect from '../componentes/MultipleSelect';


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

/*
const theme = createTheme({
    palette: {
        primary: {
            main: '#00ff20',
        },
        secondary: {
            main: '#f44336',
        },
    },
});
*/



const url_asignacion = 'http://localhost/ws-login/asignacion.php';

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
    window.localStorage.setItem('registro', JSON.stringify(json));
    const user = JSON.parse(window.localStorage.getItem('registro'));
    const conexion = user.registrado;
    if (conexion == true){
        window.location.replace("/Confirmación");
    }

    console.warn();
  


}




export default function Register() {
    
    
    const handleAsignacion = () => {
        const data = {
            dpi: dpi,
            vacuna: selectedVacuna
        }
        console.log(data);
        if(selectedVacuna != ''){
            enviarDatos(url_asignacion, data);
        } else {
            window.alert('No se ha asignado vacuna');
        }
        
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

    const [selectedVacuna, setSelectedVacuna] = React.useState('');

    const handleChange = (event) => {
        setSelectedVacuna(event.target.value);
    };




    const data = JSON.parse(localStorage.getItem('registro'));
    const dpi = data.dpi;
    const nombre = (data.nombre + ' ' + data.apellido);
    


    const baseURL = "http://localhost/ws-login/vacunasDisponibles.php";

    const [post, setPost] = React.useState(['']);
    
    console.log(post);

    React.useEffect(() => {
        axios.get(baseURL).then(response => {
          setPost(response.data);
        });
    }, []);


    return (

        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className="form">
                <Box

                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Asignación de dosis
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="dpi"
                            label="DPI"
                            defaultValue={dpi}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            disabled
                            id="full-name"
                            label="Nombre"
                            defaultValue={nombre}
                        />
                        <FormControl sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-helper-label" >Vacuna</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={selectedVacuna}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {post.map((name) => (
                                    <MenuItem value={name}>
                                      {name}
                                    </MenuItem>
                                  ))}
                            </Select>
                        </FormControl>

                        <Button
                            onClick={handleAsignacion}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Asignar vacuna
                        </Button>
                    </Box>
                </Box>
            </div>

        </Container>
    );
}