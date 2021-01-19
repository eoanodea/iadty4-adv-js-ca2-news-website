/**
 * File: routes.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 4:10:03 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 15th January 2021 4:43:53 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Article from "../pages/Article";
import Articles from "../pages/Articles";

const routes = [
  {
    name: "Login",
    link: "/login",
    component: Login,
    authed: false,
    displayOnNav: true,
  },
  {
    name: "Register",
    link: "/register",
    component: Register,
    authed: false,
    displayOnNav: true,
  },
  {
    name: "Profile",
    link: "/profile",
    component: Profile,
    authed: true,
    displayOnNav: true,
  },
  {
    name: "Article",
    link: "/article/:id",
    component: Article,
    authed: false,
  },
  {
    name: "Articles by User",
    link: "/user/:id",
    component: Articles,
    authed: false,
  },
  {
    name: "Articles by Category",
    link: "/category/:id",
    component: Articles,
    authed: false,
  },
];

export default routes;
