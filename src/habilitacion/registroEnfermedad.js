
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


const url_crearCentro = 'http://localhost/ws-login/registroEnfermedad.php';


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

export default function RegistroEnfermedad() {




    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChangeCampo = (event) => {
        setSelectedValue(event.target.value);

    };




    const [selectedEnfermedad, setSelectedEnfermedad] = React.useState('');

    const handleChangeEnfermedad = (event) => {
        setSelectedEnfermedad(event.target.value);
    };


    const handleCambiarDisponibilidad = () => {
        const data = {
            enfermedad: selectedEnfermedad,
            valor: selectedValue

        }
        console.log(data);

        if (selectedEnfermedad != '') {
            if (selectedValue != '') {
                enviarEditarDisponibilidad(url_crearCentro, data);
            } else {
                window.alert('Agrega un valor');
            }

        } else {
            window.alert('Llena el centro');
        }

    };







    return (
        <div>
            <Typography component="h1" variant="h5">
                Editar enfermedad
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
                        <InputLabel id="demo-simple-select-helper-label" >Enfermedad Crónica</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedEnfermedad}
                            label="Centro de Vacunacion"
                            onChange={handleChangeEnfermedad}
                        >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            <MenuItem value='Alzheimer'>Alzheimer</MenuItem>
                            <MenuItem value='Artritis'>Artritis</MenuItem>
                            <MenuItem value='Asma'>Asma</MenuItem>
                            <MenuItem value='Cáncer'>Cáncer</MenuItem>
                            <MenuItem value='Fibrosis quística'>Fibrosis quística</MenuItem>
                            <MenuItem value='Diabetes'>Diabetes</MenuItem>
                            <MenuItem value='Epilepsia'>Epilepsia</MenuItem>
                            <MenuItem value='VIH/SIDA'>VIH/SIDA</MenuItem>
                            <MenuItem value='Esclerosis múltiple'>Esclerosis múltiple</MenuItem>
                            <MenuItem value='Parkinson'>Parkinson</MenuItem>
                            <MenuItem value='Otro'>Otro</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-helper-label" >Habilitar</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedValue}
                            label="Usuario"
                            onChange={handleChangeCampo}
                        >
                            <MenuItem value='Si'>Si</MenuItem>
                            <MenuItem value='No'>No</MenuItem>
                        </Select>

                    </FormControl>
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