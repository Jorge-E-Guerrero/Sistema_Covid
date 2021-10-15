import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

export default function Acordeon() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const url1 = "http://localhost/ws-login/edadHabilitada.php";

  const [edad, setEdad] = React.useState(['']);



  React.useEffect(() => {
      axios.get(url1).then(response => {
          setEdad(response.data);
      });
  }, []);

  const url2 = "http://localhost/ws-login/gruposHabilitados.php";

  const [grupos, setGrupos] = React.useState(['']);



  React.useEffect(() => {
      axios.get(url2).then(response => {
          setGrupos(response.data);
      });
  }, []);


  const url3 = "http://localhost/ws-login/enfermedadesHabilitadas.php";

  const [enfermedades, setEnfermedades] = React.useState(['']);



  React.useEffect(() => {
      axios.get(url3).then(response => {
          setEnfermedades(response.data);
      });
  }, []);







  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            Habilitados para registrarse
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography >
            <li>Personas nacidas antes de {edad[0]}  </li>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>Enfermedades Crónicas habilitadas para registrarse</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography id="columnasTexto2">
            {enfermedades.map((name) => (
                <li>
                {name}
                </li>
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            Grupos Prioritarios habilitados para registrarse
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography id="columnasTexto2">
            {grupos.map((name) => (
                <li>
                {name}
                </li>
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}