


const url_confirmacion = 'http://localhost/ws-login/obtenerdatos.php';

async function enviarDatos(url, data) {
    const respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
    })
    //console.log(respuesta);
    const json = await respuesta.json();
    //console.log(json);
    window.localStorage.removeItem('proceso');
    window.localStorage.setItem('proceso', JSON.stringify(json));


    const user = JSON.parse(window.localStorage.getItem('proceso'));
    const conexion = user.Registrado;
    if (conexion === true) {
        window.location.reload();
        window.location.replace("/Datos");
    }





}




export default function Register() {
    const user = JSON.parse(window.localStorage.getItem('info'));
    const data = {
        dpi: user.dpi,
    }


    enviarDatos(url_confirmacion, data);



    return (

        <div>
            <h1> redirigiendo...</h1>
        </div>
    );
}