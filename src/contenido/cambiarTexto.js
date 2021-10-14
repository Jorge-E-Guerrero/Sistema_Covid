
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';



const url_crearCentro = 'http://localhost/ws-login/cambiarTexto.php';


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
        window.alert('Se ha operado correctamente');
        window.location.reload();
    } else {
        window.alert('Error');
    }

}

export default function CambiarTexto() {

    const refTitulo = React.useRef('');
    const refTexto = React.useRef('');



    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChangeCampo = (event) => {
        setSelectedValue(event.target.value);

    };





    const handleCambiarDisponibilidad = () => {
        const data = {
            elemento: selectedValue,
            titulo: refTitulo.current.value,
            texto: refTexto.current.value

        }
        console.log(data);

        if (selectedValue != '') {
            enviarEditarDisponibilidad(url_crearCentro, data);

        } else {
            window.alert('Llena el elemento');
        }

    };


/*
    const contenido_url = "http://localhost/ws-login/infoContenido.php";

    const [contenido, setContenido] = React.useState(['']);





    React.useEffect(() => {
        axios.post(contenido_url, JSON.stringify({
            
              elemento: 'bloque1'
            
          })).then(response => {
            setContenido(response.data);
        });
    }, []);

    console.log(contenido);
*/

    return (
        <div>
            <Typography component="h1" variant="h5">
                Editar Contenido
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
                        <InputLabel id="demo-simple-select-helper-label" >Elemento</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedValue}
                            label="Usuario"
                            onChange={handleChangeCampo}
                        >
                            <MenuItem value='bloque1'>Elemento #1</MenuItem>
                            <MenuItem value='bloque2'>Elemento #2</MenuItem>
                            <MenuItem value='bloque3'>Elemento #3</MenuItem>
                        </Select>

                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="titulo"
                        label="Titulo"
                        name="titulo"
                        autoFocus
                        inputRef={refTitulo}
                    />
                    
                </Box>
                <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="texto"
                        label="Texto"
                        name="texto"
                        autoFocus
                        multiline
                        rows="15"
                        inputRef={refTexto}
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
        </div>




    );
}