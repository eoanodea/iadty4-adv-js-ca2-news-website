/**
 * Primary dependencies
 */
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

/**
 * Renders an Error
 *  for the application
 */
const Error = ({ message }) => (
  <React.Fragment>
    <h2>Error {message ? message : ""}</h2>
    <Button component={Link} to="/" color="primary" variant="contained">
      Home
    </Button>
  </React.Fragment>
);

export default Error;
