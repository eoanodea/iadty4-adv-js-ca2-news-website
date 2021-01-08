/**
 * File: Login.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:58:06 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 8th January 2021 4:05:22 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect } from "react";

import {
  CardHeader,
  withStyles,
  createStyles,
  Button,
  Card,
  CardActions,
} from "@material-ui/core";
import { AccountCircle, ExitToApp, Home } from "@material-ui/icons";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import Loading from "../components/global/Loading";
import EmptyState from "../components/global/Error";
import { logout } from "../auth/api-auth";

const styles = ({ spacing }) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
    },
  });

const Profile = ({ classes, history }) => {
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
      setLoading(false);
    }
  }, []);

  const submit = () => {
    const jwt = auth.isAuthenticated();
    if (jwt) {
      setLoading(true);
      logout(jwt.token).then((data) => {
        if (data.errors) {
          setLoading(false);
          return setError(Object.values(data.errors)[0][0]);
        }
        setError("");
        auth.unsetUserDetails((success) => {
          if (success) return history.push("/");
          setError("The system encountered an error, please try again later");
        });
      });
    } else setError("The system encountered an error, please try again later");
  };

  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} />;

  return (
    <Card elevation={3} className={classes.wrapper}>
      <CardHeader
        title="Profile"
        subheader={user.email}
        avatar={<AccountCircle />}
      />
      <CardActions>
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to="/"
          endIcon={<Home />}
        >
          Home
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={submit}
          endIcon={<ExitToApp />}
        >
          Logout
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(Profile);
