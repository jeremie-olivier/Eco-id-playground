import * as React from 'react';
import Button from '@mui/material/Button';
import ComputerIcon from '@mui/icons-material/Computer';

function ButtonMintAttestation(){
    return (
      <Button variant="contained" color="success" endIcon={<ComputerIcon/>}>Mint Attestation</Button>
    );
};

export default ButtonMintAttestation