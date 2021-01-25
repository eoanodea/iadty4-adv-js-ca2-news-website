/**
 * File: CommentItem.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 15th January 2021 4:07:13 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 25th January 2021 4:09:21 pm
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

import { show } from "../../api/api-comment";

import auth from "../../helpers/auth-helper";

import EmptyState from "../global/EmptyState";
import { Create, Delete, MoreVert } from "@material-ui/icons";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";

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

const CommentItem = ({ classes, comment, removeComment }) => {
  const [fullComment, setFullComment] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [displayActions, setDisplayActions] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteComment = (id) => {
    handleClose();
    removeComment(id);
  };

  const updateComment = (body) => {
    handleClose();
    setFullComment((old) => {
      let newComment = old;
      newComment.body = body;
      return { ...newComment };
    });
    setOpenEditDialog(false);
  };

  // const deleteComment = (id) => {
  //   console.log("hello!", id);
  // setFullComment((old) => {
  //   console.log("old!", old);
  //   const items = old.filter((item) => item.id !== id);

  //   return { ...items };
  // });
  // };

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
      jwt.user.id === data.user.id && setDisplayActions(true);
      setLoading(false);
    });
  }, [comment]);

  useEffect(() => {
    load();
  }, [load]);

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
