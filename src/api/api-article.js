/**
 * File: auth.api.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 6:20:22 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 19th January 2021 1:57:25 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { config } from "../config/config";

const prefix = config.server_url + "/api/articles";

/**
 * Fetch a list of articles
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
 * Fetch an article by ID
 *
 * @param {id: String}
 */
export const show = async (id) => {
  try {
    const response = await fetch(`${prefix}/${id}`, {
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
 * Create an Article
 *
 * @param {body: {title: String, body: String, category_id: Int}} body
 */
export const create = async (body) => {
  try {
    const response = await fetch(`${prefix}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * Update an Article
 *
 * @param {body: {title: String, body: String, category_id: Int}} body
 */
export const update = async (body) => {
  try {
    const response = await fetch(`${prefix}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};
