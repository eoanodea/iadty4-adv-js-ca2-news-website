/**
 * File: theme.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:46:00 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 5th January 2021 1:46:35 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  background: "#222",
  palette: {
    primary: {
      light: "#494949",
      main: "#222222",
      dark: "#000000",
      contrastText: "#ffffffdb",
    },
    secondary: {
      light: "#ff6482",
      main: "#f92056",
      dark: "#bf002e",
      contrastText: "#000000",
    },
    type: "dark",
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  overrides: {
    //
  },
});
theme = responsiveFontSizes(theme);

export default theme;
