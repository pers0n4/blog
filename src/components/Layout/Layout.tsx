import * as React from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import AppBarIcons from "./AppBarIcons";
import MenuItems from "./MenuItems";

import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import type { IconButtonProps } from "@mui/material/IconButton";

const drawerWidth = 240;
const iconSize = 24;
const listItemPadding = 16;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface DrawerToggleIconButtonProps extends IconButtonProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (property) => property !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["width", "margin"], {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (property) => property !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    position: "relative",
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    whiteSpace: "nowrap",
    width: drawerWidth,
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
      // width: theme.spacing(7),
      // [theme.breakpoints.up("sm")]: {
      //   width: theme.spacing(9),
      // },
      width: 0,
      [theme.breakpoints.up("md")]: {
        width: theme.typography.pxToRem(iconSize + listItemPadding * 2),
      },
    }),
  },
}));

const DrawerToggleIconButton = styled(IconButton, {
  shouldForwardProp: (property) => property !== "open",
})<DrawerToggleIconButtonProps>(({ theme, open }) => ({
  marginRight: 36,
  transition: theme.transitions.create("margin", {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  ...(open && {
    marginRight: 0,
    transition: theme.transitions.create("margin", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    visibility: "hidden",
  }),
}));

type Props = React.PropsWithChildren<unknown>;

export default function Layout({ children }: Props) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar open={open} position="absolute">
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <DrawerToggleIconButton
            aria-label="open drawer"
            color="inherit"
            edge="start"
            open={open}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </DrawerToggleIconButton>
          <Typography
            noWrap
            color="inherit"
            component="h1"
            sx={{ flexGrow: 1 }}
            variant="h6"
          >
            Hack IT
          </Typography>
          <AppBarIcons />
        </Toolbar>
      </AppBar>
      <Drawer open={open} variant="permanent">
        <Toolbar
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>{MenuItems}</List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mb: 4, mt: 4 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 640,
              p: 2,
            }}
          >
            {children}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
