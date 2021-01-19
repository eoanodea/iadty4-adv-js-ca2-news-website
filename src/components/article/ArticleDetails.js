/**
 * File: ArticleDetails.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 19th January 2021 1:09:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 19th January 2021 1:17:36 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

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
} from "@material-ui/core";
import ArticleActionArea from "./ArticleActionArea";
import { AccountCircleOutlined, LocalOffer } from "@material-ui/icons";
import { Link } from "react-router-dom";

const styles = ({ spacing }) =>
  createStyles({
    chipContainer: {
      "& > *": {
        margin: spacing(0.5),
      },
    },
  });

const ArticleChip = ({ link, label, icon }) => {
  if (link)
    return (
      <Chip
        icon={icon}
        label={label}
        color="primary"
        clickable
        component={Link}
        to={link}
      />
    );

  return <Chip icon={icon} label={label} color="primary" clickable />;
};

const ArticleDetails = ({ classes, article, isLink }) => {
  return (
    <div className={classes.chipContainer}>
      <ArticleChip
        icon={<AccountCircleOutlined />}
        label={article.user.name}
        link={isLink ? `/user/${article.user.id}` : null}
      />
      <ArticleChip
        icon={<LocalOffer />}
        label={article.category.title}
        link={isLink ? `/category/${article.category.id}` : null}
      />
    </div>
  );
};

export default withStyles(styles)(ArticleDetails);
