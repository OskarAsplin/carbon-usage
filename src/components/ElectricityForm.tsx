import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button, Paper, Grid, Typography, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

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


interface OwnProps {
}

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

  const isValidStartDate = () => {
    return selectedDate && isValidDate(selectedDate) && selectedDate > minDate && selectedDate < maxDate;
  }

  const isValidDate = (d: any) => {
    return d instanceof Date && !isNaN(d.getTime());
  }

  const isValidStartDateAndCountry = () => {
    return isValidStartDate() && country;
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>, day: number) => {
    if (event.target.value.length > 0) {
      setWeeklyUsage([...weeklyUsage.slice(0, day), +event.target.value, ...weeklyUsage.slice(day+1)]);
    } else {
      setWeeklyUsage([...weeklyUsage.slice(0, day), undefined, ...weeklyUsage.slice(day+1)]);
    }
  };

  const minDate = new Date(new Date().getFullYear() - 20, 0, 1);
  const maxDate = new Date(new Date().getFullYear() + 1, 11, 31);

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
      {isValidStartDateAndCountry() &&
      <Typography variant='h6' className={classes.infoText}>
        Enter the electricity usage (mwh) for each day
      </Typography>}
      {isValidStartDateAndCountry() &&
        <Paper variant="outlined" className={classes.paper}>
          <form className={classes.form} autoComplete="off">
            <div className={classes.formRow}>
              {weeklyUsage.map((dayUsage, i) => {
                if (selectedDate) {
                  const dayDate: Date = new Date();
                  dayDate.setDate(selectedDate.getDate() + i);
                  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
                  return (<TextField
                    key={'dayUsageInput:' + i}
                    value={!dayUsage && dayUsage !== 0 ? '' : dayUsage}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleValueChange(event, i)}
                    id="outlined-number"
                    data-testid="outlined-number"
                    label={dayDate.toLocaleDateString('en-UK', options)}
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
        </Paper>}
      {isValidStartDateAndCountry() && !weeklyUsage.includes(undefined) &&
        <Button variant="contained">
        Show carbon footprint
        </Button>}
    </div>
  );
};

export default ElectricityForm;
