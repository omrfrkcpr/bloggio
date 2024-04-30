import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import amblem from "../../assets/amblem.png";

const pages = [
  { label: "Dashboard", path: "/" },
  { label: "New Blog", path: "/new-blog" },
  { label: "About", path: "/about" },
];

const settings = [
  { label: "My Blogs", path: "/my-blogs" },
  { label: "Profile", path: "/profile" },
  { label: "Logout", path: "/logout" },
];

// const auth = [
//   { label: "Login", path: "/login" },
//   { label: "Register", path: "/register" },
// ];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false} sx={{ backgroundColor: "#ff8991" }}>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img src={amblem} alt="" width="60px" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "serif",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOGGIO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ label, path }) => (
                <MenuItem key={label} onClick={handleCloseNavMenu}>
                  <a href={path}>
                    <Typography
                      textAlign="center"
                      sx={{ color: "#A63740", textTransform: "capitalize" }}
                    >
                      {label}
                    </Typography>
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <img src={amblem} alt="" width="60px" />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOGGIO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              margin: "0",
              gap: 1,
            }}
          >
            {pages.map(({ label, path }) => (
              <a href={path}>
                <Button
                  key={label}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "#A63740",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    "&:hover": {
                      color: "black",
                      backgroundColor: "white",
                    },
                    display: "block",
                  }}
                >
                  {label}
                </Button>
              </a>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar
                  src="/static/images/avatar/2.jpg"
                  sx={{ width: "42px", height: "42px" }}
                /> */}
                <img
                  className="w-11 h-11 rounded-full cursor-pointer"
                  src="https://mighty.tools/mockmind-api/content/cartoon/9.jpg"
                  alt="user photo"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <div className="px-4 py-3 text-center border-b-2 mb-2">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Omer Sharp
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  omr@gmail.com
                </span>
              </div>
              {settings.map(({ label, path }) => (
                <MenuItem key={label} onClick={handleCloseUserMenu}>
                  <a href={path}>
                    <Typography textAlign="center">{label}</Typography>
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
