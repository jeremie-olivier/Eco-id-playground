import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import { Alert, Snackbar } from '@mui/material';

function ErrorToast() {

    const globalServices = useContext(GlobalStateContext);
    const [state, send] = useActor(globalServices.stateService);
    const [open, setOpen] = React.useState(true);


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpen(false);
    };

    return (

        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                {
                    // @ts-ignore
                    state.event.data.reason
                }
            </Alert>
        </Snackbar>
    )

}


export default ErrorToast;