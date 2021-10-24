
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { jsPDF } from "jspdf";
import axios from 'axios';

// Default export is a4 paper, portrait, using millimeters for units



const url = 'http://localhost/ws-login/generarPdf.php';

const info = JSON.parse(localStorage.getItem('info'));
const nombre = (info.nombre + ' ' + info.apellido);


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
    const datos = json;

    const doc = new jsPDF();

    const operacion = datos.confirmacion;
    if (operacion == true) {
        doc.text("DPI: " + String(info.dpi), 20, 20);
        doc.text("Nombre: " + String(nombre), 20, 30);
        doc.text("Código: " + String(datos.codigo),20,40)
        doc.text("Fecha de incripcion: " + String(datos.inscripcion), 20, 50);
        doc.text("Vacuna aplicada: " + String(datos.vacuna), 20, 60);
        doc.text("Primera dosis: " + String(datos.dosis1_fecha) + " (" + String(datos.dosis1) + ")", 20, 70);
        doc.text("Segunda dosis: " + String(datos.dosis2_fecha) + " (" + String(datos.dosis2) + ")", 20, 80);
        doc.text("Tercera dosis: " + String(datos.refuerzo_fecha) + " (" + String(datos.dosis3) + ")", 20, 90);
        doc.text("Proceso: " + String(datos.proceso), 20, 100);
        doc.save("a4.pdf");
    } else {
        window.alert('Error');
    }



}


export default function Pdf() {

    

    const contenido_url = "http://localhost/ws-login/datosPdf.php";

    


    const params = {
        dpi: info.dpi
    };

    React.useEffect(() => {
        axios.post(contenido_url,JSON.stringify(params)).then(response => {
            setContenido((response.data));
        });
    }, []);

    const [contenido, setContenido] = React.useState(['']);
    
    console.log(contenido);


    const handleCambiarDisponibilidad = (event) => {
        const data = {
            inscripcion: contenido.inscripcion,
            vacuna: contenido.vacuna,
            dosis1_fecha: contenido.dosis1_fecha,
            dosis1: contenido.dosis1,
            dosis2_fecha: contenido.dosis2_fecha,
            dosis2: contenido.dosis2,
            refuerzo_fecha: contenido.refuerzo_fecha,
            dosis3: contenido.dosis3,
            proceso: contenido.proceso

        }
        console.log(data);

        event.preventDefault();  
        
        enviarEditarDisponibilidad(url, data);


    };




    return (
        <div>
            <Typography component="h1" variant="h5">
                Generar PDF
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
                        onClick={handleCambiarDisponibilidad}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Generar
                    </Button>
                </Box>
            </Box>
        </div>




    );
}