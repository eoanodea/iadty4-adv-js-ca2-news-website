/**
 * File: Comments.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Thursday, 21st January 2021 12:42:47 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 26th January 2021 6:52:31 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */
import React from "react";

import { withRouter } from "react-router-dom";

import { Typography } from "@material-ui/core";

import CommentItem from "./CommentItem";
import EmptyState from "../global/EmptyState";
import AddComment from "./AddComment";

import auth from "../../helpers/auth-helper";

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
   * Redirect to the login page
   */
  const login = () => {
    history.push(`/login${window.location.pathname}`);
  };
  /**
   * Check for auth before displaying comments
   */
  const hasAuth = auth.isAuthenticated();

  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <Typography variant="h3">Comments</Typography>
      {hasAuth ? (
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
      ) : (
        <EmptyState
          message="Please login to view comments"
          action={login}
          actionLabel={"Login"}
        />
      )}
    </React.Fragment>
  );
};

export default withRouter(Comments);
