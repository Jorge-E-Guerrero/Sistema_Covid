
import './App.css';
import './App.scss';
import Appbar from './appbar/Appbar';
import Login from './Login';
import Signup from './Signup'
import Home from './Home';
import Register from './validacion/Register';
import Aplicacion from './validacion/Aplicacion';
import Confirmacion from './validacion/Confirmacion';
import Contacto from './Contacto';
import Proceso from './proceso/Proceso';
import Procesodatos from './proceso/Procesodatos';
import Administracion from './administracion/Administracion';
import SignupEmpleado from './administracion/SignupEmpleado';
import Centros from './centros/Centros';
import Vacunas from './vacuna/Vacunas';
import Habilitacion from './habilitacion/Habilitacion';
import Informacion from './informacion/Informacion';
import Contenido from './contenido/Contenido';
import Noticias from './noticias/Noticias';
import Footer from './Footer';
import Ajustes from './ajustes/Ajustes';
import Reportes from './reportes/Reportes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


/*
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005c5c',
    },
    secondary: {
      main: '#f44336',
    },
  },
});
*/



function App() {

  var data = localStorage;
  if (data.length == '0') {
    localStorage.clear();
    var anonimo = {
      conectado: false,
      dpi: '',
      nombre: '',
      apellido: '',
      fecha_nacimiento: '',
      tipo_usuario: '0'
    }
    window.localStorage.setItem('info', JSON.stringify(anonimo));
  };

  const conexion = data.conectado;


  return (
    <Router>
      <Appbar />
      <div className="App">


        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Home'>
            <Home />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/SignupEmpleado'>
            <SignupEmpleado />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/Validación">

            <Register />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/Aplicacíon">
            <Aplicacion />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Confirmación'>
            <Confirmacion />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Noticias'>
            <Noticias />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Información'>
            <Informacion />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/Contacto">
            <Contacto />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Proceso'>
            <Proceso />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Datos'>
            <Procesodatos />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Administración'>
            <Administracion />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Centros'>
            <Centros />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Vacunas'>
            <Vacunas />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Habilitación'>
            <Habilitacion />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Contenido'>
            <Contenido />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Ajustes'>
            <Ajustes />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Reportes'>
            <Reportes />
          </Route>
        </Switch>

      </div>
      <Footer />
    </Router>


  );
}

export default App;
