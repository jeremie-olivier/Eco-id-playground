import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import { CardContent } from '@mui/material';

function MyClickableCard() {
  return (
    <Card sx={{ gridColumn: 'span 1' }}>
      <CardActionArea >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            pagename
          </Typography>
          <Typography variant="body2" color="text.secondary">
            pageattributes.title.value
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MyClickableCard;
