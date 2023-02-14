import * as React from 'react';
import Button from '@mui/material/Button';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';

function ButtonSignClaim(){
    return (
      <Button variant="contained" color="success" endIcon={<CreateTwoToneIcon/>}>Sign Claim</Button>
    );
};

export default ButtonSignClaim