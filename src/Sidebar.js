import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Loading from './Loading';
import { Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';

import Butter from 'buttercms'
const butter = Butter('de55d3f93789d4c5c26fb07445b680e8bca843bd')

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    //maxHeight: 300,
  },
  rootPaperTop: {
    //...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  rootPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryLoaded: false,
      value: 0,
    };
  }
  
  fetchPosts() {  
    butter.post.list({page: 1, page_size: 10}).then((resp) => {
          this.setState({
            loaded: true,
            resp: resp.data,
          });
          console.log(resp.data)
    });
  }
  
  fetchCategories() {
    butter.category.list()
    .then((resp) => {
      this.setState({
        categoryLoaded: true,
        category: resp.data,
      })
    }).catch(function(resp) {
      console.log(resp)
    });
  }
  
  componentWillMount() {
      this.fetchPosts();
      this.fetchCategories();
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  dateFormat(post){
      return <Moment format="D MMMM YYYY" titleFormat="DD MMMM YYYY" withTitle>{post.published}</Moment>
  }
  
  render() {
      const { classes } = this.props;
      const { value } = this.state;
      
        if (this.state.categoryLoaded) {
            const { classes } = this.props;
            //console.log(this.state.category);
            return (
              
                <Grid item xs={12} sm={2}>
                    <Grid item xs={12}>
                    <Paper className={classes.rootPaperTop} elevation={1}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={this.handleChange}
                                //variant="scrollable"
                                //scrollButtons="on"
                                indicatorColor="primary"
                                textColor="primary"
                              >
                                <Tab label="Recent" />
                                <Tab label="Populaire" />
                            </Tabs>
                        </AppBar>
                        {value === 0 && <TabContainer>
                            <List>
                                {this.state.resp && this.state.resp.data.map((recent,key)=>{
                                      return (
                                          <a href={`/post/${recent.slug}`} key={`item-recent-${key}`}>
                                              <ListItem>
                                                  <ListItemText primary={recent.title} secondary={this.dateFormat(recent)} />
                                              </ListItem>
                                          </a>
                                      )
                                  })}
                            </List>
                        </TabContainer>}
                        {value === 1 && <TabContainer>
                            <List>
                                {this.state.resp && this.state.resp.data.map((recent,key)=>{
                                      return (
                                          <a href={`/post/${recent.slug}`} key={`item-populaire-${key}`}>
                                              <ListItem>
                                                  <ListItemText primary={recent.title} secondary={this.dateFormat(recent)} />
                                              </ListItem>
                                          </a>
                                      )
                                  })}
                            </List>
                        </TabContainer>}
                    </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <Paper className={classes.rootPaper} elevation={1}>
                        <List className={classes.root} subheader={<li />}>
                          <li className={classes.listSection}>
                              <ul className={classes.ul}>
                                  <ListSubheader>{`Category`}</ListSubheader>
                                  {this.state.category.data.map((cat,key)=>{
                                      return (
                                          <a href={`/category/${cat.name}`} key={`item-category-${key}`}>
                                              <ListItem>
                                                  <ListItemText primary={cat.name} />
                                              </ListItem>
                                          </a>
                                      )
                                  })}
                              </ul>
                          </li>
                        </List>
                    </Paper>
                    </Grid>
                </Grid>  
              
            );
            } else {
                  return (
                    <div>
                      <Loading />
                    </div>
                  )
                }
    }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);