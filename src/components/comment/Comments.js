/**
 * File: Comments.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Thursday, 21st January 2021 12:42:47 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 25th January 2021 3:33:49 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */
import React from "react";

import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";

import auth from "../../helpers/auth-helper";

import CommentItem from "./CommentItem";
import EmptyState from "../global/EmptyState";
import AddComment from "./AddComment";

const Comments = ({
  comments,
  history,
  articleId,
  addComment,
  removeComment,
}) => {
  const login = () => {
    history.push(`/login${window.location.pathname}`);
  };
  const hasAuth = auth.isAuthenticated();

  return (
    <React.Fragment>
      <Typography variant="h3">Comments</Typography>
      {hasAuth ? (
        <React.Fragment>
          <AddComment
            articleId={articleId}
            addComment={(comment) => addComment(comment)}
          />

          {comments.map((comment, i) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              removeComment={removeComment}
            />
          ))}
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
