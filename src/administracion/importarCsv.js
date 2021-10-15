
import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const url_cambiarAtributo = 'http://localhost/ws-login/guardarCsv.php';


const enviarDatosAtributo = async (url, data) => {
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

    const user = json;

    const operacion = user.operacion;
    if (operacion == true) {
        window.location.reload();
        //window.location.removeItem('CambioUsuario');
    } else {
        window.alert('Error');
    }
}



export default function ImportarCsv() {



    const refDPIUsuarioCambiar = React.useRef(null);
    const valorAtributo = React.useRef(null);
    const [selectedAtributo, setSelectedAtributo] = React.useState('');

    const handleChangeAtributo = (event) => {
        setSelectedAtributo(event.target.value);
    };

    const handleCambiarAtributo = () => {
        const data = {
            dpi: refDPIUsuarioCambiar.current.value,
            atributo: selectedAtributo,
            valor: valorAtributo.current.value

        }
        const files = document.getElementById('import').files
        console.log(files);
        
        if (refDPIUsuarioCambiar.current.value != '') {
            if(valorAtributo.current.value != '') {
                enviarDatosAtributo(url_cambiarAtributo, files);
            } else {
                window.alert('Ingresa un valor')
            }
        } else {
            window.alert('Ingresa un DPI');
        }
        
    };




    return (

        <div>
            <Typography component="h1" variant="h5">
                Importar CSV
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: 300 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                
                <span id="message" />
                <iframe name="dummyframe" id="dummyframe" ></iframe>
                <form method="post" action="http://localhost/ws-login/guardarCsv.php" id="sample_from" enctype="multipart/form-data" className="form-horizontal" target="dummyframe">
                    <div className="form-group">
        
                        <label className="col-4md-4  control-laber">Selecciona el archivo .csv</label>
                        <input type="file" name="file" id="file" accept=".csv" />    
                    </div>
                    <div className="form-group" >
                        <input type="hidden" name="hidden_field" value="1" />
                        <input type="submit" name="import" id="import" value="Import" className="btn btn-info" />
                    </div>
                </form>


                    <Button
                        onClick={handleCambiarAtributo}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Cambiar valores
                    </Button>
                </Box>
            </Box>
        </div>
        
    );
}