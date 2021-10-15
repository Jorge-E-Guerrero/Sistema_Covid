
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


const url_crearCentro = 'http://localhost/ws-login/registroGrupo.php';


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

export default function RegistroGrupo() {




    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChangeCampo = (event) => {
        setSelectedValue(event.target.value);

    };




    const [selectedGrupo, setSelectedGrupo] = React.useState('');

    const handleChangeGrupo = (event) => {
        setSelectedGrupo(event.target.value);
    };


    const handleCambiarDisponibilidad = () => {
        const data = {
            grupo: selectedGrupo,
            valor: selectedValue

        }
        console.log(data);

        if (selectedGrupo != '') {
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
                Editar Grupo
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
                        <InputLabel id="demo-simple-select-helper-label" >Grupo Prioritario</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedGrupo}
                            label="Centro de Vacunacion"
                            onChange={handleChangeGrupo}
                        >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            <MenuItem value='Residentes'>Residentes</MenuItem>
                            <MenuItem value='Personal de primera linea'>Personal de primera linea</MenuItem>
                            <MenuItem value='Personal sanitario'>Personal sanitario</MenuItem>
                            <MenuItem value='Fuerzas de seguridad'>Fuerzas de seguridad</MenuItem>
                            <MenuItem value='Fuerzas de emergencia'>Fuerzas de emergencia</MenuItem>
                            <MenuItem value='Fuerzas armadas'>Fuerzas armadas</MenuItem>
                            <MenuItem value='Educación infantil/especial'>Educación infantil/especial</MenuItem>
                            <MenuItem value='Educación primaria/secundaria'>Educación primaria/secundaria</MenuItem>
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