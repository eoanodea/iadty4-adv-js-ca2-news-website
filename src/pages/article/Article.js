/**
 * File: Article.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 21st January 2021 3:28:37 pm
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
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const load = useCallback(() => {
    setLoading(true);
    const { id } = match.params;

    show(id).then((data) => {
      if (!data || data.errors) {
        setLoading(false);
        return setError(
          data ? Object.values(data.errors)[0][0] : "Could not load data"
        );
      }
      setError("");
      // let article = data
      // article.comments.sort()
      setArticle(data);
      setLoading(false);
    });
  }, [match]);

  useEffect(() => {
    load();
  }, [load]);

  const addComment = (comment) => {
    console.log("add comment!", comment);

    setArticle((old) => {
      old.comments.push(comment);
      return old;
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
        comments={article.comments}
        addComment={addComment}
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(Article);
