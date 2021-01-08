/**
 * File: MainRouter.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:47:32 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 8th January 2021 4:37:48 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";

import Header from "./components/layout/Header";

import Home from "./pages/Home";

import routes from "./routes";
import auth from "./auth/auth-helper";

const MainRouter = () => {
  const [isAuthed, setIsAuthed] = React.useState(false);

  useEffect(() => {
    const jwt = auth.isAuthenticated();
    setIsAuthed(jwt ? true : false);
  }, []);

  return (
    <React.Fragment>
      <Header authenticated={isAuthed} />
      <Grid
        container
        spacing={8}
        justify="center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid item xs={11}>
          <Switch>
            <Route exact path="/" component={Home} />

            {routes.map(({ link, component }, i) => (
              <Route path={link} component={component} key={i} />
            ))}

            {/* <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} /> */}
          </Switch>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MainRouter;
