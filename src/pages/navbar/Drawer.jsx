import React, { useState } from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {makeStyles} from '@mui/styles'
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
 import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "#000",
    fontSize: "16px",
    fontFamily: `"Raleway",  sans-serif`,

  },
  icon: {
    color: "white"
  }
}));

function DrawerComponent() {
  const pages = ["Giới thiệu", "Phim", "Rạp", "Giá vé", "Liên hệ", "Tin tức", "Sự kiện"];
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {pages.map((page, index) => (
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/" className={classes.link}>{page}</Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <IconButton sx={{ color: "white", marginLeft: "auto" }} onClick={() => setOpenDrawer(!openDrawer)} className={classes.icon}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
