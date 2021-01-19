/**
 * File: Article.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 15th January 2021 4:39:39 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect } from "react";

import Loading from "../components/global/Loading";
import EmptyState from "../components/global/Error";

import { show } from "./../api/api-article";

import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  createStyles,
  withStyles,
  CardActionArea,
} from "@material-ui/core";

import FilterCategories from "../components/data/FilterCategories";
import ArticleItem from "../components/article/ArticleItem";

const styles = ({ palette, spacing }) =>
  createStyles({
    card: {
      margin: `${spacing(4)}px auto`,
    },
    avatar: {
      background: palette.secondary.main,
    },
  });

const Article = ({ classes, match }) => {
  const [article, setArticle] = React.useState([]);
  // const [categories, setCategories] = React.useState([]);
  // const [filters, setFilters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  useEffect(() => {
    load();
  }, []);

  const load = () => {
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
  };

  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;

  return (
    <React.Fragment>
      <ArticleItem article={article} />
    </React.Fragment>
  );
};

export default withStyles(styles)(Article);
