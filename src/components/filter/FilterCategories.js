/**
 * File: filter-categories.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 12th January 2021 1:49:12 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Filter categories on the article list
 * Last Modified: Thursday, 28th January 2021 5:46:29 pm
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
 * Filter categories on the article list
 *
 * @param {*} categories
 * @param {*} selectCategory - function to run on selecting a category
 * @param {*} defaultValueIndex - If there is a default category selected
 */
const FilterCategories = ({
  categories,
  selectCategory,
  defaultValueIndex = null,
}) => {
  if (categories && categories.length > 0) {
    return (
      <Autocomplete
        multiple
        id="filter-categories"
        options={categories}
        getOptionLabel={(option) => option.title}
        disableCloseOnSelect
        limitTags={3}
        defaultValue={
          defaultValueIndex !== null
            ? [categories[defaultValueIndex]]
            : undefined
        }
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
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Filter by Category"
            placeholder="Basketball"
          />
        )}
      />
    );
  }
  return <></>;
};

export default FilterCategories;
