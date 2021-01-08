/**
 * Primary dependencies
 */
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  withStyles,
  createStyles,
  Paper,
} from "@material-ui/core";

const styles = ({ spacing }) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
    },
  });

/**
 * Renders an Error
 *  for the application
 */
const Error = ({ message, classes }) => (
  <Paper elevation={3} className={classes.wrapper}>
    <Typography variant="h4">{message ? message : ""}</Typography>
    <br />
    <Button component={Link} to="/" color="primary" variant="contained">
      Home
    </Button>
  </Paper>
);

export default withStyles(styles)(Error);
