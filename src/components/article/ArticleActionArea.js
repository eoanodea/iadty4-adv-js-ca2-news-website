/**
 * File: ArticleActionArea.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 15th January 2021 4:11:07 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 15th January 2021 4:35:40 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { CardActionArea } from "@material-ui/core";
import { Link } from "react-router-dom";

const ArticleActionArea = ({ link = null, children }) => {
  if (link)
    return (
      <CardActionArea component={Link} to={link}>
        {children}
      </CardActionArea>
    );

  return <div>{children}</div>;
};

export default ArticleActionArea;
