import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';


import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import CardActions from '@mui/material/CardActions';
import CssBaseline from '@mui/material/CssBaseline';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



  

export default function AboutPage() {
  const globalServices = useContext(GlobalStateContext);

  return (

    <Grid container display="flex" justifyContent="center" alignItems="center" flexDirection="column" spacing={2}>

      <Card sx={{ gridColumn: 'span 2', borderRadius: '3' }} style={{ textAlign: 'left' }} >
        <CssBaseline />

        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            
          />
          <CardContent>
            <Typography color= "primary" gutterBottom variant="h3" component="div">
              About Eco ID dapp
            </Typography>

            <Typography sx={{ color: "primary", m: 2 }} gutterBottom variant="h5" component="div">
              What is Eco ID?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Eco Id is a Decentralized and Permissionless Identity system that is simple, 
              but maximally flexible. At its core, the Eco ID system provides a common 
              standard for identity and reputation assessments to be attested to by 
              verifiers, and then consumed by any parties interested in those assessments.  
            </Typography>
            
            <Typography sx={{ color: "primary", m: 2 }} gutterBottom variant="h5" component="div">
              What's the Eco ID dapp?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Eco Id dapp aimed to be the “go-to” interface for Verifiers, End users, 
              and Consumers of Eco IDs providing general purpose features.         
              (If you'd like to make a contribution or report an issue; please 
              head over to the <a target="_blank" rel="noopener noreferrer" href="https://github.com/jeremie-olivier/Eco-id-dapp" >Github repository</a>)
            </Typography>

            <Typography sx={{ color: "primary", m: 2 }} gutterBottom variant="h5" component="div">
              Okay, but why?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              To provide a better accessibility to the Eco ID protocol 
              and provide a tool to the community to better understand the Eco ID protocol.
            </Typography>
          </CardContent>  
        </Card>
      </Card>
    </Grid>
  );
}