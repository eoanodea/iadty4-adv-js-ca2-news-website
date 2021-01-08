/**
 * File: auth-helper.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 6:27:44 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 8th January 2021 3:56:38 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

const auth = {
  setUserDetails(user, cb) {
    const jwt = {
      token: user.api_token,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    };

    sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb(true);
  },
  unsetUserDetails(cb) {
    sessionStorage.removeItem("jwt");
    cb(true);
  },
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (sessionStorage.getItem("jwt")) {
      const obj = JSON.parse(sessionStorage.getItem("jwt"));
      return obj && obj.user ? obj : false;
    }

    return false;
  },
};

export default auth;
