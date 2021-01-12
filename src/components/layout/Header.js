/**
 * File: Header.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 5:24:46 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 12th January 2021 1:35:08 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

/**
 * Primary dependencies
 */
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

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

import routes from "./../../routing/routes";
import auth from "../../helpers/auth-helper";

const styles = () =>
  createStyles({
    root: {
      justifyContent: "space-between",
    },
  });

/**
 * Header for the application
 */
const Header = ({ history, classes }) => {
  const [isAuthed, setIsAuthed] = React.useState(false);

  useEffect(() => {
    const setAuth = (bool) => setIsAuthed(bool);

    const jwt = auth.isAuthenticated();
    setAuth(jwt ? true : false);

    history.listen(() => {
      const jwt = auth.isAuthenticated();
      setAuth(jwt ? true : false);
    });
  }, [history]);

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Button component={Link} to="/">
          {/* Adv JS CA2 */}
        </Button>

        <div>
          <Button component={Link} to="/">
            Home
          </Button>
          {routes
            .filter((route) => route.authed === isAuthed)
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
