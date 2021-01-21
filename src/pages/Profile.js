/**
 * File: Login.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:58:06 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 21st January 2021 1:52:47 pm
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
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
} from "@material-ui/core";
import {
  AccountCircle,
  Email,
  ExitToApp,
  QueryBuilder,
} from "@material-ui/icons";
import auth from "../helpers/auth-helper";
import Loading from "../components/global/Loading";
import EmptyState from "../components/global/EmptyState";
import { logout } from "../api/api-auth";

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
      <CardHeader title="Profile" />
      <List>
        <ListItem button>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText secondary="Name" primary={user.name} />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText secondary="Email" primary={user.email} />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <QueryBuilder />
          </ListItemIcon>
          <ListItemText
            secondary="Date Joined"
            primary={new Date(user.created).toDateString()}
          />
        </ListItem>
      </List>

      <CardActions>
        <Button
          color="secondary"
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
