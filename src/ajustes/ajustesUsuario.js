
import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const url_cambiarAtributo = 'http://localhost/ws-login/cambiarAtributo.php';


const enviarDatosAtributo = async (url, data) => {
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

    const user = json;

    const operacion = user.operacion;
    if (operacion == true) {
        window.alert('Se ha operado correctamente');
        window.location.reload();
        //window.location.removeItem('CambioUsuario');
    } else {
        window.alert('Error');
    }
}



export default function AjustesUsuario() {

    const data = JSON.parse(localStorage.getItem('info'));
    const usuario = data.dpi;
    console.log(usuario);


    const valorAtributo = React.useRef(null);
    const [selectedAtributo, setSelectedAtributo] = React.useState('');

    const handleChangeAtributo = (event) => {
        setSelectedAtributo(event.target.value);
    };

    const handleCambiarAtributo = () => {
        const data = {
            dpi: usuario,
            atributo: selectedAtributo,
            valor: valorAtributo.current.value

        }
        
        console.log(data);
        
        if(valorAtributo.current.value != '') {
            enviarDatosAtributo(url_cambiarAtributo, data);
        } else {
            window.alert('Ingresa un valor')
        }
        
    };




    return (

        <div>
            <Typography component="h1" variant="h5">
                Cambiar valores
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: 300 },
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-helper-label" >Atributo</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedAtributo}
                            label="Centro de Vacunacion"
                            onChange={handleChangeAtributo}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            <MenuItem value='telefono'>Teléfono</MenuItem>
                            <MenuItem value='email'>Email</MenuItem>

                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="valorAtributo"
                        label="Valor"
                        name="valorAtributo"
                        autoFocus
                        inputRef={valorAtributo}
                    />
                    <Button
                        onClick={handleCambiarAtributo}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Cambiar valores
                    </Button>
                </Box>
            </Box>
        </div>
    );
}