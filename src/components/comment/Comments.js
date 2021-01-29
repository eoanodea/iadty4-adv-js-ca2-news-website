/**
 * File: Comments.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Thursday, 21st January 2021 12:42:47 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 29th January 2021 10:00:26 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */
import React from "react";

import { withRouter } from "react-router-dom";

import { Typography } from "@material-ui/core";

import CommentItem from "./CommentItem";
import AddComment from "./AddComment";

/**
 * Comments Component
 *
 * @param {Array} comments - an array of comments
 * @param {History} history - the browser history object
 * @param {int} articleId - the ID of the article
 * @param {*} addComment - The function to run on adding a comment
 * @param {*} removeComment - The function to run on removing a comment
 */
const Comments = ({
  comments,
  history,
  articleId,
  addComment,
  removeComment,
}) => {
  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <Typography variant="h3">Comments</Typography>

      <React.Fragment>
        <AddComment
          articleId={articleId}
          addComment={(comment) => addComment(comment)}
        />

        {comments.length > 0 ? (
          comments.map((comment, i) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              removeComment={removeComment}
            />
          ))
        ) : (
          <Typography variant="body2" style={{ textAlign: "center" }}>
            No comments found
          </Typography>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default withRouter(Comments);
