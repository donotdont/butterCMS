import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import SVG from 'react-inlinesvg';
import Butter from 'buttercms'
//import Head from 'next/head'
import { Helmet } from "react-helmet";


//import ReactDOM from 'react-dom';
import { createMuiTheme, MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//import Typography from '@material-ui/core/Typography';

import Loading from './Loading';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const logoPNG = require('./colissimo_logo.png');
const logoSVG = require('./colissimo_logo.svg');

const butter = Butter('de55d3f93789d4c5c26fb07445b680e8bca843bd')

const themeColor = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: red,
  },
   typography: {
    useNextVariants: true,
  },
});

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    //width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class BlogPost extends React.Component {
    
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  componentWillMount() {
    let slug = this.props.match.params.slug;

    butter.post.retrieve(slug).then((resp) => {
      this.setState({
        loaded: true,
        post: resp.data.data
      })
    });
  }
  
  render() {
      
      
    if (this.state.loaded) {
    const { classes } = this.props;
    const post = this.state.post;
  
    return (
      
        <MuiThemeProvider theme={themeColor}>
        <Helmet>
            <title>{post.seo_title}</title>
            <meta name="description" content={post.meta_description} />
            <meta name="og:image" content={post.featured_image} />
        </Helmet>
        <Header />
        
        <div className={"main"}>
            <Grid 
            container
            direction="row"
            justify="center"
            alignItems="flex-start" 
            spacing={24}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                      {post.title}
                    </Typography>
                    <Typography component="p" dangerouslySetInnerHTML={{__html: post.body}}></Typography>
                    </Paper>
                </Grid>
                <Sidebar />
            </Grid>
        </div>
        
      <Footer />
      </MuiThemeProvider>
      
    )
    } else {
      return (
        <div>
          <Loading />
        </div>
      );
    }
  }
}

BlogPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogPost);