/**
 * File: Home.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:57:25 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 8th January 2021 3:53:21 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import {
  Typography,
  Paper,
  withStyles,
  createStyles,
  Button,
} from "@material-ui/core";
import { ArrowRight, Audiotrack } from "@material-ui/icons";
import { Link } from "react-router-dom";

const styles = ({ spacing }) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
      textAlign: "center",
    },
  });

const Home = ({ classes }) => (
  <Paper elevation={3} className={classes.wrapper}>
    <Typography variant="h4">
      <Audiotrack fontSize="large" color="primary" />
    </Typography>
    <Typography variant="h3">Home Page</Typography>
    <br />
    <Button
      color="secondary"
      variant="contained"
      endIcon={<ArrowRight />}
      component={Link}
      to="/login"
    >
      Get Started
    </Button>
  </Paper>
);

export default withStyles(styles)(Home);
