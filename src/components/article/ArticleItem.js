/**
 * File: ArticleItem.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 15th January 2021 4:07:13 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 26th January 2021 7:06:07 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  createStyles,
  withStyles,
  CardActions,
  Divider,
  Zoom,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Create, Delete, MoreVert } from "@material-ui/icons";

import ArticleActionArea from "./ArticleActionArea";
import ArticleDetails from "./ArticleDetails";
import DeleteArticle from "./DeleteArticle";

import { Link } from "react-router-dom";

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
 * ArticleItem Component
 *
 * A single comment
 *
 * @param {bool} displayActions - if the article belongs to the authed user, display actions
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {*} article - The article to be displayed
 * @param {*} link - The link to optionally display
 * @param {*} delay - The delay of the animation
 */
const ArticleItem = ({
  displayActions,
  history,
  classes,
  article,
  link = null,
  delay = 0,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const open = Boolean(anchorEl);

  /**
   * Opens the more options menu
   *
   * @param {*} event
   */
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  /**
   * Closes the more options menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Render JSX
   */
  return (
    <Zoom in={true} style={{ transitionDelay: `${delay}ms` }}>
      <Card className={classes.card}>
        <ArticleActionArea link={link}>
          <CardHeader
            avatar={
              <Avatar color="secondary" className={classes.avatar}>
                {article.user.name[0]}
                {article.user.name.split(" ").length > 1 &&
                  article.user.name.split(" ")[1][0]}
              </Avatar>
            }
            title={article.title}
            subheader={new Date(article.created_at).toDateString()}
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
                    <MenuItem
                      component={Link}
                      to={`/articles/edit/${article.id}`}
                    >
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
            <React.Fragment>
              <div className={classes.chipContainer}>
                <ArticleDetails article={article} isLink={link === null} />
              </div>
            </React.Fragment>

            {!link && (
              <React.Fragment>
                <Divider className={classes.divider} />
                <Typography variant="body2" color="textSecondary" component="p">
                  {article.body}
                </Typography>
              </React.Fragment>
            )}
          </CardContent>
          <CardActions></CardActions>
        </ArticleActionArea>
        <DeleteArticle
          open={openDeleteDialog}
          article={article}
          handleClose={setOpenDeleteDialog}
          history={history}
        />
      </Card>
    </Zoom>
  );
};

export default withStyles(styles)(ArticleItem);
