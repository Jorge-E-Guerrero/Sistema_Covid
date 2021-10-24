
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';



const url = 'http://localhost/ws-login/';


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

export default function Reporte1() {

    const refFechaInicio = React.useRef('');

    const refFechaFinal = React.useRef('');


    const handleCambiarDisponibilidad = (event) => {
        const data = {
            fechaInicio: refFechaInicio.current.value,
            fechaFinal: refFechaFinal.current.value

        }
        console.log(data);
        event.preventDefault();
/*
        if (refFechaInicio.current.value != '00/00/0000') {
            enviarEditarDisponibilidad(url, data);
        } else {
            window.alert('Llena el centro');
        }
*/
    };



    const [value, setValue] = React.useState(null);



    return (
        <div>
            <Typography component="h1" variant="h5">
                Personas vacunadas entre dos fechas
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
                        required
                        fullWidth
                        id="fecha"
                        label="Fecha Inicio"
                        name="fecha"
                        autoFocus
                        type="date"
                        defaultValue="0000-00-00"
                        inputRef={refFechaInicio}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fecha"
                        label="Fecha Final"
                        name="fecha"
                        type="date"
                        autoFocus
                        defaultValue="0000-00-00"
                        inputRef={refFechaFinal}
                    />
          
                    <Button
                        onClick={handleCambiarDisponibilidad}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Crear archivo
                    </Button>
                </Box>
            </Box>
        </div>




    );
}