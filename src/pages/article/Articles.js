/**
 * File: Articles.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 26th January 2021 6:07:01 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";

import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";
import FilterCategories from "../../components/category/FilterCategories";
import FilterAuthors from "../../components/author/FilterAuthors";
import ArticleItem from "../../components/article/ArticleItem";

import auth from "../../helpers/auth-helper";

import { list as listArticles } from "../../api/api-article";
import { list as listCategories } from "../../api/api-categories";

import { Typography, withStyles, createStyles, Fab } from "@material-ui/core";
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
  const [authors, setAuthors] = React.useState([]);
  const [selectedAuthors, setSelectedAuthors] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [defaultValueIndex, setDefaultValueIndex] = React.useState(null);
  const [defaultAuthorValueIndex, setDefaultAuthorValueIndex] = React.useState(
    null
  );
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
      const articles = data.reverse();
      const authors = articles.map((article) => article.user);
      setArticles(data);
      setAuthors(authors);

      if (window.location.pathname.includes("user")) {
        const userId = parseInt(window.location.pathname.split("user/")[1]);
        const userI = authors.findIndex((user) => user.id === userId);

        if (userI !== -1) {
          setDefaultAuthorValueIndex(userI);
          setTitle(`Articles by ${authors[userI].name}`);
          setSelectedAuthors([authors[userI]]);
        }
      }
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

  const selectAuthor = (filteredUser) => {
    if (
      defaultAuthorValueIndex &&
      authors[defaultAuthorValueIndex] !== filteredUser[defaultAuthorValueIndex]
    ) {
      setTitle("Articles");
    }
    setSelectedAuthors(filteredUser);
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

      <FilterAuthors
        authors={authors}
        selectAuthor={selectAuthor}
        defaultValueIndex={defaultAuthorValueIndex}
      />

      {articles
        .filter((article) => {
          if (filters.length > 0 || selectedAuthors.length > 0) {
            return (
              filters.findIndex(
                (filter) => filter.id === article.category.id
              ) !== -1 ||
              selectedAuthors.findIndex(
                (author) => author.id === article.user.id
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
