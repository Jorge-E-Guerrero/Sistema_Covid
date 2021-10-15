
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


const url = 'http://localhost/ws-login/registroFecha.php';


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

export default function RegistroFecha() {



    const refFecha = React.useRef('');


    const handleCambiarDisponibilidad = () => {
        const data = {
            fecha: refFecha.current.value

        }
        console.log(data);

        if (refFecha.current.value != '00/00/0000') {
            enviarEditarDisponibilidad(url, data);
        } else {
            window.alert('Llena el centro');
        }

    };







    return (
        <div>
            <Typography component="h1" variant="h5">
                Editar edad
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
                        label="Personas antes de"
                        name="fecha"
                        autoFocus
                        defaultValue="00/00/0000"
                        inputRef={refFecha}
                    />
                    <Button
                        onClick={handleCambiarDisponibilidad}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Cambiar
                    </Button>
                </Box>
            </Box>
        </div>




    );
}