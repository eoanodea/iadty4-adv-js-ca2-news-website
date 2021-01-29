/**
 * File: AddComment.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Thursday, 21st January 2021 2:40:37 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Create a new comment
 * Last Modified: Friday, 29th January 2021 9:35:10 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";

import {
  Card,
  withStyles,
  createStyles,
  Button,
  TextField,
  CircularProgress,
  CardActions,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";

import { create } from "../../api/api-comment";

import auth from "../../helpers/auth-helper";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }) =>
  createStyles({
    root: {
      padding: spacing(1),
      margin: `${spacing(2)}px 0`,
    },
    actions: {
      justifyContent: "flex-end",
    },
  });

/**
 * AddComment Component
 *

 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {int} articleId - the ID of the article
 * @param {*} addComment - The function to run on successful add of comment
 */
const AddComment = ({ classes, articleId, addComment }) => {
  const [comment, setComment] = React.useState("");

  const [commentError, setCommentError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  /**
   * Handle validation for form input
   */
  const handleValidation = () => {
    let passed = true;

    if (comment.length < 5) {
      setCommentError("Comment must be at least 5 characters");
      passed = false;
    } else setCommentError("");

    return passed;
  };

  /**
   * Check validation and then run the
   * comment update network request
   *
   * On success, close the dialog and run
   * the add comment function
   */
  const submit = () => {
    if (handleValidation()) {
      setLoading(true);
      const jwt = auth.isAuthenticated();

      create({ body: comment, article_id: articleId }, jwt.token).then(
        (data) => {
          if (!data || data.errors || data.exception || data.message) {
            setLoading(false);
            return setCommentError(
              data && data.errors
                ? Object.values(data.errors)[0][0]
                : "Could not create article"
            );
          }
          setCommentError("");
          setLoading(false);
          setComment("");
          addComment(data);
        }
      );
    }
  };

  /**
   * Render JSX
   */
  return (
    <Card className={classes.root}>
      <TextField
        name="comment"
        label="Add a comment"
        autoFocus={true}
        margin="normal"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        error={commentError !== ""}
        helperText={commentError}
        multiline
      />
      <CardActions className={classes.actions}>
        <Button
          color="secondary"
          variant="contained"
          onClick={submit}
          disabled={loading}
          endIcon={loading ? <CircularProgress size={18} /> : <Check />}
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(AddComment);
