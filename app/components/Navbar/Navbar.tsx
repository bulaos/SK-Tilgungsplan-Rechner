import { AppBar, Link, Toolbar } from "@mui/material";
import { SparkasseLogo } from "../Logo/SparkasseLogo";

export const Navbar = () => {
  return (
    <AppBar
      component="header"
      position="sticky"
      sx={{ top: 0, zIndex: "header" }}
      aria-label="Main navigation"
    >
      <Toolbar>
        <Link href="/">
          <SparkasseLogo />
        </Link>
      </Toolbar>
    </AppBar>
  );
};
