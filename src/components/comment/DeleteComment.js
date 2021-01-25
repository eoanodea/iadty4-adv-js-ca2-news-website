/**
 * File: EditComment.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 22nd January 2021 5:17:34 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 25th January 2021 4:12:44 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";
import {
  withStyles,
  createStyles,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
} from "@material-ui/core";

import { Close, Delete } from "@material-ui/icons";

import { remove } from "../../api/api-comment";
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

const DeleteComment = ({ open, comment, deleteComment, handleClose }) => {
  const [commentError, setCommentError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submit = () => {
    setLoading(true);
    const jwt = auth.isAuthenticated();

    remove(comment.id, jwt.token).then((data) => {
      console.log("data!", data);
      if (data !== 204) {
        setLoading(false);
        handleClose(false);

        return setCommentError("Could not delete comment");
      }
      setLoading(false);
      handleClose(false);
      deleteComment(comment.id);
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="edit-comment-dialog"
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleClose(false)}
            endIcon={<Close />}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={submit}
            disabled={loading}
            endIcon={loading ? <CircularProgress size={18} /> : <Delete />}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={commentError !== ""}
        autoHideDuration={6000}
        onClose={() => setCommentError("")}
        message={commentError}
      ></Snackbar>
    </React.Fragment>
  );
};

export default withStyles(styles)(DeleteComment);
