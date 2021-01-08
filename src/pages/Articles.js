/**
 * File: Articles.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Friday, 8th January 2021 5:34:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Friday, 8th January 2021 6:12:48 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React, { useEffect } from "react";

import Loading from "../components/global/Loading";
import EmptyState from "../components/global/Error";

import { list } from "./../api/api-article";
import auth from "../auth/auth-helper";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  createStyles,
  withStyles,
  CardActionArea,
} from "@material-ui/core";
import theme from "../theme";

const styles = ({ palette }) =>
  createStyles({
    card: {
      margin: `${theme.spacing(4)}px auto`,
    },
    avatar: {
      background: palette.secondary.main,
    },
  });

const Articles = ({ classes }) => {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    const jwt = auth.isAuthenticated();
    if (jwt) {
      setLoading(true);
      list(jwt.token).then((data) => {
        setLoading(false);
        if (data.errors) {
          return setError(Object.values(data.errors)[0][0]);
        }
        setError("");

        setArticles(data);
      });
    }
  };

  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} />;

  return (
    <React.Fragment>
      <CardHeader title="Articles" />
      {articles.map((article, i) => (
        <Card key={i} className={classes.card}>
          <CardActionArea>
            <CardHeader
              avatar={
                <Avatar color="secondary" className={classes.avatar}>
                  {article.user.name[0]}
                </Avatar>
              }
              title={article.title}
              subheader={article.category.title}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {article.body.substring(0, 50)}...
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default withStyles(styles)(Articles);
