/**
 * File: auth.api.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 6:20:22 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 12th January 2021 1:33:54 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { config } from "../config/config";

const prefix = "/api/categories";

/**
 * Fetch Categories
 *
 */
export const list = async () => {
  try {
    const response = await fetch(`${config.server_url}${prefix}`, {
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
