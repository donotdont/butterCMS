import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import red from '@material-ui/core/colors/red';

const themeColor = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: red,
  },
   typography: {
    useNextVariants: true,
  },
});

const styles = {
  root: {
    flexGrow: 1,
  },
};

function Loading(props) {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={themeColor} sheetsManager={new Map()}>
        <div className={classes.root}>
          <LinearProgress />
          <br />
          <LinearProgress color="secondary" />
        </div>
    </MuiThemeProvider>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
