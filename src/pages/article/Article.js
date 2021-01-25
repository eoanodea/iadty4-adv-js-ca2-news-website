/**
 * File: Article.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 25th January 2021 7:09:31 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect, useCallback } from "react";
import { Button, createStyles, withStyles } from "@material-ui/core";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { Delete, Edit } from "@material-ui/icons";

import { show } from "../../api/api-article";

import Loading from "../../components/global/Loading";
import EmptyState from "../../components/global/EmptyState";
import ArticleItem from "../../components/article/ArticleItem";
import Comments from "../../components/comment/Comments";
import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";
import auth from "../../helpers/auth-helper";
import DeleteArticle from "../../components/article/DeleteArticle";

const styles = ({ palette, spacing }) =>
  createStyles({
    card: {
      margin: `${spacing(4)}px auto`,
    },
    avatar: {
      background: palette.secondary.main,
    },
    fab: {
      position: "fixed",
      bottom: spacing(2),
      right: spacing(2),

      "& .MuiFab-primary": {
        background: palette.secondary.main,
      },
    },
  });

const Article = ({ history, match, classes }) => {
  const [article, setArticle] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
  // const isAuthed = auth.isAuthenticated();
  const [displayActions, setDisplayActions] = React.useState(false);

  const load = useCallback(() => {
    setLoading(true);
    const { id } = match.params;
    const jwt = auth.isAuthenticated();

    show(id).then((data) => {
      if (!data || data.errors || data.exception) {
        setLoading(false);

        return setError(
          data && data.errors
            ? Object.values(data.errors)[0][0]
            : "Could not load data"
        );
      }
      setError("");
      if (data.comments.length > 0) {
        setComments(data.comments.reverse());
        delete data.comments;
      }
      setArticle(data);
      jwt && jwt.user.id === data.user.id && setDisplayActions(true);
      setLoading(false);
    });
  }, [match]);

  useEffect(() => {
    load();
  }, [load]);

  const addComment = (comment) => setComments((old) => [comment, ...old]);

  const removeComment = (id) => {
    setComments((old) => {
      const items = old.filter((item) => item.id !== id);

      return [...items];
    });
  };

  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;

  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ArrowBack />}>
        Back
      </Button>
      <ArticleItem article={article} />
      <Comments
        articleId={article.id}
        comments={comments}
        addComment={addComment}
        removeComment={removeComment}
      />

      <SpeedDial
        hidden={!displayActions}
        className={classes.fab}
        ariaLabel="Add Article"
        open={openSpeedDial}
        onOpen={() => setOpenSpeedDial(true)}
        onClose={() => setOpenSpeedDial(false)}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          component={Link}
          to={`/articles/edit/${article.id}`}
          icon={<Edit />}
          tooltipTitle={"Edit Article"}
        />

        <SpeedDialAction
          onClick={() => setOpenDeleteDialog(true)}
          icon={<Delete />}
          tooltipTitle={"Delete Article"}
        />
      </SpeedDial>

      <DeleteArticle
        open={openDeleteDialog}
        article={article}
        handleClose={setOpenDeleteDialog}
        history={history}
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(Article);
