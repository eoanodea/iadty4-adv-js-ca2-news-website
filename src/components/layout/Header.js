/**
 * File: Header.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 5:24:46 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 8th January 2021 4:35:22 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

/**
 * Primary dependencies
 */
import React from "react";

/**
 * Component Library imports
 */
import {
  AppBar,
  Button,
  createStyles,
  Toolbar,
  withStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import routes from "./../../routes";

const styles = () =>
  createStyles({
    root: {
      justifyContent: "space-between",
    },
  });

/**
 * Header for the application
 */
const Header = ({ classes, authenticated = false }) => {
  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Button component={Link} to="/">
          Adv JS CA2
        </Button>

        <div>
          <Button component={Link} to="/">
            Home
          </Button>
          {routes
            .filter((route) => route.authed === authenticated)
            .map((route, i) => (
              <Button key={i} component={Link} to={route.link}>
                {route.name}
              </Button>
            ))}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
