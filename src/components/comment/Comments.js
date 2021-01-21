/**
 * File: Comments.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Thursday, 21st January 2021 12:42:47 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 21st January 2021 2:11:56 pm
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

const Comments = ({ comments, history }) => {
  const login = () => {
    history.push(`/login${window.location.pathname}`);
  };
  const hasAuth = auth.isAuthenticated();

  return (
    <React.Fragment>
      <Typography variant="h3">Comments</Typography>
      {hasAuth ? (
        comments.map((comment, i) => <CommentItem key={i} comment={comment} />)
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
