import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
//import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
//import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';

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
export default function Menu() {

    const data = JSON.parse(localStorage.getItem('info'));
    const usuario = data.tipo_usuario;


    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            bgcolor='#00fff9'
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Home', 'Informacíon', 'Contacto',  'Ajustes'].map((text, index) => (
                    <ListItem button key={text} component={Link} to={'/' + text} >

                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                { usuario === 1 &&
                    ['Proceso'].map((text, index) => (
                        <ListItem button key={text} component={Link} to={'/' + text} >

                            <ListItemText primary={text} />
                        </ListItem>
                    ))
                }
                { usuario === 2 &&
                    ['Proceso', 'Validación'].map((text, index) => (
                        <ListItem button key={text} component={Link} to={'/' + text} >

                            <ListItemText primary={text} />
                        </ListItem>
                    ))
                }
                { usuario === 3 &&
                    ['Proceso', 'Administración', 'Validación', 'Contenido','Habilitación'].map((text, index) => (
                        <ListItem button key={text} component={Link} to={'/' + text}>

                            <ListItemText primary={text} />
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    );




    return (
        <div >
            {['left'].map((anchor) => (
                <React.Fragment key={anchor} >
                    <Button
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}


                        onClick={toggleDrawer(anchor, true)}>Menu</Button>
                    <SwipeableDrawer
                    
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
    
}