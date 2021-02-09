import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button, Paper, Grid, Typography, FormControl, InputLabel, MenuItem, Select, Fade } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import { minDate, maxDate, isValidStartDate, isValidStartDateAndCountry, isValidWeeklyUsages } from '../utils/validation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formRow: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    infoText: {
      marginBottom: theme.spacing(2),
    },
    paper: {
      marginBottom: theme.spacing(6),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
  }),
);


interface OwnProps {}

type Props = OwnProps;

const ElectricityForm: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [country, setCountry] = useState('');
  const [weeklyUsage, setWeeklyUsage] = useState<(number | undefined)[]>(Array(7).fill(undefined));
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCountry(event.target.value as string);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>, day: number) => {
    if (event.target.value.length > 0) {
      setWeeklyUsage([...weeklyUsage.slice(0, day), +event.target.value, ...weeklyUsage.slice(day+1)]);
    } else {
      setWeeklyUsage([...weeklyUsage.slice(0, day), undefined, ...weeklyUsage.slice(day+1)]);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant='h6' className={classes.infoText}>
        Enter your location and the starting date for your weekly carbon footprint calculation
      </Typography>
      <Paper variant="outlined" className={classes.paper}>
        <form className={classes.form} autoComplete="off">
          <div className={classes.formRow}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={country}
                onChange={handleCountryChange}
                data-testid={'country-select'}
                label="Country"
              >
                <MenuItem value={'us'}>United States</MenuItem>
                <MenuItem value={'ca'}>Canada</MenuItem>
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                minDate={minDate}
                maxDate={maxDate}
                margin="normal"
                id="date-picker-inline"
                label="Start date"
                value={selectedDate}
                onChange={handleDateChange}
                autoOk
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </form>
      </Paper>
      {isValidStartDateAndCountry(selectedDate, country) &&
        <Fade in={isValidStartDateAndCountry(selectedDate, country)}>
          <Typography variant='h6' className={classes.infoText}>
          Enter the electricity usage (mwh) for each day
          </Typography>
        </Fade>}
      {isValidStartDateAndCountry(selectedDate, country) &&
        <Fade in={isValidStartDateAndCountry(selectedDate, country)}>
          <Paper variant="outlined" className={classes.paper}>
            <form className={classes.form} autoComplete="off">
              <div className={classes.formRow}>
                {weeklyUsage.map((dayUsage, i) => {
                  if (selectedDate) {
                    const startDate: Date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
                    startDate.setDate(selectedDate.getDate() + i);
                    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
                    return (<TextField
                      key={'dayUsageInput:' + i}
                      value={!dayUsage && dayUsage !== 0 ? '' : dayUsage}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleValueChange(event, i)}
                      id="outlined-number"
                      data-testid="outlined-number"
                      label={startDate.toLocaleDateString('en-UK', options)}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />);
                  }
                })}
              </div>
            </form>
          </Paper>
        </Fade>}
      {isValidStartDateAndCountry(selectedDate, country) && isValidWeeklyUsages(weeklyUsage) &&
        <Button variant="contained">
        Show carbon footprint
        </Button>}
    </div>
  );
};

export default ElectricityForm;
