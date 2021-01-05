/**
 * File: auth-helper.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 6:27:44 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 5th January 2021 6:48:18 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

const auth = {
  // setUserDetails(id, token, cb) {
  //   get({ userId: id, token: token }).then((res) => {
  //     if (!res || res.error) {
  //       return cb(false);
  //     }

  //     const jwt = {
  //       token: token,
  //       user: res.user,
  //     };
  //     sessionStorage.setItem("jwt", JSON.stringify(jwt));
  //     cb(true);
  //   });
  // },
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
  unsetUserDetails() {
    sessionStorage.removeItem("jwt");
  },
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (sessionStorage.getItem("jwt")) {
      const obj = JSON.parse(sessionStorage.getItem("jwt"));
      return obj && obj.user ? obj : false;
    }

    return false;
  },

  // updateUser(user, cb) {
  //   if (typeof window !== "undefined") {
  //     if (sessionStorage.getItem("jwt")) {
  //       let auth = JSON.parse(sessionStorage.getItem("jwt"));
  //       const email = auth.user.email;
  //       auth.user = user;
  //       auth.user.email = email;
  //       sessionStorage.setItem("jwt", JSON.stringify(auth));
  //       cb();
  //     }
  //   }
  // },
};

export default auth;
