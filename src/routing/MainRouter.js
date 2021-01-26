/**
 * File: MainRouter.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:47:32 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Main Router for the application
 * Last Modified: Tuesday, 26th January 2021 6:09:34 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";

import { Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";

import Header from "../components/layout/Header";
import Articles from "../pages/article/Articles";

import routes from "./routes";

const MainRouter = () => {
  return (
    <React.Fragment>
      <Header />
      <Grid
        container
        spacing={8}
        justify="center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid item xs={11}>
          <Switch>
            <Route exact path="/" component={Articles} />

            {routes.map(({ link, component }, i) => (
              <Route path={link} component={component} key={i} />
            ))}
          </Switch>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MainRouter;
