/**
 * File: EditArticle.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 22nd January 2021 5:17:34 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Delete an article
 * Last Modified: Tuesday, 26th January 2021 7:03:45 pm
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

import { remove } from "../../api/api-article";

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
 * DeleteArticle Component
 *
 * @param {History} history - the browser history object
 * @param {bool} open - whether the dialog should be open or not
 * @param {*} article - The article to be deleted
 * @param {*} handleClose - The function to run to close the dialog
 */
const DeleteArticle = ({ history, open, article, handleClose }) => {
  const [articleError, setArticleError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  /**
   * Check validation and then run the
   * article update network request
   *
   * On success,redirect to the home page
   */
  const submit = () => {
    setLoading(true);
    const jwt = auth.isAuthenticated();

    remove(article.id, jwt.token).then((data) => {
      console.log("data!", data);
      if (data !== 204) {
        setLoading(false);
        handleClose(false);

        return setArticleError("Could not delete article");
      }

      history.push("/");
    });
  };

  /**
   * Render JSX
   */
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="edit-article-dialog"
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this article?
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
        open={articleError !== ""}
        autoHideDuration={6000}
        onClose={() => setArticleError("")}
        message={articleError}
      ></Snackbar>
    </React.Fragment>
  );
};

export default withStyles(styles)(DeleteArticle);
