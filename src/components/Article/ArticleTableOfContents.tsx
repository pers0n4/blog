import * as React from "react";
import { GatsbyLink } from "gatsby-theme-material-ui";
import clsx from "clsx";
import { throttle } from "lodash";

import { createStyles, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import type { TocItem } from "../../graphql";

type ThrottleCallback = () => void;

type NodeItem = {
  title: string;
  hash: string;
  node: HTMLElement | null;
};

type Props = {
  toc: {
    items: TocItem[];
  };
};

const useThrottledOnScroll = (callback: ThrottleCallback, delay: number) => {
  const throttledCallback = React.useMemo(() => throttle(callback, delay), [
    callback,
    delay,
  ]);

  React.useEffect(() => {
    window.addEventListener("scroll", throttledCallback);
    return () => {
      window.removeEventListener("scroll", throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
};

// TODO: these nodes are mutable sources. Use createMutableSource once it's stable
const getItemsClient = (headings: TocItem[]) => {
  const itemsWithNode: NodeItem[] = [];

  if (typeof window === "undefined" || !window.document) {
    return undefined;
  }

  headings.forEach((item) => {
    itemsWithNode.push({
      title: item.title,
      hash: item.url,
      node: document.querySelector(item.url),
    });
    // TODO: support nested items
  });
  return itemsWithNode;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "none",
      position: "relative",
      [theme.breakpoints.up("lg")]: {
        display: "block",
      },
    },
    wrapper: {
      position: "absolute",
      left: "100%",
      marginLeft: theme.spacing(4),
    },
    list: {
      position: "fixed",
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
    item: {
      padding: theme.spacing(0.5, 0, 0.5, "8px"),
      borderLeft: "3px solid transparent",
      borderLeftColor:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[900],
      color: theme.palette.text.secondary,
      fontSize: "0.875rem",
      "&:link": {
        textDecoration: "none",
      },
      "&:hover": {
        borderLeftColor:
          theme.palette.type === "light"
            ? theme.palette.grey[300]
            : theme.palette.grey[800],
      },
      "&$active,&:active": {
        borderLeftColor:
          theme.palette.type === "light"
            ? theme.palette.grey[300]
            : theme.palette.grey[800],
      },
    },
    active: {
      color: theme.palette.primary.main,
    },
  })
);

const ArticleToc: React.FC<Props> = ({ toc }: Props) => {
  const { items } = toc;
  const classes = useStyles();

  const itemsWithNodeRef = React.useRef<NodeItem[]>();
  React.useEffect(() => {
    itemsWithNodeRef.current = getItemsClient(items);
  }, [items]);
  itemsWithNodeRef.current = getItemsClient(items);

  const [activeState, setActiveState] = React.useState<string | null>("");
  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef<number | NodeJS.Timeout>();
  const findActiveIndex = React.useCallback(() => {
    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) {
      return;
    }

    if (
      undefined === itemsWithNodeRef ||
      undefined === itemsWithNodeRef.current ||
      itemsWithNodeRef.current[0].node === null
    ) {
      return;
    }

    let active;
    if (
      document.documentElement.scrollTop <
      itemsWithNodeRef.current[0].node.offsetTop
    ) {
      active = { hash: null };
    } else {
      for (let i = itemsWithNodeRef.current.length - 1; i >= 0; i -= 1) {
        const item = itemsWithNodeRef.current[i];
        if (
          item.node &&
          item.node.offsetTop < document.documentElement.scrollTop
        ) {
          active = item;
          break;
        }
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState]);

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current as number);
    },
    []
  );

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(findActiveIndex, 166);

  const handleClick = (hash: string) => (event: MouseEvent) => {
    // Ignore click for new tab/new window behavior
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return;
    }

    // Used to disable findActiveIndex if the page scrolls due to a click
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);
    }
  };

  return (
    <nav className={classes.root}>
      <div className={classes.wrapper}>
        <Typography component="ul" className={classes.list}>
          {items.map((item) => (
            <li key={item.title}>
              <GatsbyLink
                to={item.url}
                onClick={handleClick(item.url)}
                className={clsx(
                  classes.item,
                  activeState === item.url ? classes.active : undefined
                )}
              >
                {item.title}
              </GatsbyLink>
            </li>
          ))}
        </Typography>
      </div>
    </nav>
  );
};
export default ArticleToc;
