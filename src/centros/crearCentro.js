
import * as React from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';


const url_crearCentro = 'http://localhost/ws-login/crearCentro.php';


const enviarCrearCentro = async (url, data) => {
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

    const operacion = user.confirmacion;
    if (operacion == true) {
        window.alert('Se ha operado correctamente');
        window.location.reload();
        //window.location.removeItem('CambioUsuario');
    } else {
        window.alert('Error');
    }

}

/*

const enviarDatosBorrar = async (url, data) => {
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
    window.localStorage.setItem('BorrarUsuario', JSON.stringify(json));
    const user = JSON.parse(window.localStorage.getItem('BorrarUsuario'));

    const operacion = user.operacion;
    if (operacion == true) {
        window.location.reload();
        window.alert('Se ha borrado exitosamente');
        //window.location.removeItem('CambioUsuario');
    } else {
        window.alert('Error');
    }

}
*/

export default function CrearCentro() {



    const refCentro = React.useRef('');
    //const refDisponible = React.useRef(null);
    const refDias = React.useRef('');
    const refCapacidad = React.useRef('');




    const [selectedValue, setSelectedValue] = React.useState('Si');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);

    };

    const handleCrearCentro = () => {
        const data = {
            centro: refCentro.current.value,
            disponible: selectedValue,
            dias: refDias.current.value,
            capacidad: refCapacidad.current.value



        }
        console.log(data);
        
        if (refCentro.current.value != '' ) {
            if( refDias.current.value != ''){
                if( refCapacidad.current.value != '' ){
                    enviarCrearCentro(url_crearCentro , data);
                }else{
                    window.alert('Llena la capacidad');
                }
            }else{
                window.alert('Llena los dias');
            }
               
        } else {
            window.alert('Llena el centro');
        }
        
    };

    return (
        <div>
            <Typography component="h1" variant="h5">
                Crear nuevo centro
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
                        id="centro"
                        label="Centro"
                        name="centro"
                        autoFocus
                        inputRef={refCentro}
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        id="dias"
                        label="Dias para la asignación"
                        name="dias"
                        autoFocus
                        inputRef={refDias}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        id="dpi"
                        label="Capacidad diaria"
                        name="capacidad"
                        autoFocus
                        inputRef={refCapacidad}
                    />
                    <Button
                        onClick={handleCrearCentro}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Crear Centro
                    </Button>
                </Box>
            </Box>
        </div>




    );
}