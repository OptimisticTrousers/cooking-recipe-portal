import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Stack, ListItem } from "@mui/material";
import { Flex } from "@chakra-ui/react";

const drawerWidth = 240;
const navItems = ["Posts", "Categories"];
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <AppBar component="nav">
      <div className="flex">
        <Link to="/">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" }, color: "#fff"}}
          >
            HOME
          </Typography>
        </Link>
        <div className="flex">
          {navItems.map((item) => (
            <Link to={`/${item.toLowerCase()}`} className="button is-light m-2">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </AppBar>
  );
};

export default Navbar;
