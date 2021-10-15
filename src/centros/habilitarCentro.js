
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';

import axios from 'axios';


const url_crearCentro = 'http://localhost/ws-login/habilitarCentro.php';


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

    const operacion = user.operacion;
    if (operacion == true) {
        window.location.reload();
    } else {
        window.alert('Error');
    }

}

export default function HabilitarCentro() {





    const [selectedValue, setSelectedValue] = React.useState('Si');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);

    };




    const [selectedCentro, setSelectedCentro] = React.useState('');

    const handleChangeCentro = (event) => {
        setSelectedCentro(event.target.value);
    };





    const handleCambiarDisponibilidad = () => {
        const data = {
            centro: selectedCentro,
            disponible: selectedValue

        }
        console.log(data);

        if (centro != '') {
            enviarEditarDisponibilidad(url_crearCentro, data);
        } else {
            window.alert('Llena el centro');
        }

    };



    const centro_url = "http://localhost/ws-login/centrosTotales.php";

    const [centro, setCentro] = React.useState(['']);
    

   
    
    
    React.useEffect(() => {
        axios.get(centro_url).then(response => {
          setCentro(response.data);
        });
    }, []);


    return (
        <div>
            <Typography component="h1" variant="h5">
                Editar disponibilidad
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: 300 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <FormControl sx={{ m: 1, minWidth: 400 }}>
                        <InputLabel id="demo-simple-select-helper-label" >Centro de Vacunacíon</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedCentro}
                            label="Centro de Vacunacion"
                            onChange={handleChangeCentro}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {centro.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div>
                        <FormLabel component="legend"  ></FormLabel>
                        <Radio
                            checked={selectedValue === 'Si'}
                            onChange={handleChange}
                            value="Si"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Si' }}
                        /><label>Habilitar</label>
                        <Radio
                            checked={selectedValue === 'No'}
                            onChange={handleChange}
                            value="No"
                            name="radio-buttons"

                            inputProps={{ 'aria-label': 'No' }}
                        /><label>Deshabilitar</label>
                    </div>
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