import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import MarkdownElement from '@material-ui/docs/MarkdownElement';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class NotFound extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
        };
      }
    
    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        
        return (
                <Grid container className={classes.root}>
                    <Grid item xs={12}>
                      <Grid
                        container
                        spacing={16}
                        className={classes.demo}
                        alignItems={`center`}
                        direction={`row`}
                        justify={`center`}
                        >
                            <Card className={classes.card}>
                                <CardContent>
                                  <Typography variant="h5" component="h2">
                                    Page not found :(
                                  </Typography>
                                  <Typography component="p">
                                    Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  <Link to={`/`}><Button size="small">Back to our site</Button></Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
        
        )
    }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);