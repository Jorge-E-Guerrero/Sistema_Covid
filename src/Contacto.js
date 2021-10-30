
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
/*
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
*/
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import emailjs from 'emailjs-com';
//import { createTheme, ThemeProvider } from '@mui/material/styles';

//import { useParams } from 'react-router-dom';

//import MultipleSelect from './MultipleSelect';








export default function Register() {

    /*
        const handleAsignacion = () => {
            const data = {
                dpi: dpi,
                dosis: dosis_verificada
            }
            console.log(data);
            enviarDatos(url_confirmacion, data);
        };
    
    
        const handleSubmit = (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            // eslint-disable-next-line no-console
            console.log({
                email: data.get('email'),
                password: data.get('password'),
            });
        };
    
    
    
    
    
    
        const data = JSON.parse(localStorage.getItem('registro'));
        const dpi = data.dpi;
        const nombre = (data.nombre + ' ' + data.apellido);
        const nacimiento = data.fecha_nacimiento;
        const dosis_verificada = data.dosis;
        const vacuna = data.vacuna;
        const dosis1_fecha = data.dosis1_fecha;
        const dosis2_fecha = data.dosis2_fecha;
        const refuerzo_fecha = data.refuerzo_fecha;
        const dosis1 = data.dosis1;
        const dosis2 = data.dosis2;
        const dosis3 = data.dosis3;
    */



    const sendEmail = (e) => {
        e.preventDefault();

        var templateParams = {

            nombre:refNombre.current.value,
            telefono:refTelefono.current.value,
            correo:refCorreo.current.value,
            asunto:refAsunto.current.value,
            comentario:refComentario.current.value
        };
        console.log(templateParams);

        if(templateParams.nombre != '' && templateParams.correo != '' && templateParams.telefono != '' && templateParams.asunto != '' && templateParams.comentario != ''){
            emailjs.send('service_um23kau', 'template_6e4t64i', templateParams, 'user_VGj3fvJK771qnT3LDsj0H')
            .then((result) => {
                console.log(result.text);
                window.alert('Su mensaje ha sido enviado exitosamente');
                window.location.reload();
            }, (error) => {
                console.log(error.text);
                window.alert('Ha ocurrido un error, envie nuevamente');
            });
        } else {
            window.alert('Llena todos los campos');
        }
        
        
    };

    const refNombre = React.useRef('');
    const refTelefono = React.useRef('');
    const refCorreo = React.useRef('');
    const refAsunto = React.useRef('');
    const refComentario = React.useRef('');
    

    return (

        <Container component="main" maxWidth="xs" id="contacto" >
            <CssBaseline />
            <div className="form" id="divContacto">
            
                <Box fullWidth

                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Comentarios
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1, width: '80%' }}>

                        <TextField
                            margin="normal"
                            fullWidth
                            label="Nombre"
                            name="nombre"
                            inputRef={refNombre}

                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email"
                            name="correo"
                            inputRef={refCorreo}

                        />
                        <TextField
                        margin="normal"
                        fullWidth
                        label="Telefono"
                        type="number"
                        name="telefono"
                        inputRef={refTelefono}

                        />
                        <TextField
                        margin="normal"
                        fullWidth
                        label="Asunto"
                        name="asunto"
                        inputRef={refAsunto}

                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            multiline
                            label="Comentario"
                            rows={15}
                            id="comentario"
                            name="comentario"
                            inputRef={refComentario}

                        />



                        <Button

                            type="submit"
                            onClick={sendEmail}
                            variant="contained"
                            sx={{ mt: 3, mb: 2, maxWidth: 500, width: '90%' }}
                        >
                            Enviar
                        </Button>

                    </Box>
                </Box>
                
            </div>

        </Container>
    );
}