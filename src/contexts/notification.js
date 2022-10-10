import React, { useState, createContext, useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationContext = createContext({});

export function NotificationProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState();

  const setErrorMessage = (message) => {
    setMessage(message);
    setError(true);
    setOpen(true);
  };

  const setSuccessMessage = (message) => {
    setMessage(message);
    setError(false);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    // if(reason === 'clickaway'){
    //   return;
    // }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <NotificationContext.Provider
      value={{
        setErrorMessage,
        setSuccessMessage,
      }}
    >
      <React.Fragment>
        {children}
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <SnackbarContent message={message} action={action} />
          </Snackbar>
        </Stack>
      </React.Fragment>
    </NotificationContext.Provider>
  );
}

export default function useNotification() {
  return useContext(NotificationContext);
}
