import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {
  return (
    <Card  id="card">
      <CardMedia
        component="img"
        height="140"
        image={props.imagen}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary" id="columnasTexto">
          {props.texto}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Comparte</Button>
        <Button size="small">Descubre más</Button>
      </CardActions>
    </Card>
  );
}