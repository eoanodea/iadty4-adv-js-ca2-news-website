/**
 * File: theme.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:46:00 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Stylings applied to Material UI Library
 * Last Modified: Thursday, 28th January 2021 5:49:03 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#ffc400",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  overrides: {
    MuiTextField: {
      root: {
        width: "100%",
        margin: "16px auto",
      },
    },
    MuiListItemText: {
      root: {
        display: "flex",
        flexDirection: "column-reverse",
      },
    },
    MuiTypography: {
      h3: {
        fontWeight: 500,
        fontSize: "2.3em",
        margin: "10px",
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
