/**
 * File: filter-authors.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 12th January 2021 1:49:12 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Filter authors on the article list
 * Last Modified: Thursday, 28th January 2021 5:46:45 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import React from "react";

import { TextField, Checkbox } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank,
} from "@material-ui/icons";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

/**
 * Filter authors on the article list
 *
 * @param {*} authors
 * @param {*} selectCategory - function to run on selecting a author
 * @param {*} defaultValueIndex - If there is a default author selected
 */
const FilterAuthors = ({ authors, selectAuthor, defaultValueIndex = null }) => {
  if (authors && authors.length > 0) {
    return (
      <Autocomplete
        multiple
        id="filter-authors"
        options={authors}
        getOptionLabel={(option) => option.name}
        disableCloseOnSelect
        limitTags={3}
        defaultValue={
          defaultValueIndex !== null ? [authors[defaultValueIndex]] : undefined
        }
        onChange={(event, value) => selectAuthor(value)}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Filter by Author"
            placeholder="Author"
          />
        )}
      />
    );
  }
  return <></>;
};

export default FilterAuthors;
