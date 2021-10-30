
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';




export default function Reporte5() {

    const contenido_url = "http://localhost/ws-login/historialGrupos.php";

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
                Historial de grupos prioritarios
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
                        table="table-to-xls5"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Descargar archivo"/>
                    }
                    <div id="hidden">
                    <table id="table-to-xls5">
                        <tr>
                            <th>Total: {contenido.length}</th>
                        </tr>
                        <tr>
                            <th>DPI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha de nacimiento</th>
                            <th>Grupo prioritario</th>
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