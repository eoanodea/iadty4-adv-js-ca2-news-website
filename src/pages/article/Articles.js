/**
 * File: Articles.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 28th January 2021 5:27:39 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";

import { Typography, withStyles, createStyles, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { Link } from "react-router-dom";

import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";
import FilterCategories from "../../components/filter/FilterCategories";
import FilterAuthors from "../../components/filter/FilterAuthors";
import ArticleItem from "../../components/article/ArticleItem";

import { list as listArticles } from "../../api/api-article";
import { list as listCategories } from "../../api/api-categories";

import auth from "../../helpers/auth-helper";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: spacing(2),
      right: spacing(2),
    },
  });

/**
 * Articles Component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Articles = ({ classes }) => {
  const [title, setTitle] = React.useState("Articles");

  const [articles, setArticles] = React.useState([]);
  const [authors, setAuthors] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const [selectedAuthors, setSelectedAuthors] = React.useState([]);
  const [filters, setFilters] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const [defaultValueIndex, setDefaultValueIndex] = React.useState(null);
  const [defaultAuthorValueIndex, setDefaultAuthorValueIndex] = React.useState(
    null
  );
  const isAuthed = auth.isAuthenticated();

  /**
   * Load articles and categories
   *
   * Wrapped in a useCallBack which returns
   * a memorized version of the function
   */
  const load = useCallback(() => {
    setLoading(true);
    /**
     * Load articles
     */
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
      let authors = [];
      articles.forEach((article) => {
        /**
         * Prevent duplicate authors in authors array
         */
        if (
          authors.findIndex((author) => author.id === article.user.id) === -1
        ) {
          authors.push(article.user);
        }
      });

      setArticles(data);
      setAuthors(authors);

      /**
       * Check if the user is in the URL
       *
       * If so, set it as the default article, and update the title
       */
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

    /**
     * Load categories
     */
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

      /**
       * Check if the category is in the URL
       *
       * If so, set it as the default article, and update the title
       */
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

  /**
   * Selecting a category from the FilterCategories component
   *
   * @param {category} filteredCategories
   */
  const selectCategory = (filteredCategories) => {
    if (
      defaultValueIndex &&
      categories[defaultValueIndex].id !== filteredCategories[defaultValueIndex]
    ) {
      setTitle("Articles");
    }
    setFilters(filteredCategories);
  };

  /**
   * Selecting a author from the FilterAuthors component
   *
   * @param {author} filteredUser
   */
  const selectAuthor = (filteredUser) => {
    if (
      defaultAuthorValueIndex &&
      authors[defaultAuthorValueIndex] !== filteredUser[defaultAuthorValueIndex]
    ) {
      setTitle("Articles");
    }
    setSelectedAuthors(filteredUser);
  };

  /**
   * Render JSX
   */
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
