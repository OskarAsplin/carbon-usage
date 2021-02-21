import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React from 'react';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

interface OwnProps {
  showSnackbar: boolean,
  setShowSnackbar: (show: boolean) => void,
  severity: "error" | "warning" | "info" | "success",
  message: string
}

type Props = OwnProps;

const SnackbarView: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { showSnackbar, setShowSnackbar, severity, message } = props;

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackbar(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackbarView;
