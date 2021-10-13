import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';



import axios from 'axios';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };




    const url1 = "http://localhost/ws-login/porcentajeEnfermedad1.php";

    const [dosis1, setDosis1] = React.useState(['']);



    React.useEffect(() => {
        axios.get(url1).then(response => {
            setDosis1(response.data);
        });
    }, []);




    const url2 = "http://localhost/ws-login/porcentajeEnfermedad2.php";

    const [dosis2, setDosis2] = React.useState(['']);



    React.useEffect(() => {
        axios.get(url2).then(response => {
            setDosis2(response.data);
        });
    }, []);



    const url3 = "http://localhost/ws-login/porcentajeEnfermedad3.php";

    const [dosis3, setDosis3] = React.useState(['']);



    React.useEffect(() => {
        axios.get(url3).then(response => {
            setDosis3(response.data);
        });
    }, []);



    return (
        <Box sx={{ width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' }}>
            <Typography > Porcentaje de personas con enfermedades crónicas vacunadas </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Primera Dosis" {...a11yProps(0)} />
                    <Tab label="Segunda Dosis" {...a11yProps(1)} />
                    <Tab label="Tercera dosis" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
            <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                <Divider />
                <nav aria-label="secondary mailbox folders">
                    <List id="columnasTexto2">
                        {dosis1.map((name) => (

                            <ListItem >
                                <ListItemText primary={name} />
                            </ListItem>
                        ))}
                    </List>
                </nav>
            </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                    <Divider />
                    <nav aria-label="secondary mailbox folders">
                        <List id="columnasTexto2">
                            {dosis2.map((name) => (

                                <ListItem >
                                    <ListItemText primary={name} />
                                </ListItem>
                            ))}
                        </List>
                    </nav>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                    <Divider />
                    <nav aria-label="secondary mailbox folders">
                        <List id="columnasTexto2">
                            {dosis3.map((name) => (

                                <ListItem >
                                    <ListItemText primary={name} />
                                </ListItem>
                            ))}
                        </List>
                    </nav>
                </Box>
            </TabPanel>
        </Box>
    );
}