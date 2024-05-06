/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../commons/Logo";
import CustomTypography from "../commons/CustomTypography";
import { useSelector } from "react-redux";
import useAuthCalls from "../../hooks/useAuthCalls";
import { useNavigate } from "react-router-dom";
import AuthModal from "../Modals/AuthModal";
import useShowModal from "../../hooks/useShowModal";
import { RootState } from "../../app/store";
import usePath from "../../hooks/usePath";
import { loggedInSettings, loginSettings } from "../../helper/constants";
import { capitalizeWords } from "../../helper/functions";

const Navbar = () => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { showNavbarModal } = useSelector((state: RootState) => state.modal);
  const { logout } = useAuthCalls();
  const { toggleNavbarModal, toggleHeroModal } = useShowModal();
  const navigate = useNavigate();
  const [selectedFormType, setSelectedFormType] = React.useState("");
  const { getNavigatePath } = usePath();
  const [isActive, setIsActive] = React.useState(false);

  const pages = [
    { label: "Home", path: "/", id: 1 },
    { label: "Contact", path: "/contact", id: 2 },
    { label: "About", path: "/about", id: 3 },
    currentUser && { label: "Write", path: "/write", id: 4 },
  ].filter(Boolean);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  React.useEffect(() => {
    const scrollMe = () => {
      window.scrollY > 250 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener("scroll", scrollMe);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path: string) => {
    setAnchorElNav(null);
    if (path === "logout") {
      logout();
    } else {
      navigate(path);
    }
  };

  const handleCloseUserMenu = (path: string) => {
    setAnchorElUser(null);
    if (path === "logout") {
      logout();
      toggleHeroModal(false);
      toggleNavbarModal(false);
    } else {
      navigate(path);
    }
  };

  const handleLoginMenu = (pathUrl: string) => {
    setAnchorElUser(null);
    toggleNavbarModal();
    setSelectedFormType(pathUrl);
    getNavigatePath("/");
  };

  return (
    <>
      <AppBar position="sticky">
        <Container
          maxWidth={false}
          sx={{
            backgroundColor: isActive ? "white" : "#b9d0f0",
            borderBottom: "1px solid black",
            padding: { sm: "0 1rem", md: "0.2rem 8rem" },
            transition: "all 0.5s",
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
                  <MenuItem key={id} onClick={() => handleCloseNavMenu(path)}>
                    <CustomTypography
                      textAlign="center"
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
                <Button
                  key={id}
                  onClick={() => handleCloseNavMenu(path)}
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
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {currentUser?.image ? (
                    <img
                      className="w-11 h-11 rounded-full cursor-pointer"
                      src={currentUser?.image}
                    />
                  ) : (
                    <Avatar
                      alt={
                        currentUser &&
                        `${capitalizeWords(currentUser?.firstName)}`
                      }
                      src="/static/images/avatar/2.jpg"
                      sx={{ width: "42px", height: "42px" }}
                    />
                  )}
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
                {currentUser && (
                  <div className="px-4 py-3 text-center border-b-2 mb-2">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {`${capitalizeWords(
                        currentUser?.firstName
                      )} ${currentUser?.lastName?.toUpperCase()}`}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {`${currentUser?.email}`}
                    </span>
                  </div>
                )}
                {currentUser
                  ? loggedInSettings.map(({ label, path, id }) => (
                      <MenuItem
                        key={id}
                        onClick={() => handleCloseUserMenu(path)}
                      >
                        <CustomTypography textAlign="center" content={label} />
                      </MenuItem>
                    ))
                  : loginSettings.map(({ label, id, path }) => (
                      <MenuItem key={id} onClick={() => handleLoginMenu(path)}>
                        <CustomTypography textAlign="center" content={label} />
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {showNavbarModal && (
        <AuthModal
          isOpen={showNavbarModal}
          setIsOpen={toggleNavbarModal}
          selectedFormType={selectedFormType}
        />
      )}
    </>
  );
};
export default Navbar;
