import * as React from "react";
import { GatsbyLink } from "gatsby-theme-material-ui";
import clsx from "clsx";

import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import BrightnessDarkIcon from "@material-ui/icons/Brightness4";
import BrightnessLightIcon from "@material-ui/icons/Brightness7";
import CategoryIcon from "@material-ui/icons/Category";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import LabelIcon from "@material-ui/icons/Label";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { useChangeTheme } from "../gatsby-theme-material-ui-top-layout/theme";

interface Props {
  title: string;
}

const HeaderItems = (
  <>
    <ListItem button component={GatsbyLink} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={GatsbyLink} to="/categories/">
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </ListItem>
    <ListItem button component={GatsbyLink} to="/tags/">
      <ListItemIcon>
        <LabelIcon />
      </ListItemIcon>
      <ListItemText primary="Tags" />
    </ListItem>
  </>
);

const drawerWidth = 240;
const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: `calc(32px + ${theme.typography.pxToRem(24)})`,
      [theme.breakpoints.down("sm")]: {
        width: 0,
      },
    },
  })
);

const Header: React.FC<Props> = ({ title }: Props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeTheme = useChangeTheme();
  const handleToggleTheme = () => {
    const mode = theme.palette.type === "light" ? "dark" : "light";

    changeTheme(mode);
  };

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="span" className={classes.title}>
            {title}
          </Typography>
          <IconButton color="inherit" onClick={handleToggleTheme}>
            {theme.palette.type === "light" ? (
              <BrightnessDarkIcon />
            ) : (
              <BrightnessLightIcon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{HeaderItems}</List>
      </Drawer>
    </>
  );
};

export default Header;
