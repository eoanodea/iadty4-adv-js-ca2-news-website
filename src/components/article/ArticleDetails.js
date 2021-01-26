/**
 * File: ArticleDetails.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 19th January 2021 1:09:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 26th January 2021 7:09:12 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { createStyles, withStyles, Chip } from "@material-ui/core";
import { AccountCircleOutlined, LocalOffer } from "@material-ui/icons";

import { Link } from "react-router-dom";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }) =>
  createStyles({
    chipContainer: {
      "& > *": {
        margin: spacing(0.5),
      },
    },
  });

/**
 * Renders a chip for the article
 *
 * @param {string} link - The link
 * @param {string} label - label to display on the chip
 * @param {Icon} icon - The icon to render
 */
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

/**
 * Details on the article component
 *
 * @param {Theme} classes - classes passed from Material UI Theme
 * @param {*} article - the article
 * @param {bool} isLink - whether it should be a link
 *
 */
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
