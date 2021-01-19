/**
 * File: Articles.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 19th January 2021 1:44:18 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";

import Loading from "../components/global/Loading";
import EmptyState from "../components/global/Error";
import FilterCategories from "../components/data/FilterCategories";
import ArticleItem from "../components/article/ArticleItem";

import { list as listArticles } from "./../api/api-article";
import { list as listCategories } from "./../api/api-categories";

import { CardHeader } from "@material-ui/core";

const Articles = () => {
  const [title, setTitle] = React.useState("Articles");
  const [articles, setArticles] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [defaultValueIndex, setDefaultValueIndex] = React.useState(null);

  const load = useCallback(() => {
    setLoading(true);
    listArticles().then((data) => {
      if (!data || data.errors) {
        setLoading(false);
        return setError(
          data ? Object.values(data.errors)[0][0] : "Could not load data"
        );
      }
      setError("");
      setArticles(data);
    });

    listCategories().then((data) => {
      if (!data || data.errors) {
        setLoading(false);

        return setError(
          data ? Object.values(data.errors)[0][0] : "Could not load data"
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
      <CardHeader title={title} />
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
              article={article}
              link={`/article/${article.id}`}
              contentLimit={50}
            />
          );
        })}
    </React.Fragment>
  );
};

export default Articles;
