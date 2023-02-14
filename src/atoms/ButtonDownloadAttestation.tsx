import * as React from 'react';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

function ButtonDownloadAttestation(){
    return (
      <Button variant="contained" color="secondary" endIcon={<DownloadIcon/>}>Download Attestation</Button>
    );
};

export default ButtonDownloadAttestation