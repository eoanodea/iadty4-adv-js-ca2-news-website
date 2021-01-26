/**
 * File: CommentItem.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 15th January 2021 4:07:13 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: A single comment
 * Last Modified: Tuesday, 26th January 2021 6:56:56 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  createStyles,
  withStyles,
  CardActions,
  Grow,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Create, Delete, MoreVert } from "@material-ui/icons";

import { show } from "../../api/api-comment";

import EmptyState from "../global/EmptyState";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";

import auth from "../../helpers/auth-helper";

/**
 * Injected styles
 *
 * @param {int} spacing
 * @param {palette} palette - The palette defined in theme.js
 */
const styles = ({ palette, spacing }) =>
  createStyles({
    card: {
      margin: `${spacing(4)}px auto`,
    },
    avatar: {
      background: palette.secondary.main,
    },
    chipContainer: {
      "& > *": {
        margin: spacing(0.5),
      },
    },
    divider: {
      margin: spacing(2),
    },
  });

/**
 * CommentItem Component
 *
 * A single comment
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {*} comment - The comment to be displayed
 * @param {*} removeComment - The function to run on successful removal of comment
 */
const CommentItem = ({ classes, comment, removeComment }) => {
  const [fullComment, setFullComment] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [displayActions, setDisplayActions] = React.useState(false);
  const open = Boolean(anchorEl);

  /**
   * Open the more options menu
   *
   * @param {*} event
   */
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Close the more options menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };
  /**
   * Close the delete dialog and
   * run the removeComment function
   *
   * @param {int} id
   */
  const deleteComment = (id) => {
    handleClose();
    removeComment(id);
  };

  /**
   * Close the edit dialog
   * and update the comment body
   *
   * @param {string} body
   */
  const updateComment = (body) => {
    handleClose();
    setFullComment((old) => {
      let newComment = old;
      newComment.body = body;
      return { ...newComment };
    });
    setOpenEditDialog(false);
  };

  /**
   * Load the comment by the ID in the comment object
   *
   * Wrapped in a useCallBack which returns
   * a memorized version of the function
   *
   * The comment needs to be loaded again
   * to display details about the user
   */
  const load = useCallback(() => {
    setLoading(true);
    const jwt = auth.isAuthenticated();
    show(comment.id, jwt.token).then((data) => {
      if (!data || data.errors || data.exception) {
        setLoading(false);
        return setError(
          data && data.errors
            ? Object.values(data.errors)[0][0]
            : "Could not load data"
        );
      }
      setError("");
      setFullComment(data);
      /**
       * If the user logged in is the user who wrote the comment,
       * display the actions to them
       */
      jwt.user.id === data.user.id && setDisplayActions(true);
      setLoading(false);
    });
  }, [comment]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Render JSX
   */
  if (loading) return <></>;
  if (error !== "") return <EmptyState message={error} action={load} />;
  return (
    <Grow in={true}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar color="secondary" className={classes.avatar}>
              {fullComment.user.name[0]}
              {fullComment.user.name.split(" ").length > 1 &&
                fullComment.user.name.split(" ")[1][0]}
            </Avatar>
          }
          title={fullComment.user.name}
          subheader={new Date(comment.created_at).toDateString()}
          action={
            displayActions && (
              <React.Fragment>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleOpen}
                >
                  <MoreVert />
                </IconButton>

                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => setOpenEditDialog(true)}>
                    <ListItemIcon>
                      <Create />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                  </MenuItem>
                  <MenuItem onClick={() => setOpenDeleteDialog(true)}>
                    <ListItemIcon>
                      <Delete />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {fullComment.body}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
        <EditComment
          open={openEditDialog}
          comment={fullComment}
          handleClose={setOpenEditDialog}
          updateComment={updateComment}
        />
        <DeleteComment
          open={openDeleteDialog}
          comment={fullComment}
          handleClose={setOpenDeleteDialog}
          deleteComment={deleteComment}
        />
      </Card>
    </Grow>
  );
};

export default withStyles(styles)(CommentItem);
