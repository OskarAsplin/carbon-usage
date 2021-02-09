import React, { useState } from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import SnackbarView from './SnackbarView';
import { Paper } from '@material-ui/core';
import { CarbonElectricityResult } from '../types/domainTypes';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(4, 0),
      padding: theme.spacing(2, 4),
    },
  }),
);

function createData(time: string, amount?: number) {
  return { time, amount };
}

interface OwnProps {
  results: CarbonElectricityResult[],
}

type Props = OwnProps;

const CarbonUsageDisplay: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { results } = props;

  const data = results.map((result: CarbonElectricityResult) => createData(result.date_string, result.carbon_kg));
  console.log(data);

  return (
    <Paper className={classes.root}>
      <LineChart
        width={1000}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="time" />
        <YAxis dataKey="amount">
          <Label
            angle={270}
            position="left"
            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
          >
            Carbon (kg)
            </Label>
        </YAxis>

        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="amount" stroke="#ff7300" yAxisId={0} />
      </LineChart>
    </Paper>
  );
};

export default CarbonUsageDisplay;
