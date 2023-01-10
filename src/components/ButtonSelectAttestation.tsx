import * as React from 'react';
import Button from '@mui/material/Button';
import InputIcon from '@mui/icons-material/Input';

function ButtonSelectAttestation(){
    return (
      <Button variant="contained" endIcon={<InputIcon/>}>Select Attestation</Button>
    );
};

export default ButtonSelectAttestation