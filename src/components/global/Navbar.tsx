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
import Logo from "../Commons/Logo";

const pages = [
  { label: "Dashboard", path: "/" },
  { label: "Write", path: "/write" },
  { label: "Our Story", path: "/our-story" },
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

const Navbar = () => {
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
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "#b9d0f0",
          borderBottom: "1px solid black",
          padding: { sm: "0", md: "0.2rem 8rem" },
        }}
      >
        <Toolbar disableGutters>
          <Logo
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            width="60px"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "serif",
              fontWeight: 400,
              letterSpacing: ".3rem",
              color: "inherit",
              textShadow: "2px 2px 5px #000000",
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
              {pages.map(({ label, path }, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <a href={path}>
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "black",
                        textTransform: "capitalize",
                      }}
                    >
                      {label}
                    </Typography>
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Logo
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              mt: "5px",
            }}
            width="40px"
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              textShadow: "1px 4px 1px #0000004a",
            }}
          >
            BLOGGIO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
              marginRight: "1rem",
              gap: 1,
            }}
          >
            {pages.map(({ label, path }, index) => (
              <a href={path}>
                <Button
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    borderRadius: "20px",
                    textTransform: "capitalize",
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
              {settings.map(({ label, path }, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
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
};
export default Navbar;
