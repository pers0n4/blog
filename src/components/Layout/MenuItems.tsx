import * as React from "react";

import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LabelIcon from "@mui/icons-material/Label";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "gatsby-theme-material-ui";

const MenuItems = (
  <>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component={Link} to="/categories">
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </ListItemButton>
    <ListItemButton component={Link} to="/labels">
      <ListItemIcon>
        <LabelIcon />
      </ListItemIcon>
      <ListItemText primary="Labels" />
    </ListItemButton>
  </>
);

export default MenuItems;
