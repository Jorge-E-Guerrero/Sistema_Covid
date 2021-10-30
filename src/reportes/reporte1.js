
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';



export default function Reporte1() {

    const refFechaInicio = React.useRef('');

    const refFechaFinal = React.useRef('');


    const contenido_url = "http://localhost/ws-login/historialFechas.php";

    const [contenido, setContenido] = React.useState([['']]);

    const HandleCambiarDisponibilidad = (event) => {


        event.preventDefault();

        const params = {
            inicio: refFechaInicio.current.value,
            final: refFechaFinal.current.value
        };


            axios.post(contenido_url, JSON.stringify(params)).then(response => {
                setContenido((response.data));
            });

    
            console.log(params);
            console.log(contenido);


    };






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
                        //label="Fecha Inicio"
                        name="fecha"
                        type="date"
                        defaultValue="0000-00-00"
                        inputRef={refFechaInicio}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fecha"
                        //label="Fecha Final"
                        name="fecha"
                        type="date"
                        defaultValue="0000-00-00"
                        inputRef={refFechaFinal}
                    />
          
                    <Button
                        onClick={HandleCambiarDisponibilidad}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Crear archivo
                    </Button>
                    <div>
                    {contenido != '' &&
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Descargar archivo"/>
                    }
                    <div id="hidden">
                    <table id="table-to-xls">
                    <tr>
                        <th>DPI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Centro de vacunación</th>
                        <th>Vacuna</th>
                        <th>Fecha 1ra dosis</th>
                        <th>Fecha 2da dosis</th>
                        <th>Fecha 3ra dosis</th>
                    </tr>
                        {contenido.map((array) => (
                            <tr>
                            {array.map((valor) => (
                                <th>{valor}</th>
                              ))}
                            </tr>
                          ))}
                    </table>
                    </div>
                    </div>

                </Box>
            </Box>
        </div>




    );
}