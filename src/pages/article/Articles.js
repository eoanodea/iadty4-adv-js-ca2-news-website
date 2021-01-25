/**
 * File: Articles.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 25th January 2021 5:18:36 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";

import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";
import FilterCategories from "../../components/category/FilterCategories";
import ArticleItem from "../../components/article/ArticleItem";

import auth from "../../helpers/auth-helper";

import { list as listArticles } from "../../api/api-article";
import { list as listCategories } from "../../api/api-categories";

import { Fab, Typography, withStyles, createStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Add } from "@material-ui/icons";

const styles = ({ spacing }) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: spacing(2),
      right: spacing(2),
    },
  });

const Articles = ({ classes }) => {
  const [title, setTitle] = React.useState("Articles");
  const [articles, setArticles] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [defaultValueIndex, setDefaultValueIndex] = React.useState(null);
  const isAuthed = auth.isAuthenticated();

  const load = useCallback(() => {
    setLoading(true);
    listArticles().then((data) => {
      if (!data || data.errors || data.exception) {
        setLoading(false);
        return setError(
          data && data.errors
            ? Object.values(data.errors)[0][0]
            : "Could not load data"
        );
      }
      setError("");
      setArticles(data.reverse());
    });

    listCategories().then((data) => {
      if (!data || data.errors || data.exception) {
        setLoading(false);

        return setError(
          data && data.errors
            ? Object.values(data.errors)[0][0]
            : "Could not load data"
        );
      }
      setError("");
      if (window.location.pathname.includes("category")) {
        const categoryId = window.location.pathname.split("category/")[1];
        const categoryI = data.findIndex(
          (category) => category.id === parseInt(categoryId)
        );

        setTitle(`${data[categoryI].title} Articles`);
        categoryI !== -1 && setDefaultValueIndex(categoryI);
        setFilters([data[categoryI]]);
      }
      setCategories(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const selectCategory = (filteredCategories) => {
    if (
      defaultValueIndex &&
      categories[defaultValueIndex].id !== filteredCategories[defaultValueIndex]
    ) {
      setTitle("Articles");
    }
    setFilters(filteredCategories);
  };

  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;

  return (
    <React.Fragment>
      <Typography variant="h3">{title}</Typography>

      <FilterCategories
        defaultValueIndex={defaultValueIndex}
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
          return (
            <ArticleItem
              key={i}
              delay={(i + 1) * 200}
              article={article}
              link={`/article/${article.id}`}
            />
          );
        })}

      {isAuthed && (
        <Fab
          className={classes.fab}
          component={Link}
          aria-label="Add Article"
          color="secondary"
          to="/articles/new"
        >
          <Add />
        </Fab>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(Articles);
