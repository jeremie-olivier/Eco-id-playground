import * as React from 'react';
import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function ButtonWalletConnect(){
    return (
      <Button variant="contained" color='secondary' startIcon={<AccountBalanceWalletIcon/>}>Connect your wallet</Button>
    );
};

export default ButtonWalletConnect