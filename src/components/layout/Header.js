/**
 * File: Header.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 5:24:46 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 26th January 2021 6:43:38 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

/**
 * Primary dependencies
 */
import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

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

import routes from "./../../routing/routes";

import auth from "../../helpers/auth-helper";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = () =>
  createStyles({
    root: {
      justifyContent: "space-between",
      "& a": {
        color: "#fff",
      },
    },
  });

/**
 * Header for the application
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Header = ({ history, classes }) => {
  /**
   * If set to true, displays routes that only authenticated users should see
   * If not, displays login / register
   */
  const [isAuthed, setIsAuthed] = React.useState(false);

  /**
   * Check if the user is authenticaed
   */
  useEffect(() => {
    const setAuth = (bool) => setIsAuthed(bool);

    const jwt = auth.isAuthenticated();
    setAuth(jwt ? true : false);

    /**
     * Listen for changes in the URL bar,
     * and check if the user is authenticated
     *
     * Can only be done when the component
     * is exported through withRouter
     */
    history.listen(() => {
      const jwt = auth.isAuthenticated();
      setAuth(jwt ? true : false);
    });
  }, [history]);

  /**
   * Render JSX
   */
  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Button component={Link} to="/">
          Adv JS CA2
        </Button>

        <div>
          <Button component={Link} to="/">
            Articles
          </Button>
          {routes
            .filter((route) => route.authed === isAuthed && route.displayOnNav)
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

export default withRouter(withStyles(styles)(Header));
