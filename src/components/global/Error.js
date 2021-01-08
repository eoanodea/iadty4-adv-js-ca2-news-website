/**
 * Primary dependencies
 */
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  withStyles,
  createStyles,
  Card,
  CardHeader,
} from "@material-ui/core";
import { Replay, Error } from "@material-ui/icons";

const styles = ({ spacing }) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
      textAlign: "center",
    },
    icon: {
      fontSize: "3em",
    },
    header: {
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "center",
    },
    iconContainer: {
      textAlign: "center",
    },
  });

/**
 * Renders an Error
 *  for the application
 */
const EmptyState = ({ message, classes, action }) => (
  <Card elevation={3} className={classes.wrapper}>
    <div className={classes.iconContainer}>
      <Error color="error" className={classes.icon} />
    </div>
    <CardHeader
      title={message ? message : "There was a problem"}
      className={classes.header}
    />
    {action ? (
      <Button
        className={classes.iconContainer}
        variant="contained"
        color="secondary"
        endIcon={<Replay />}
        onClick={action}
      >
        Try again
      </Button>
    ) : (
      <Button component={Link} to="/" color="primary" variant="contained">
        Home
      </Button>
    )}
  </Card>
);

export default withStyles(styles)(EmptyState);
