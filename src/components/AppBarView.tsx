import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, PaletteType } from '@material-ui/core';
import Brightness2 from "@material-ui/icons/Brightness2";
import Brightness4 from "@material-ui/icons/Brightness4";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        brightnessButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

interface OwnProps {
    thememode: PaletteType,
    changeTheme: () => void,
}

type Props = OwnProps;

const AppBarView: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { thememode, changeTheme } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          Carbon Footprint
          </Typography>
          <IconButton edge="start" className={classes.brightnessButton} color="inherit" aria-label="brightness"
          onClick={changeTheme}>
            {thememode === 'light' ? <Brightness2 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppBarView;
