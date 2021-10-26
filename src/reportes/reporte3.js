
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




export default function Reporte3() {

    const contenido_url = "http://localhost/ws-login/ausenciaVacuna.php";

    const [contenido, setContenido] = React.useState([['']]);

    const HandleCambiarDisponibilidad = (event) => {


        event.preventDefault();

        const params = {
            dosis: selectedCentro
        };

        if(selectedCentro != ''){
            axios.post(contenido_url, JSON.stringify(params)).then(response => {
                setContenido((response.data));
            });

            console.log(params);
            console.log(contenido);
        } else {
            window.alert('');
        }
            

    
            


    };




   
    const [selectedCentro, setSelectedCentro] = React.useState('');

    const handleChangeCentro = (event) => {
        setSelectedCentro(event.target.value);
    };
    




    return (
        <div>
            <Typography component="h1" variant="h5">
                Inasistencia a vacuna
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: 300 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-helper-label" >Ausencia</InputLabel>
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
                            <MenuItem value='dosis1'>Primera Dosis</MenuItem>
                            <MenuItem value='dosis2'>Segunda Dosis</MenuItem>
                            <MenuItem value='dosis3'>Tercera Dosis</MenuItem>
                            <MenuItem value='todas'>Cualquier Dosis</MenuItem>
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
                        table="table-to-xls3"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Descargar archivo"/>
                    }
                    <div id="hidden">
                    <table id="table-to-xls3">
                        <tr>
                            <th>Total: {contenido.length}</th>
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