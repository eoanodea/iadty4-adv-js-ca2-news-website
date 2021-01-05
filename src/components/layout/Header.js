/**
 * File: Header.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 5:24:46 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 5th January 2021 5:25:46 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

/*
 * File: Header.tsx
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 5:24:46 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 5th January 2021 5:24:48 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

/**
 * Primary dependencies
 */
import React from "react";

/**
 * Component Library imports
 */
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

/**
 * Header for the application
 */
const Header = () => (
  <AppBar position="static">
    <Toolbar style={{ justifyContent: "space-between" }}>
      <Button component={Link} to="/">
        Adv JS CA2
      </Button>

      <div>
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/login">
          Login
        </Button>
      </div>
    </Toolbar>
  </AppBar>
);

export default Header;
