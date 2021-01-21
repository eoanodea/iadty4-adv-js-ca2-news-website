/**
 * File: CommentItem.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 15th January 2021 4:07:13 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 21st January 2021 2:11:37 pm
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
} from "@material-ui/core";

import { show } from "../../api/api-comment";

import auth from "../../helpers/auth-helper";

import EmptyState from "../global/EmptyState";
import Loading from "../global/Loading";

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

const CommentItem = ({ classes, comment }) => {
  const [fullComment, setFullComment] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const load = useCallback(() => {
    setLoading(true);
    const jwt = auth.isAuthenticated();
    show(comment.id, jwt.token).then((data) => {
      if (!data || data.errors) {
        setLoading(false);
        return setError(
          data ? Object.values(data.errors)[0][0] : "Could not load data"
        );
      }
      setError("");
      setFullComment(data);
      setLoading(false);
    });
  }, [comment]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar color="secondary" className={classes.avatar}>
            {fullComment.user.name[0]}
            {fullComment.user.name.split(" ")[1][0]}
          </Avatar>
        }
        title={fullComment.user.name}
        subheader={new Date(comment.created_at).toDateString()}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {comment.body}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default withStyles(styles)(CommentItem);
