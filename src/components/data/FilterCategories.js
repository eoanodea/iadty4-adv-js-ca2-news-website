/**
 * File: filter-categories.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 12th January 2021 1:49:12 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 12th January 2021 2:08:16 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";
import { TextField, Checkbox, makeStyles, withStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank,
} from "@material-ui/icons";

const styles = makeStyles(({ spacing }) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: spacing(3),
    },
  },
}));

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FilterCategories = ({ categories, selectCategory }) => {
  if (categories && categories.length > 0)
    return (
      <div>
        <Autocomplete
          multiple
          id="filter-categories"
          options={categories}
          getOptionLabel={(option) => option.title}
          disableCloseOnSelect
          limitTags={3}
          onChange={(event, value) => selectCategory(value)}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </React.Fragment>
          )}
          //   style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Filter by Category"
              placeholder="Basketball"
            />
          )}
        />
      </div>
    );

  return <></>;
};

export default withStyles(styles)(FilterCategories);