
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';




export default function Reporte4() {

    const contenido_url = "http://localhost/ws-login/contactoEnfermedad.php";

    const [contenido, setContenido] = React.useState([['']]);

    const HandleCambiarDisponibilidad = (event) => {


        event.preventDefault();

        axios.get(contenido_url).then(response => {
            setContenido((response.data));
        });


        console.log(contenido);

    };

    return (
        <div>
            <Typography component="h1" variant="h5">
                Contacto de personas con enfermedades crónicas
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: 300 },
                    }}
                    noValidate
                    autoComplete="off"
                >

          
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
                        table="table-to-xls4"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Descargar archivo"/>
                    }
                    <div id="hidden">
                    <table id="table-to-xls4">
                        <tr>
                            <th>Total: {contenido.length}</th>
                        </tr>
                        <tr>
                            <th>DPI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha de nacimiento</th>
                            <th>Enfermedad crónica</th>
                            <th>Centro de vacunación</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th>Fecha 1ra dosis</th>
                            <th>Fecha 2da dosis</th>
                            <th>Fecha 3ra dosis</th>
                            <th>1ra Dosis</th>
                            <th>2da Dosis</th>
                            <th>3ra Dosis</th>
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