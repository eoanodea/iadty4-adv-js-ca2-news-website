/**
 * File: EditArticle.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 25th January 2021 6:05:19 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";
import {
  Button,
  Card,
  TextField,
  CardHeader,
  CardContent,
  createStyles,
  withStyles,
  CardActions,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { show, update } from "../../api/api-article";
import { list } from "../../api/api-categories";

import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";

import { Link, withRouter } from "react-router-dom";
import { ArrowBack, Check } from "@material-ui/icons";
import auth from "../../helpers/auth-helper";

const styles = ({ spacing }) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
    },
  });

const EditArticle = ({ match, history, classes }) => {
  const [id, setId] = React.useState(0);

  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState("");

  const [body, setBody] = React.useState("");
  const [bodyError, setBodyError] = React.useState("");

  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [categories, setCategories] = React.useState([]);

  const [loadingCategories, setLoadingCategories] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const loadCategories = useCallback(() => {
    list().then((data) => {
      if (!data || data.errors || data.exception) {
        setLoadingCategories(false);

        return setError(
          data && data.errors
            ? Object.values(data.errors)[0][0]
            : "Could not load data"
        );
      }

      setLoadingCategories(false);
      setError("");
      setCategories(data);
    });
  }, []);

  const load = useCallback(() => {
    const { id } = match.params;

    show(id).then((data) => {
      if (!data || data.errors || data.exception) {
        setLoadingCategories(false);

        return setError(
          data && data.errors
            ? Object.values(data.errors)[0][0]
            : "Could not load data"
        );
      }

      setError("");
      setTitle(data.title);
      setBody(data.body);
      setId(data.id);
      setSelectedCategory(data.category);
      setLoadingCategories(false);
    });
  }, [match]);

  useEffect(() => {
    load();
    loadCategories();
  }, [load, loadCategories]);

  const handleValidation = () => {
    let passed = true;

    if (title.length < 5) {
      setTitleError("Title must be at least 5 characters");
      passed = false;
    } else setTitleError("");

    if (body.length < 5) {
      setBodyError("Body must be at least 5 characters");
      passed = false;
    } else setBodyError("");

    return passed;
  };

  const submit = () => {
    if (handleValidation()) {
      setLoading(true);
      const jwt = auth.isAuthenticated();
      update(
        id,
        { title, body, category_id: selectedCategory.id },
        jwt.token
      ).then((data) => {
        if (!data || data.errors || data.exception) {
          setLoading(false);
          return setError(
            data && data.errors
              ? Object.values(data.errors)[0][0]
              : "Could not create article"
          );
        }
        history.push(`/article/${data.id}`);
        // setLoading(false);
        // setComment("");
      });
    }
  };

  if (loadingCategories) return <Loading />;
  if (error !== "")
    return <EmptyState message={error} action={loadCategories} />;

  return (
    <React.Fragment>
      <Button component={Link} to={`/article/${id}`} startIcon={<ArrowBack />}>
        Back
      </Button>
      <Card elevation={3} className={classes.wrapper}>
        <CardHeader title="Edit Article" />

        <CardContent>
          <Autocomplete
            value={selectedCategory}
            options={categories}
            getOptionLabel={(option) => option.title}
            onChange={(e, v) => setSelectedCategory(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Category"
                placeholder="Basketball"
              />
            )}
          />

          <TextField
            name="title"
            label="Title"
            autoFocus={true}
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={titleError !== ""}
            helperText={titleError}
          />

          <TextField
            name="body"
            label="Body"
            autoFocus={true}
            margin="normal"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={bodyError !== ""}
            helperText={bodyError}
            multiline
          />
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={submit}
            disabled={loading}
            endIcon={loading ? <CircularProgress size={18} /> : <Check />}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(EditArticle);
