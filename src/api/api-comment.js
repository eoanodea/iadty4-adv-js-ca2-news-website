/**
 * File: api-comment.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 19th January 2021 1:49:40 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 21st January 2021 2:02:29 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { config } from "../config/config";

const prefix = config.server_url + "/api/comments";

/**
 * Fetch Comments
 *
 */
export const list = async () => {
  try {
    const response = await fetch(prefix, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * Fetch an comment by ID
 *
 * @param {id: String}
 */
export const show = async (id, token) => {
  try {
    const response = await fetch(`${prefix}/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};
