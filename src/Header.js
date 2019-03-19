import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import SVG from 'react-inlinesvg';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
import Popover from '@material-ui/core/Popover';
import CircularProgress from '@material-ui/core/CircularProgress';

//import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
//import { withStyles } from '@material-ui/core/styles';

import classnames from 'classnames';

import Butter from 'buttercms'
const butter = Butter('de55d3f93789d4c5c26fb07445b680e8bca843bd')

const logoPNG = require('./colissimo_logo.png');
const logoSVG = require('./colissimo_logo.svg');

var suggestions = [];


function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <InputBase
      fullWidth
      inputRef={node => {
          ref(node);
          inputRef(node);
      }}
      //InputProps={{
      //  inputRef: node => {
      //    ref(node);
      //    inputRef(node);
      //  },
      //  classes: {
      //    root: classes.inputRoot,
      //    input: classes.inputInput,
      //  },
      //}}
      {...other}
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.title, query);
  const parts = parse(suggestion.title, matches);
console.log(suggestion);
  return (
    <a href={`/post/${suggestion.url}`} key={`search-post-${suggestion.url}`}>
    <MenuItem selected={isHighlighted} component="div">
        <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ),
        )}
      </div>
    </MenuItem>
    </a>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.title.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.title;
}

 const styles = theme => ({
        root: {
          width: '100%',
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
        typography: {
            margin: theme.spacing.unit * 2,
        },
        progress: {
            margin: theme.spacing.unit * 2,
        },
        
        container: {
            position: 'relative',
          },
          suggestionsContainerOpen: {
            position: 'absolute',
            zIndex: 1,
            marginTop: theme.spacing.unit,
            left: 0,
            right: 0,
          },
          suggestion: {
            display: 'block',
          },
          suggestionsList: {
            margin: 0,
            padding: 0,
            listStyleType: 'none',
          },
          divider: {
            height: theme.spacing.unit * 2,
          },
      });
      
class Header extends React.Component {
    
        
  constructor(props) {
    super(props);

    this.state = {
        loadingSearch: false,
        dataSearch: [],
        open: false,
        anchorEl: null,
        
        single: '',
        popper: '',
        suggestions: [],
    };
  }
  
  searchPosts = e => {
      //console.log(`e.currentTarget: `,e.currentTarget);
      if(e.target.value.length == 0) return false;
      let $this = this;
      
      $this.setState({
        loadingSearch: true,
        open: true
      });
      
      butter.post.search(e.target.value)
        .then(function(resp) {
          //if(resp.data && resp.data.data.length > 0){
            $this.setState({
              loadingSearch: false,
            });
          //}
          console.log(resp.data)
        }).catch(function(resp) {
          console.log(resp)
        });
  }
  
  handleClose = () => {
    this.setState({
      open: false,
    });
  }
  
  onKeyPressed = e => {
    console.log(e.keyCode);
    if(e.keyCode == 13){
        //this.props.history.push(`/search/${e.target.value}`);
        window.location = `/search/${e.target.value}`;
    }
  }
  
  handleSuggestionsFetchRequested = ({ value }) => {
      //console.log(value);
      let $this = this;
      butter.post.search(value)
        .then(function(resp) {
            //console.log('getSuggestions',getSuggestions(value))
          suggestions = resp.data.data;
          $this.setState({
            suggestions: getSuggestions(value),
          });
          
        }).catch(function(resp) {
          console.log(resp)
        });
    
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    })
}
  
  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;
    
    const autosuggestProps = {
      renderInputComponent,
      suggestions: suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
                  <AppBar position="fixed">
                    <style>{`
                      body{
                        overflow-x: hidden;
                      }

                      html { height: 100%; }
                      body {
                        min-height:100%; 
                        position:relative; 
                        padding-bottom:30px
                      }
                      .footer { 
                        position: absolute; 
                        left: 0 ; right: 0; bottom: 0; 
                        height:30px
                      }

                      a:link {
                        color:#ff5722;
                        text-decoration: none;
                      }

                      a:visited {
                        color:#ff5722;
                        text-decoration: none;
                      }

                      a:hover {
                        text-decoration: none;
                      }

                      a:active {
                        text-decoration: underline;
                      }

                      .main{
                          margin: 80px 0 15px auto;
                      }

                      .control{
                          margin: 15px 0 55px auto;
                          text-align: center;
                      }

                      .footer {
                        margin-top: 15px;
                        padding: 18px 10px 12px;
                        background: #ffffff;
                        border-top: 2px solid #ff5722;
                        text-align: center;

                      }
                    `}</style>
                    <Toolbar>
                      <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                      <Link to={`/`}>
                          <img src={logoPNG} height="38" />
                      </Link>
                      </Typography>

                      <div className={classes.grow} />
                        <div className={classes.search}>
                          <div className={classes.searchIcon}>
                            <SearchIcon />
                          </div>
                          <Autosuggest
                            {...autosuggestProps}
                            inputProps={{
                              classes,
                              placeholder: 'Search…',
                              value: this.state.single,
                              onChange: this.handleChange('single'),
                            }}
                            theme={{
                              container: classes.container,
                              suggestionsContainerOpen: classes.suggestionsContainerOpen,
                              suggestionsList: classes.suggestionsList,
                              suggestion: classes.suggestion,
                            }}
                            renderSuggestionsContainer={options => (
                              <Paper {...options.containerProps} square>
                                {options.children}
                              </Paper>
                            )}
                          />
                        </div>
                    </Toolbar>
                  </AppBar>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);