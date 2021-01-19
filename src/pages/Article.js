/**
 * File: Article.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 19th January 2021 1:32:00 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";

import { show } from "./../api/api-article";

import Loading from "../components/global/Loading";
import EmptyState from "../components/global/Error";
import ArticleItem from "../components/article/ArticleItem";

import { createStyles, withStyles } from "@material-ui/core";

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
    console.log("id!!", id);
    show(id).then((data) => {
      if (!data || data.errors) {
        setLoading(false);
        return setError(
          data ? Object.values(data.errors)[0][0] : "Could not load data"
        );
      }
      setError("");
      setArticle(data);
      setLoading(false);
    });
  }, [match]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;

  return (
    <React.Fragment>
      <ArticleItem article={article} />
    </React.Fragment>
  );
};

export default withStyles(styles)(Article);
