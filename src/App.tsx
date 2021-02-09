import { createStyles, CssBaseline, MuiThemeProvider, Theme, PaletteType } from "@material-ui/core";
import { indigo, lightBlue } from "@material-ui/core/colors";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from 'react';
import './App.css';
import AppBarView from './components/AppBarView';
import CarbonUsageDisplay from './components/CarbonUsageDisplay';
import ElectricityForm from './components/ElectricityForm';
import SnackbarView from './components/SnackbarView';
import logo from './logo.svg';
import { pingCarbonInterface } from './services/carbonInterfaceService';
import { CarbonElectricityResult } from './types/domainTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: theme.spacing(0, 4),
    },
    appBarSpace: {
      marginBottom: theme.spacing(6)
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [pingResponse, setPingResponse] = useState('');
  const [carbonUsageResults, setCarbonUsageResults] = useState<(CarbonElectricityResult)[]>([]);
  const thememode: PaletteType = darkState ? 'dark' : 'light';

  useEffect(() => {
    pingCarbonInterface()
      .then(response => response.json())
      .then((data) => {
        setPingResponse(data.message);
      }).catch((reason) => {
        console.log(reason);
        setShowErrorSnackbar(true);
      });
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

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AppBarView thememode={thememode} changeTheme={handleThemeChange} />
      <div className={classes.appBarSpace} />
      <main className={classes.root}>
        <ElectricityForm setResults={setCarbonUsageResults} />
        {carbonUsageResults.length > 0 && < CarbonUsageDisplay results={carbonUsageResults} />}
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
