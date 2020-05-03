import React from "react";
import { navigate } from "gatsby";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";

const headerListItems = (
  <ListItem button onClick={() => navigate("/")}>
    <ListItemIcon>
      <HomeIcon />
    </ListItemIcon>
    <ListItemText primary="Home" />
  </ListItem>
);

export default headerListItems;
