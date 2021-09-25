
import './App.css';
import Appbar from './Appbar';
import Login from './Login';
import Signup from './Signup'
import Home from './Home';
import Register from './Register';
import Aplicacion from './Aplicacion';
import Confirmacion from './Confirmacion';
import Contacto from './Contacto';
import Proceso from './Proceso';
import Procesodatos from './Procesodatos';
import Administracion from './Administracion';

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
            <Home />
          </Route>
        </Switch>

        <Switch>
          <Route exact path='/Información'>
            <Home />
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


      </div>
    </Router>

  );
}

export default App;
