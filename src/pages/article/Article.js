/**
 * File: Article.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 25th January 2021 4:05:14 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";
import { Button, createStyles, withStyles } from "@material-ui/core";

import { show } from "../../api/api-article";

import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";
import ArticleItem from "../../components/article/ArticleItem";
import Comments from "../../components/comment/Comments";
import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

const styles = ({ palette, spacing }) =>
  createStyles({
    card: {
      margin: `${spacing(4)}px auto`,
    },
    avatar: {
      background: palette.secondary.main,
    },
  });

const Article = ({ match }) => {
  const [article, setArticle] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const load = useCallback(() => {
    setLoading(true);
    const { id } = match.params;

    show(id).then((data) => {
      if (!data || data.errors || data.exception) {
        setLoading(false);

        return setError(
          data && data.errors
            ? Object.values(data.errors)[0][0]
            : "Could not load data"
        );
      }
      setError("");

      setComments(data.comments.reverse());
      delete data.comments;
      setArticle(data);
      setLoading(false);
    });
  }, [match]);

  useEffect(() => {
    load();
  }, [load]);

  const addComment = (comment) => setComments((old) => [comment, ...old]);

  const removeComment = (id) => {
    setComments((old) => {
      const items = old.filter((item) => item.id !== id);

      return [...items];
    });
  };

  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;

  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ArrowBack />}>
        Back
      </Button>
      <ArticleItem article={article} />
      <Comments
        articleId={article.id}
        comments={comments}
        addComment={addComment}
        removeComment={removeComment}
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(Article);
