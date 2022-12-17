import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const navItems = ["Posts", "Categories"];

const Navbar = () => {
  return (
    <AppBar component="nav">
      <div className="flex">
        <Link to="/">
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: { xs: "center", sm: "left" },
              color: "#fff",
            }}
          >
            HOME
          </Typography>
        </Link>
        <div className="flex">
          {navItems.map((item, index) => (
            <Link to={`/${item.toLowerCase()}`} className="button is-light m-2" key={index}>
              {item}
            </Link>
          ))}
        </div>
      </div>
    </AppBar>
  );
};

export default Navbar;
