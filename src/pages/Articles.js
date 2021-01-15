/**
 * File: Articles.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 15th January 2021 3:25:39 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect } from "react";

import Loading from "../components/global/Loading";
import EmptyState from "../components/global/Error";

import { list as listArticles } from "./../api/api-article";
import { list as listCategories } from "./../api/api-categories";

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

const styles = ({ palette, spacing }) =>
  createStyles({
    card: {
      margin: `${spacing(4)}px auto`,
    },
    avatar: {
      background: palette.secondary.main,
    },
  });

const Articles = ({ classes }) => {
  const [articles, setArticles] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setLoading(true);
    listArticles().then((data) => {
      setLoading(false);
      if (!data || data.errors) {
        return setError(
          data ? Object.values(data.errors)[0][0] : "Could not load data"
        );
      }
      setError("");

      setArticles(data);
    });

    listCategories().then((data) => {
      setLoading(false);
      if (!data || data.errors) {
        return setError(
          data ? Object.values(data.errors)[0][0] : "Could not load data"
        );
      }
      setError("");

      setCategories(data);
    });
  };

  const selectCategory = (categories) => setFilters(categories);

  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;

  return (
    <React.Fragment>
      <CardHeader title="Articles" />
      <FilterCategories
        categories={categories}
        selectCategory={selectCategory}
      />
      {articles
        .filter((article) => {
          if (filters.length > 0) {
            return (
              filters.findIndex(
                (filter) => filter.id === article.category.id
              ) !== -1
            );
          }
          return article;
        })
        .map((article, i) => {
          // if (
          //   filters.length > 0 &&
          //   filters.findIndex((filter) => filter.id === article.id) !== -1
          // ) {
          // }

          return (
            <Card key={i} className={classes.card}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <Avatar color="secondary" className={classes.avatar}>
                      {article.user.name[0]}
                    </Avatar>
                  }
                  title={article.title}
                  subheader={article.category.title}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {article.body.substring(0, 50)}...
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
    </React.Fragment>
  );
};

export default withStyles(styles)(Articles);
