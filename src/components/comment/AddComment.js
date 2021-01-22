/**
 * File: AddComment.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Thursday, 21st January 2021 2:40:37 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 22nd January 2021 5:22:31 pm
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

const AddComment = ({ classes, articleId, addComment }) => {
  const [comment, setComment] = React.useState("");
  const [commentError, setCommentError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  // const [error, setError] = React.useState("");

  const handleValidation = () => {
    let passed = true;

    if (comment.length < 5) {
      setCommentError("Comment must be at least 5 characters");
      passed = false;
    } else setCommentError("");

    return passed;
  };
  const submit = () => {
    if (handleValidation()) {
      setLoading(true);
      const jwt = auth.isAuthenticated();

      create({ body: comment, article_id: articleId }, jwt.token).then(
        (data) => {
          if (data.errors) {
            setLoading(false);
            return setCommentError(Object.values(data.errors)[0][0]);
          }
          setCommentError("");
          setLoading(false);
          setComment("");
          addComment(data);
          // auth.setUserDetails(data.data, (success) => {
          //   if (success) {

          // return history.push("/profile");
          //   }
          //   setError("The system encountered an error, please try again later");
          // });
        }
      );
    }
  };

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
