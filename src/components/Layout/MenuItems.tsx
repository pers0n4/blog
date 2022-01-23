import * as React from "react";

import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LabelIcon from "@mui/icons-material/Label";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const MenuItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LabelIcon />
      </ListItemIcon>
      <ListItemText primary="Labels" />
    </ListItem>
  </div>
);

export default MenuItems;
