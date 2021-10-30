
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
import { CountertopsRounded } from '@mui/icons-material';



export default function Reporte2() {

    const contenido_url = "http://localhost/ws-login/detalleCentro.php";

    const [contenido, setContenido] = React.useState([['']]);

    const HandleCambiarDisponibilidad = (event) => {


        event.preventDefault();

        const params = {
            centro: selectedCentro
        };


            axios.post(contenido_url, JSON.stringify(params)).then(response => {
                setContenido((response.data));
            });

    
            console.log(params);
            console.log(contenido);


    };



    const centro_url = "http://localhost/ws-login/centrosTotales.php";

    const [centro, setCentro] = React.useState(['']);
    

   
    const [selectedCentro, setSelectedCentro] = React.useState('');

    const handleChangeCentro = (event) => {
        setSelectedCentro(event.target.value);
    };
    
    React.useEffect(() => {
        axios.get(centro_url).then(response => {
          setCentro(response.data);
        });
    }, []);



    return (
        <div>
            <Typography component="h1" variant="h5">
                Detalle diario de centros
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
                        table="table-to-xls2"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Descargar archivo"/>
                    }
                    <div id="hidden">
                    <table id="table-to-xls2">
                        <tr>
                            <th>Total: {contenido.length}</th>
                        </tr>
                        <tr>
                            <th>DPI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Centro de vacunación</th>
                            <th>Vacuna</th>
                            <th>Fecha</th>
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