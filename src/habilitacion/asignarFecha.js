
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


const url = 'http://localhost/ws-login/asignarFecha.php';


const enviarEditarDisponibilidad = async (url, data) => {
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
    window.alert('');
    const user = json;

    const operacion = user.confirmacion;
    if (operacion == true) {
        window.alert('Operación ejecutada');
        window.location.reload();
    } else {
        window.alert('Error');
    }

}

export default function AsignarFecha() {



    const handleCambiarDisponibilidad = () => {
        const data = {

        }
        console.log(data);

        enviarEditarDisponibilidad(url, data);

    };







    return (
        <div>
            <Typography component="h1" variant="h5">
                Asignar fechas de vacunación
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: 300 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Button
                        onClick={handleCambiarDisponibilidad}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Asignar
                    </Button>
                </Box>
            </Box>
        </div>




    );
}