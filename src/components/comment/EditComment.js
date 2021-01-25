/**
 * File: EditComment.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 22nd January 2021 5:17:34 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 25th January 2021 3:05:27 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";
import {
  withStyles,
  createStyles,
  Button,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";

import { update } from "../../api/api-comment";
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

const EditComment = ({ open, comment, updateComment, handleClose }) => {
  const [newComment, setNewComment] = React.useState(comment.body);
  const [commentError, setCommentError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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

      update(
        comment.id,
        { body: newComment, article_id: comment.article_id },
        jwt.token
      ).then((data) => {
        if (data.errors) {
          setLoading(false);
          return setCommentError(Object.values(data.errors)[0][0]);
        }
        setCommentError("");
        setLoading(false);

        updateComment(data.body);
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="edit-comment-dialog"
    >
      <DialogTitle>Edit Comment</DialogTitle>
      <DialogContent>
        <TextField
          name="comment"
          label="Edit comment"
          autoFocus
          margin="normal"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          error={commentError !== ""}
          helperText={commentError}
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleClose(false)}
        >
          Cancel
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={submit}
          disabled={loading}
          endIcon={loading ? <CircularProgress size={18} /> : <Check />}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
    // <Card className={classes.root}>
    //   <TextField
    //     name="comment"
    //     label="Add a comment"
    //     autoFocus={true}
    //     margin="normal"
    //     value={comment}
    //     onChange={(e) => setComment(e.target.value)}
    //     onKeyDown={(e) => e.key === "Enter" && submit()}
    //     error={commentError !== ""}
    //     helperText={commentError}
    //     multiline
    //   />
    //   <CardActions className={classes.actions}>
    //     <Button
    //       color="secondary"
    //       variant="contained"
    //       onClick={submit}
    //       disabled={loading}
    //       endIcon={loading ? <CircularProgress size={18} /> : <Check />}
    //     >
    //       Post
    //     </Button>
    //   </CardActions>
    // </Card>
  );
};

export default withStyles(styles)(EditComment);
