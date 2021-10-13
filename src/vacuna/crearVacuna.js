
import * as React from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const url = 'http://localhost/ws-login/crearVacuna.php';


const enviarCrearVacuna = async (url, data) => {
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


    //window.localStorage.setItem('CambioUsuario', JSON.stringify(json));
    const user = json; //JSON.parse(window.localStorage.getItem('CambioUsuario'));

    const operacion = user.operacion;
    if (operacion == true) {
        window.alert('Vacuna creada');
        window.location.reload();
        //window.location.removeItem('CambioUsuario');
    } else {
        window.alert('Error');
    }

}

/*
{selectedDosis >= '2' &&
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            id="dias"
                            label="Dias para la segunda dosis"
                            name="dias"
                            autoFocus
                            inputRef={refDiasDosis2}
                        />
                    }
                    {selectedDosis >= '3' &&
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            id="dias"
                            label="Dias para tercera dosis"
                            name="dias"
                            autoFocus
                            inputRef={refDiasDosis3}
                        />
                    } 
*/



export default function CrearVacuna() {



    const refVacuna = React.useRef('');
    //const refDisponible = React.useRef(null);
    const refDiasDosis2 = React.useRef('');
    const refDiasDosis3 = React.useRef('');




    const [selectedValue, setSelectedValue] = React.useState('Si');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);

    };

    const handleCrearVacuna = () => {
        if(refDiasDosis2.current.value === undefined){
            refDiasDosis2.current.value = '';
            refDiasDosis3.current.value = '';

                
        }
        const data = {
            vacuna: refVacuna.current.value,
            disponible: selectedValue,
            ndosis: selectedDosis,
            diasDosis2: refDiasDosis2.current.value,
            diasDosis3: refDiasDosis3.current.value
             



        }
        console.log(data);
        window.alert('');

        if (refVacuna.current.value != '') {
            if(refDiasDosis2.current.value <= refDiasDosis2.current.value){
                enviarCrearVacuna(url, data);
            }else{
                window.alert('La segunda dosis debe ser menor que la tercera');
            }
        } else {
            window.alert('Llena el nombre de la Vacuna');
        }

    };



    const [selectedDosis, setSelectedDosis] = React.useState('');

    const handleChangeDosis = (event) => {
        setSelectedDosis(event.target.value);
    };

    return (
        <div>
            <Typography component="h1" variant="h5">
                Crear nueva vacuna
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
                        id="vacuna"
                        label="Vacuna"
                        name="vacuna"
                        autoFocus
                        inputRef={refVacuna}
                    />
                    <div>
                        <FormLabel component="legend"  >Disponible</FormLabel>
                        <Radio
                            checked={selectedValue === 'Si'}
                            onChange={handleChange}
                            value="Si"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Si' }}
                        /><label>Si</label>
                        <Radio
                            checked={selectedValue === 'No'}
                            onChange={handleChange}
                            value="No"
                            name="radio-buttons"

                            inputProps={{ 'aria-label': 'No' }}
                        /><label>No</label>
                    </div>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-helper-label" >No. Dosis</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedDosis}
                            label="Usuario"
                            onChange={handleChangeDosis}
                        >
                            <MenuItem value='1'>1</MenuItem>
                            <MenuItem value='2'>2</MenuItem>
                            <MenuItem value='3'>3</MenuItem>
                        </Select>
                    </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            id="dias"
                            label="Dias para la segunda dosis"
                            name="dias"
                            autoFocus
                            inputRef={refDiasDosis2}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            id="dias"
                            label="Dias para tercera dosis"
                            name="dias"
                            autoFocus
                            inputRef={refDiasDosis3}
                        />
                    
                    <Button
                        onClick={handleCrearVacuna}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Crear Vacuna
                    </Button>
                </Box>
            </Box>
        </div>




    );
}