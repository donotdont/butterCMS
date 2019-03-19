import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography';

class Footer extends Component {
  render() {
    var today = new Date(), year = today.getFullYear();
    return (
         <div>
            <footer className={"footer"}>
                <Typography component="p">
                    © {year} <Link to="https://blog.common-services.com/">Common Services</Link> - All rights reserved
                </Typography>
            </footer>
         </div>
    )
  }
}

export default Footer;