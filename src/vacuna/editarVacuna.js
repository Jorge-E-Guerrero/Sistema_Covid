
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


const url = 'http://localhost/ws-login/editarVacuna.php';


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
        window.location.reload();
        window.alert('Se ha operado correctamente');
    } else {
        window.alert('Error');
    }

}

export default function EditarVacuna() {



    const refValor = React.useRef(null);

    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChangeCampo = (event) => {
        setSelectedValue(event.target.value);

    };




    const [selectedCentro, setSelectedCentro] = React.useState('');

    const handleChangeCentro = (event) => {
        setSelectedCentro(event.target.value);
    };





    const handleCambiarDisponibilidad = () => {
        const data = {
            vacuna: selectedCentro,
            campo: selectedValue,
            valor: refValor.current.value

        }
        console.log(data);

        if (selectedCentro != '') {
            if(refValor.current.value != ''){
                enviarEditarDisponibilidad(url, data);
            }else{
                window.alert('Agrega un valor');
            }
           
        } else {
            window.alert('Llena la vacuna');
        }

    };



    const vacuna_url = "http://localhost/ws-login/vacunasTotales.php";

    const [centro, setCentro] = React.useState(['']);





    React.useEffect(() => {
        axios.get(vacuna_url).then(response => {
            setCentro(response.data);
        });
    }, []);



    return (
        <div>
            <Typography component="h1" variant="h5">
                Editar Vacuna
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
                        <InputLabel id="demo-simple-select-helper-label" >Vacuna</InputLabel>
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
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-helper-label" >Campo</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedValue}
                        label="Usuario"
                        onChange={handleChangeCampo}
                    >
                        <MenuItem value='ndosis'>Numero de dosis</MenuItem>
                        <MenuItem value='dosis2'>Dias para dosis 2</MenuItem>
                        <MenuItem value='dosis3'>Dias para dosis 3</MenuItem>
                    </Select>

                </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="valor"
                        label="Valor"
                        name="valor"
                        type="number"
                        autoFocus
                        inputRef={refValor}
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