/**
 * File: Article.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 29th January 2021 9:52:05 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";

import { Button, createStyles, withStyles } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import { Link, withRouter } from "react-router-dom";

import { show } from "../../api/api-article";

import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";
import ArticleItem from "../../components/article/ArticleItem";
import Comments from "../../components/comment/Comments";

import auth from "../../helpers/auth-helper";

/**
 * Injected styles
 *
 * @param {int} spacing
 * @param {palette} palette - The palette defined in theme.js
 */
const styles = ({ palette, spacing }) =>
  createStyles({
    card: {
      margin: `${spacing(4)}px auto`,
    },
    avatar: {
      background: palette.secondary.main,
    },
    fab: {
      position: "fixed",
      bottom: spacing(2),
      right: spacing(2),

      "& .MuiFab-primary": {
        background: palette.secondary.main,
      },
    },
  });

/**
 * Article Component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {Match} match - Contains information about a react-router-dom Route
 */
const Article = ({ history, match }) => {
  const [article, setArticle] = React.useState([]);
  const [comments, setComments] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const [displayActions, setDisplayActions] = React.useState(false);
  const [hasAuth, setHasAuth] = React.useState(false);
  /**
   * Load the article by the ID in the match object
   *
   * Wrapped in a useCallBack which returns
   * a memorized version of the function
   */
  const load = useCallback(() => {
    setLoading(true);
    const { id } = match.params;
    const jwt = auth.isAuthenticated();
    setHasAuth(jwt ? true : false);
    show(id).then((data) => {
      if (!data || data.errors || data.exception || data.message) {
        setLoading(false);

        return setError(
          data && data.errors
            ? Object.values(data.errors)[0][0]
            : "Could not load data"
        );
      }
      setError("");
      if (data.comments.length > 0) {
        setComments(data.comments.reverse());
        delete data.comments;
      }
      setArticle(data);

      jwt && jwt.user.id === data.user.id && setDisplayActions(true);
      setLoading(false);
    });
  }, [match]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Adds a comment from the AddComment component
   *
   * @param {comment} comment
   */
  const addComment = (comment) => setComments((old) => [comment, ...old]);

  /**
   * Removes a comment from the AddComment component
   *
   * @param {comment} comment
   */
  const removeComment = (id) => {
    setComments((old) => {
      const items = old.filter((item) => item.id !== id);

      return [...items];
    });
  };

  /**
   * Redirect to the login page
   */
  const login = () => {
    history.push(`/login${window.location.pathname}`);
  };

  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;
  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ArrowBack />}>
        Back
      </Button>
      <div style={{ position: "relative" }}>
        <ArticleItem
          article={article}
          history={history}
          displayActions={displayActions}
          disableHeight={false}
        />
        {!hasAuth ? (
          <EmptyState
            message="Please login to view comments"
            action={login}
            actionLabel={"Login"}
          />
        ) : (
          <Comments
            articleId={article.id}
            comments={comments}
            addComment={addComment}
            removeComment={removeComment}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default withRouter(withStyles(styles)(Article));
