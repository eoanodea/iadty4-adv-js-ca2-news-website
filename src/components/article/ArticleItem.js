/**
 * File: ArticleItem.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 15th January 2021 4:07:13 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 21st January 2021 2:37:09 pm
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
  Chip,
  Grow,
} from "@material-ui/core";
import ArticleActionArea from "./ArticleActionArea";
import { AccountCircleOutlined, LocalOffer } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ArticleDetails from "./ArticleDetails";

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

const ArticleItem = ({ classes, article, link = null, delay = 0 }) => (
  <Grow in={true} timeout={{ enter: delay }}>
    <Card className={classes.card}>
      <ArticleActionArea link={link}>
        <CardHeader
          avatar={
            <Avatar color="secondary" className={classes.avatar}>
              {article.user.name[0]}
              {article.user.name.split(" ")[1][0]}
            </Avatar>
          }
          title={article.title}
          subheader={new Date(article.created_at).toDateString()}
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
    </Card>
  </Grow>
);

export default withStyles(styles)(ArticleItem);