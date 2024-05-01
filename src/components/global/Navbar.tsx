import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../Commons/Logo";
import CustomTypography from "../Commons/CustomTypography";

const pages = [
  { label: "Dashboard", path: "/", id: 1 },
  { label: "Write", path: "/write", id: 2 },
  { label: "Our Story", path: "/our-story", id: 3 },
];

const settings = [
  { label: "My Blogs", path: "/my-blogs", id: 1 },
  { label: "Profile", path: "/profile", id: 2 },
  { label: "Logout", path: "/logout", id: 3 },
];

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
          padding: { sm: "0 1rem", md: "0.2rem 8rem" },
        }}
      >
        <Toolbar disableGutters>
          <Logo
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, mt: "5px" }}
            width="50px"
          />
          <CustomTypography
            variant="h4"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Playfair Display",
              fontWeight: 600,
              letterSpacing: ".3rem",
              color: "inherit",
              textShadow: "2px 2px 8px #000000",
              textDecoration: "none",
            }}
            component="a"
            href="/"
            content="Bloggio"
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default"
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
              {pages.map(({ label, path, id }) => (
                <MenuItem key={id} onClick={handleCloseNavMenu}>
                  <CustomTypography
                    textAlign="center"
                    component="a"
                    href={path}
                    sx={{
                      color: "black",
                      textTransform: "capitalize",
                    }}
                    content={label}
                  />
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
          <CustomTypography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Playfair Display",
              fontWeight: 600,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              textShadow: "1px 2px 1px #0000004a",
            }}
            content="Bloggio"
          />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
              marginRight: "1rem",
              gap: 1,
            }}
          >
            {pages.map(({ label, path, id }) => (
              <a href={path} key={id}>
                <Button
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
              {settings.map(({ label, path, id }) => (
                <MenuItem key={id} onClick={handleCloseUserMenu}>
                  <CustomTypography
                    component="a"
                    href={path}
                    textAlign="center"
                    content={label}
                  />
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
