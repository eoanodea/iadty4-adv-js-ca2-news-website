/**
 * File: theme.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:46:00 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 5th January 2021 6:06:26 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6200ea",
    },
    secondary: {
      main: "#64dd17",
    },
    // type: "dark",
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  overrides: {
    MuiTextField: {
      root: {
        width: "90%",
        margin: "16px auto",
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
