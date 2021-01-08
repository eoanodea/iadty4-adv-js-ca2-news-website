/**
 * File: routes.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 4:10:03 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 8th January 2021 4:37:48 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const routes = [
  {
    name: "Login",
    link: "/login",
    component: Login,
    authed: false,
  },
  {
    name: "Register",
    link: "/register",
    component: Register,
    authed: false,
  },
  {
    name: "Profile",
    link: "/profile",
    component: Profile,
    authed: true,
  },
];

export default routes;
