import * as React from "react";

import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyLink } from "gatsby-theme-material-ui";

import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BrightnessDarkIcon from "@material-ui/icons/Brightness4";
import BrightnessLightIcon from "@material-ui/icons/Brightness7";
import CategoryIcon from "@material-ui/icons/Category";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import LabelIcon from "@material-ui/icons/Label";
import MenuIcon from "@material-ui/icons/Menu";

import { useChangeTheme } from "../gatsby-theme-material-ui-top-layout/theme";

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(["width", "margin"], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
      zIndex: theme.zIndex.drawer + 1,
    },
    appBarShift: {
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["width", "margin"], {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.sharp,
      }),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
    },
    drawer: {
      flexShrink: 0,
      whiteSpace: "nowrap",
      width: drawerWidth,
    },
    drawerClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
      // width: theme.spacing(7) + 1,
      // [theme.breakpoints.up("sm")]: {
      //   width: theme.spacing(9) + 1,
      // },
      // ListItem (theme.mixins.)gutters + SvgIcon font-size
      width: `calc(32px + ${theme.typography.pxToRem(24)})`,
      [theme.breakpoints.down("sm")]: {
        width: 0,
      },
    },
    drawerOpen: {
      transition: theme.transitions.create("width", {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.sharp,
      }),
      width: drawerWidth,
    },
    hide: {
      display: "none",
    },
    menuButton: {
      marginRight: 36,
    },
    root: {
      display: "flex",
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      alignItems: "center",
      display: "flex",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  })
);

const Layout: React.FC<Props> = ({ children }: Props) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

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
    <div className={classes.root}>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            color="inherit"
            edge="start"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            component="span"
            noWrap
            variant="h6"
          >
            {data.site.siteMetadata.title}
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
      <nav>
        <Drawer
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          variant="permanent"
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
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
          </List>
        </Drawer>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container
          maxWidth="md"
          style={{ marginBottom: "10vh", marginTop: "32px" }}
        >
          {children}
        </Container>
      </main>
    </div>
  );
};

export default Layout;
