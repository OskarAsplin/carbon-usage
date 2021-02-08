import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStyles, CssBaseline, MuiThemeProvider, Theme, PaletteType, Button, Typography } from "@material-ui/core";
import { indigo, lightBlue } from "@material-ui/core/colors";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import AppBarView from './components/AppBarView';
import SnackbarView from './components/SnackbarView';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    appBarSpace: theme.mixins.toolbar,
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [pingResponse, setPingResponse] = useState('');
  const thememode: PaletteType = darkState ? 'dark' : 'light';

  useEffect(() => {
    pingCarbonInterface();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const muiTheme = createMuiTheme({
    typography: {
      fontFamily: `'Lato', 'Roboto', 'Helvetica', 'Arial', sans- serif`,
    },
    palette: {
      primary: {
        light: indigo[300],
        main: indigo[500],
        dark: indigo[700]
      },
      secondary: {
        light: lightBlue[300],
        main: lightBlue[400],
        dark: lightBlue[700]
      },
      type: thememode
    }
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const pingCarbonInterface = () => {
    const apiKey = process.env.REACT_APP_CARBONINTERFACE_API_KEY;

    fetch('https://www.carboninterface.com/api/v1/auth', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
      },
    }).then(response => response.json())
      .then((data) => {
        setPingResponse(data.message);
      }).catch((reason) => {
        console.log(reason);
        setShowErrorSnackbar(true);
      });
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AppBarView thememode={thememode} changeTheme={handleThemeChange} />
      <div className={classes.appBarSpace} />
      <main className={classes.root}>
        <Button variant="contained" onClick={() => pingCarbonInterface()}>
        Ping CarbonInterface
        </Button>
        <Typography>
        {pingResponse}
        </Typography>
        <SnackbarView
        showSnackbar={showErrorSnackbar}
        setShowSnackbar={setShowErrorSnackbar}
        severity={'error'}
        message={'Could not connect to carbon interface!'}/>
      </main>
    </MuiThemeProvider>
  );
}

export default App;
