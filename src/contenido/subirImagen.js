
import * as React from 'react';


export default function SubirImagen() {


    return (
        
        <div id="subirImagen" >
            <form action="http://localhost/ws-login/guardarImagen.php" method="post" encType="multipart/form-data">
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