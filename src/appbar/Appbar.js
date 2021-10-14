import Menu from './Menu';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';



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

function logOut() {
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
    
    window.location.reload();
    window.location.replace('/Home');
    
}





function Appbar() {

    const data = JSON.parse(localStorage.getItem('info'));
    const conexion = data.conectado;
    
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" theme={theme}>
                    <Toolbar>
                        <Menu />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Sistema Vacunación
                        </Typography>
                        { conexion === true &&
                            <Link to='/home'>
                            <Button variant='contained' color="inherit" onClick={logOut}>Log out</Button>
                        </Link>
                        }
                        {conexion === false &&
                        <Link to='/login'>
                        <Button variant='contained' color="inherit">Log in</Button>
                        </Link>
                    }
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}

export default Appbar;