/**
 * Primary dependencies
 */
import React from "react";

/**
 * Component Library imports
 */
import { CircularProgress, withStyles, createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    progressWrapper: {
      minHeight: "-webkit-fill-available",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

/**
 * Renders an Activity Indicator
 *  for the application
 */
const Loading = ({ classes }) => (
  <div className={classes.progressWrapper}>
    <CircularProgress />
  </div>
);

export default withStyles(styles)(Loading);
