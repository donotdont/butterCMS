import React, { Component } from 'react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import Butter from 'buttercms'

import SVG from 'react-inlinesvg';
//import { ReactComponent as logo } from './colissimo_logo.svg';
//import Link from 'next/link'
//import Butter from 'buttercms'

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

import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
//import IconButton from '@material-ui/core/IconButton';
//import Typography from '@material-ui/core/Typography';
//import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

import Loading from './Loading';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import Pagination from "material-ui-flat-pagination";

const butter = Butter('de55d3f93789d4c5c26fb07445b680e8bca843bd')

//import { JssProvider, SheetsRegistry } from 'react-jss'
const logoPNG = require('./colissimo_logo.png');
const logoSVG = require('./colissimo_logo.svg');

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
    width: '100%',
  },
  rootPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
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
    
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    objectFit: 'cover',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  chip: {
    margin: theme.spacing.unit,
  },
});


class SearchPost extends React.Component {
        
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      offset: 0
    };
  }
  
  handleClick(event,offset,number) {
    this.setState({ offset });
    //return <Redirect to={`/p/${number}`}  />
    this.props.history.push(`/page/${number}`);
  }
  
  searchPosts = e => {
      butter.post.search(e.target.value)
        .then(function(resp) {
          console.log(resp.data)
        }).catch(function(resp) {
          console.log(resp)
        });
  }

  fetchPosts(page,search) {
        butter.post.search(search).then((resp) => {
          
          this.setState({
            loaded: true,
            resp: resp.data
          })
        });
  }
  
  category(){
      //alert('You clicked the Chip.');
  }

  componentWillMount() {
    let page = this.props.match.params.page || 1;
    this.setState({ offset: (page-1)*10 });
    
    let search = this.props.match.params.search || null;
    this.fetchPosts(page,search);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({loaded: false});
    console.log(nextProps);
    let page = nextProps.match.params.page || 1;

    this.fetchPosts(page,null)
  }
  
  dateFormat(post){
      return <Moment format="D MMMM YYYY" titleFormat="DD MMMM YYYY" withTitle>{post.published}</Moment>
  }
  
  render() {
      
    
    
    // Create a new class name generator.
    //const generateClassName = createGenerateClassName();
    //const sheetsRegistry = new SheetsRegistry();
    //<JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>

    if (this.state.loaded) {
        const { classes } = this.props;
        const { next_page, previous_page, count } = this.state.resp.meta;
        //console.log(this.state);
    return (
      
      <MuiThemeProvider theme={themeColor} sheetsManager={new Map()}>
      <div className={classes.root}>
        <Header />

        <div className={"main"}>
        <Grid 
        container
        direction="row"
        justify="center"
        alignItems="flex-start" 
        spacing={24}>
        <Grid item xs={12} sm={6}>
        <Typography gutterBottom variant="h4" component="h2">
        {`Search : ${this.props.match.params.search}`}
        </Typography>
        <Grid container  direction="row"  justify="center"  alignItems="stretch" spacing={16}>
            {this.state.resp.data.map((post, key) => {
              return (

            <Grid item md={4} key={key}>
                
                    <Card className={classes.card}>
                        <CardHeader
                          avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                              {post.author.first_name[0]}
                            </Avatar>
                          }
                          action={
                            <IconButton>
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={post.author.first_name+'  '+post.author.last_name}
                          subheader={this.dateFormat(post)}
                        />
                        <Link to={`/post/${post.slug}`}>
                        <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={post.featured_image}
                              title={post.title}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                {post.title}
                              </Typography>
                              <Typography component="p">
                                {post.summary}
                              </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Link>
                        <CardActions className={classes.actions} disableActionSpacing>
                            <CardContent>
                                {post.categories.map((cat,keyCat) => {
                                    return <Link to={`/category/${cat.name}`} key={`category-${key}-${keyCat}`}><Chip color="primary" variant="outlined" label={cat.name} onClick={this.category} className={classes.chip} key={key} /></Link>
                                })}
                            </CardContent>
                        </CardActions>
                        <CardActions className={classes.actions} disableActionSpacing>
                          <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton aria-label="Share">
                            <ShareIcon />
                          </IconButton>
                        </CardActions>
                  </Card>
              
          </Grid>
          )
        })}
        </Grid>
        </Grid>
        
                <Sidebar />
        
        </Grid>
        </div>
        
        
        {(!this.props.match.params.category && !this.props.match.params.search) && (
        <div className={"control"}>
          <Pagination
          limit={10}
          offset={this.state.offset}
          total={count}
          onClick={(e, offset, number) => this.handleClick(e, offset, number)}
          //previousPageLabel=<Link to={`/page/${previous_page}`}>Prev</Link>
          //nextPageLabel=<Link to={`/page/${next_page}`}>Next</Link>
        />
        </div>
                )}
        
      </div>
      
      <Footer />
      </MuiThemeProvider>
      
    )
    } else {
      return (
        <div>
          <Loading />
        </div>
      )
    }
  }
}

SearchPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchPost);