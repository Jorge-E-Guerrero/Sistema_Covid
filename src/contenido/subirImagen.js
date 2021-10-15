
import * as React from 'react';
import Typography from '@mui/material/Typography';


export default function SubirImagen() {

    //event.preventDefault();
    return (
        
        <div id="subirImagen" >
            <Typography component="h1" variant="h5">
                Subir nueva imagen
            </Typography>
            <iframe name="dummyframe" id="dummyframe" ></iframe>
            <form action="http://localhost/ws-login/guardarImagen.php" method="post" encType="multipart/form-data" target="dummyframe">
            <table>
            <tr>
            <td><label for="imagen">Imagen:</label></td>
            <td><input type="file" name="imagen" size="20"/></td>
            </tr>
            <tr><td colSpan="2" ><input type="submit" value="Enviar Imagen" /> </td></tr>
            </table>

            </form>
        </div>
        
    );
}