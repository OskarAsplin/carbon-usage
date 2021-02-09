import React, { useState } from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import SnackbarView from './SnackbarView';
import { Paper, Grid, Typography, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { CarbonElectricityResult } from '../types/domainTypes';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '@media (min-width: 1400px)': {
        flexDirection: 'row',
      },
      '@media (max-width: 1399px)': {
        flexDirection: 'column',
      },
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(4, 0),
    },
    paper: {
      '@media (min-width: 1400px)': {
        marginRight: theme.spacing(6),
      },
      '@media (max-width: 1399px)': {
        marginBottom: theme.spacing(6),
      },
      padding: theme.spacing(2, 4),
    },
    paper2: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2, 4),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    totalAmount: {
      marginBottom: theme.spacing(4)
    }
  }),
);

function createData(date: string, amount?: number) {
  return { date, amount };
}

interface OwnProps {
  results: CarbonElectricityResult[],
}

type Props = OwnProps;

const CarbonUsageDisplay: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { results } = props;

  const [unit, setUnit] = useState('kg');

  const handleUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUnit(event.target.value as string);
  };

  const data = results.map((result: CarbonElectricityResult) => {
    switch (unit) {
      case 'g':
        return createData(result.date_string, result.carbon_g);
        break;
      case 'lb':
        return createData(result.date_string, result.carbon_lb);
        break;
      case 'kg':
        return createData(result.date_string, result.carbon_kg);
        break;
      case 'mt':
        return createData(result.date_string, result.carbon_mt);
        break;
    }
  });

  const totalAmount = () => {
    switch (unit) {
      case 'g':
        return results.map((result) => result.carbon_g).reduce((a, b) => a + b, 0);
        break;
      case 'lb':
        return results.map((result) => result.carbon_lb).reduce((a, b) => a + b, 0);
        break;
      case 'kg':
        return results.map((result) => result.carbon_kg).reduce((a, b) => a + b, 0);
        break;
      case 'mt':
        return results.map((result) => result.carbon_mt).reduce((a, b) => a + b, 0);
        break;
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <LineChart
          width={900}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis dataKey="amount">
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              {'Carbon (' + unit + ')'}
              </Label>
          </YAxis>

          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="amount" stroke="#ff7300" yAxisId={0} />
        </LineChart>
      </Paper>
      <Paper className={classes.paper2}>
        <Typography variant="h5" className={classes.totalAmount}>
        {'Total: ' + totalAmount() + ' ' + unit}
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Unit</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={unit}
            onChange={handleUnitChange}
            data-testid={'unit-select'}
            label="Unit"
          >
            <MenuItem value={'g'}>g</MenuItem>
            <MenuItem value={'lb'}>lb</MenuItem>
            <MenuItem value={'kg'}>kg</MenuItem>
            <MenuItem value={'mt'}>mt</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </div>
  );
};

export default CarbonUsageDisplay;
