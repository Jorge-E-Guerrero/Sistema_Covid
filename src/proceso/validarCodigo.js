
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { TextField } from '@mui/material';


export default function ValidarCodigo() {



    const contenido_url = "http://localhost/ws-login/validarCodigo.php";


    const refCodigo = React.useRef('');

    

   

    const [contenido, setContenido] = React.useState(['']);

    


    const HandleCambiarDisponibilidad = (event) => {


        event.preventDefault();

        const params = {
            codigo: refCodigo.current.value
        };


            axios.post(contenido_url, JSON.stringify(params)).then(response => {
                setContenido((response.data));
            });

    
            console.log(params);
            console.log(contenido);


    };




    return (
        <div>
            <Typography component="h1" variant="h5">
                Verficar archivo
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
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
                        id="codigo"
                        label="Código"
                        inputRef={refCodigo}
                    />
                    <Button
                        onClick={HandleCambiarDisponibilidad}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Verificar
                    </Button>
                </Box>
                <Box sx={{ width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center' }}>
                {contenido != '' &&
                <Box sx={{ width: '100%', maxWidth: 400, bgcolor: '#00fff9' }}>
                    <Divider />
                    <nav aria-label="secondary mailbox folders">
                        <List >
                            <ListItem >
                                <ListItemText primary={"Fecha de incripcion: " + contenido.inscripcion} />
                            </ListItem>
                            <Divider />
                            <ListItem >
                                <ListItemText primary={"Vacuna aplicada: " + contenido.vacuna} />
                            </ListItem>
                            <Divider />
                            <ListItem >
                                <ListItemText primary={"Primera dosis: " + contenido.dosis1_fecha + " (" + contenido.dosis1 +")"} />
                            </ListItem>
                            <Divider />
                            <ListItem >
                                <ListItemText primary={"Segunda dosis: " + contenido.dosis2_fecha + " (" + contenido.dosis2 +")"} />
                            </ListItem>
                            <Divider />
                            <ListItem >
                                <ListItemText primary={"Tercera dosis: " + contenido.refuerzo_fecha + " (" + contenido.dosis3 +")"} />
                            </ListItem>
                            <Divider />
                            <ListItem >
                                <ListItemText primary={"Proceso: " + contenido.proceso} />
                            </ListItem>
                        </List>
                    </nav>
                </Box>
                }
                    
                </Box>
            </Box>
        </div>




    );
}