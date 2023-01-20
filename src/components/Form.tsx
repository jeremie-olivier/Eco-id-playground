import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <div>
        <TextField
          disabled
          id="filled-disabled"
          label="receiver address"
          defaultValue="0xFF522090FAD73DFf90909DA11"
          variant="filled"
        />
        <TextField
          disabled
          id="filled-disabled"
          label="deadline"
          defaultValue="2022-01-15 23:09"
          variant="filled"
        />
      </div>
      <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label="Revocable" />
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Not Revocable</Typography>
        <Switch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>Revocable</Typography>
      </Stack>
      </FormGroup>
      
    </Box>
    
  );
};
