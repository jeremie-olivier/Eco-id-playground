import Button from '@mui/material/Button';
import ComputerIcon from '@mui/icons-material/Computer';

function ButtonMintAttestation(){
    return (
      <Button variant="contained" color="secondary" endIcon={<ComputerIcon/>}>Mint Attestation</Button>
    );
};

export default ButtonMintAttestation