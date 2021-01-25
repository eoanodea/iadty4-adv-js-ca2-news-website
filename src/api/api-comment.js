/**
 * File: api-comment.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 19th January 2021 1:49:40 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 25th January 2021 4:54:04 pm
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
 * @param {token: String}
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

/**
 * Create an Comment
 *
 * @param {body: {body: String, article_id: Int}} body
 * @param {token: String}
 */
export const create = async (body, token) => {
  try {
    const response = await fetch(`${prefix}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * Update an Comment
 *
 * @param {id: String}
 * @param {body: {body: String, article_id: Int}} body
 * @param {token: String}
 */
export const update = async (id, body, token) => {
  try {
    const response = await fetch(`${prefix}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * Removes a comment by ID
 *
 * @param {id: String}
 * @param {token: String}
 */
export const remove = async (id, token) => {
  try {
    const response = await fetch(`${prefix}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (err) {
    return console.log(err);
  }
};
