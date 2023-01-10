import * as React from 'react';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';

function ButtonCreateAttestation(){
    return (
      <Button variant="contained" endIcon={<CreateIcon/>}>Create Attestation</Button>
    );
};

export default ButtonCreateAttestation