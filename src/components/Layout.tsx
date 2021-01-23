import * as React from 'react';
import clsx from 'clsx';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyLink } from 'gatsby-theme-material-ui';

import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BrightnessDarkIcon from '@material-ui/icons/Brightness4';
import BrightnessLightIcon from '@material-ui/icons/Brightness7';
import CategoryIcon from '@material-ui/icons/Category';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import LabelIcon from '@material-ui/icons/Label';
import MenuIcon from '@material-ui/icons/Menu';

import { useChangeTheme } from '../gatsby-theme-material-ui-top-layout/theme';

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      // width: theme.spacing(7) + 1,
      // [theme.breakpoints.up("sm")]: {
      //   width: theme.spacing(9) + 1,
      // },
      // ListItem (theme.mixins.)gutters + SvgIcon font-size
      width: `calc(32px + ${theme.typography.pxToRem(24)})`,
      [theme.breakpoints.down('sm')]: {
        width: 0,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
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
    const mode = theme.palette.type === 'light' ? 'dark' : 'light';

    changeTheme(mode);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="span"
            className={classes.title}
            noWrap
          >
            {data.site.siteMetadata.title}
          </Typography>
          <IconButton color="inherit" onClick={handleToggleTheme}>
            {theme.palette.type === 'light' ? (
              <BrightnessDarkIcon />
            ) : (
              <BrightnessLightIcon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="permanent"
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
          style={{ marginTop: '32px', marginBottom: '10vh' }}
        >
          {children}
        </Container>
      </main>
    </div>
  );
};

export default Layout;
