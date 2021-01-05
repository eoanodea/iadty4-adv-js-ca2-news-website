/**
 * File: Login.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:58:06 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 5th January 2021 6:58:47 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect } from "react";

import {
  Typography,
  Paper,
  withStyles,
  createStyles,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import Loading from "../components/global/Loading";
import Error from "../components/global/Error";

const styles = ({ spacing }) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
    },
  });

const Profile = ({ classes }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  useEffect(() => {
    const jwt = auth.isAuthenticated();
    if (jwt) {
      setUser(jwt.user);
      setLoading(false);
    } else {
      setError("You are not authenticated, please log in");
    }
  }, []);

  if (loading) return <Loading />;
  if (error !== "") return <Error message={error} />;

  return (
    <Paper elevation={3} className={classes.wrapper}>
      <Typography variant="h3">Profile</Typography>
      <Typography variant="h3">{user.email}</Typography>

      <Button
        color="secondary"
        variant="contained"
        disabled={loading}
        endIcon={loading ? <CircularProgress size={18} /> : <Check />}
        component={Link}
        to="/login"
      >
        Login
      </Button>
    </Paper>
  );
};

export default withStyles(styles)(Profile);
