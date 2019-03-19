import React, { Component, Suspense } from  "react"; //, lazy
//import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import App from './App';
import BlogHome from './BlogHome';
import BlogPost from './BlogPost';
import CategoryPost from './CategoryPost';
import SearchPost from './SearchPost';
import NotFound from './NotFound';

/*class Routes extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Route exact path={"/"} component={BlogHome} />  
                <Route path={"/p/:page"} component={BlogHome} />    
                <Route path={"/post/:slug"} component={BlogPost} />
            </div>
        </BrowserRouter>
    )
  }
}*/

class Routes extends Component {
  render() {
    return (
         <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path={"/"} component={BlogHome} />  
                <Route path={"/page/:page"} component={BlogHome} />
                <Route path={"/category/:category"} component={CategoryPost} />
                <Route path={"/search/:search"} component={SearchPost} />
                <Route path={"/post/:slug"} component={BlogPost} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Suspense>
          </Router>
    )
  }
}

export default Routes;