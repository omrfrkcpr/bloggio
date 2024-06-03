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
import Logo from "./Logo";
import CustomTypography from "../commons/CustomTypography";
import { useSelector } from "react-redux";
import useAuthCalls from "../../hooks/useAuthCalls";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../Modals/AuthModal";
import useShowModal from "../../hooks/useShowModal";
import { RootState } from "../../app/store";
import usePath from "../../hooks/usePath";
import { loginSettings } from "../../helper/constants";
import { capitalizeWords, maskEmail } from "../../helper/functions";
import { ChartBar, SignOut, User } from "@phosphor-icons/react";
import Search from "../commons/Search";
import { IoIosArrowDown } from "react-icons/io";
import useBlogCalls from "../../hooks/useBlogCalls";

const Navbar = () => {
  const { currentUser } = useSelector((state: any) => state.auth);
  const { showNavbarModal } = useSelector((state: RootState) => state.modal);
  const { logout } = useAuthCalls();
  const { toggleNavbarModal, toggleHeroModal } = useShowModal();
  const navigate = useNavigate();
  const [selectedFormType, setSelectedFormType] = React.useState("");
  const { getNavigatePath } = usePath();
  const [isActive, setIsActive] = React.useState(false);
  const [searchModal, setSearchModal] = React.useState(false);
  const { getBlogData } = useBlogCalls();
  const { pathname } = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  React.useEffect(() => {
    getBlogData("blogs");
  }, []);

  React.useEffect(() => {
    const scrollMe = () => {
      window.scrollY > 250 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener("scroll", scrollMe);
  }, []);

  const pages = React.useMemo(
    () =>
      [
        { label: "Home", path: "/", id: 1 },
        { label: "Contact", path: "/contact", id: 2 },
        { label: "About", path: "/about", id: 3 },
        currentUser &&
          pathname !== "/write" && { label: "Write", path: "/write", id: 4 },
      ].filter(Boolean),
    [currentUser, pathname]
  );

  const loggedInSettings = React.useMemo(
    () => [
      { label: "Profile", path: `/profile/${currentUser?._id}`, id: 1 },
      { label: "Stats", path: `/stats/${currentUser?._id}`, id: 2 },
      { label: "Logout", path: "logout", id: 3 },
    ],
    [currentUser]
  );

  const handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void =
    React.useCallback((event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    }, []);

  const handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void =
    React.useCallback((event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    }, []);

  const handleCloseNavMenu: (path: string) => void = React.useCallback(
    (path: string) => {
      setAnchorElNav(null);
      if (path === "logout") {
        logout();
      } else {
        navigate(path);
      }
    },
    [logout, navigate]
  );

  const handleCloseUserMenu: (path: string) => void = React.useCallback(
    (path: string) => {
      setAnchorElUser(null);
      if (path === "logout") {
        logout();
        toggleHeroModal(false);
        toggleNavbarModal(false);
      } else {
        navigate(path);
      }
    },
    [logout, navigate, toggleHeroModal, toggleNavbarModal]
  );

  const handleLoginMenu = React.useCallback(
    (pathUrl: string) => {
      setAnchorElUser(null);
      toggleNavbarModal();
      setSelectedFormType(pathUrl);
      getNavigatePath("/");
    },
    [toggleNavbarModal, getNavigatePath]
  );

  return (
    <>
      <AppBar position="sticky" sx={{ zIndex: 30 }}>
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
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                mt: "6px",
              }}
              width="50px"
              alt="logo"
            />
            <CustomTypography
              variant="h4"
              sx={{
                mr: 2,
                mb: 1,
                display: { xs: "none", md: "flex" },
                fontFamily: "Playfair Display",
                fontWeight: 600,
                letterSpacing: ".3rem",
                color: "inherit",
                textShadow: "2px 2px 8px #000000",
                textDecoration: "none",
              }}
              content="Bloggio"
              alt="bloggioTitle"
            />

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                position: "relative",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="default"
                data-test="menuIcon"
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
                data-test="mobileMenu"
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
                      alt={`mobileMenuItem-${label.toLowerCase()}`}
                    />
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Logo
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                mt: "12px",
              }}
              width="40px"
              alt="logoMobile"
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
                color: isActive ? "#B9D0F0" : "inherit",
                textDecoration: "none",
                textShadow: isActive ? "" : "1px 2px 1px #0000004a",
              }}
              content="Bloggio"
              alt="bloggioTitleMobile"
            />
            {currentUser && (
              <Search
                modal={searchModal}
                setModal={setSearchModal}
                data-test="search"
              />
            )}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "end",
                margin: "0 0.5rem",
              }}
              data-test="desktopMenu"
            >
              {pages.map(({ label, path, id }) => (
                <Button
                  key={id}
                  onClick={() => handleCloseNavMenu(path)}
                  sx={{
                    my: 1,
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
                  data-test={`desktopMenuItem-${label.toLowerCase()}`}
                >
                  {label}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    position: "relative",
                    marginRight: { xs: "1rem", md: "0" },
                    minWidth: "44px",
                  }}
                  data-test="userMenuIcon"
                >
                  {currentUser?.image ? (
                    <img
                      className="w-[44px] h-11 rounded-full cursor-pointer"
                      src={currentUser?.image}
                      alt="user-image"
                      data-test="userImage"
                    />
                  ) : (
                    <Avatar
                      alt={
                        currentUser &&
                        `${capitalizeWords(currentUser?.firstName)}`
                      }
                      src="/static/images/avatar/2.jpg"
                      sx={{
                        minWidth: "44px",
                        height: "42px",
                        cursor: "pointer",
                      }}
                      data-test="userAvatar"
                    />
                  )}
                  <IoIosArrowDown
                    className="absolute -right-[0.9rem] cursor-pointer"
                    size={12}
                    data-test="userMenuArrow"
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
                data-test="userMenu"
              >
                {currentUser && (
                  <div
                    className="px-4 py-3 text-center border-b-2 mb-2"
                    data-test="userInfo"
                  >
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {`${capitalizeWords(
                        currentUser?.firstName
                      )} ${currentUser?.lastName?.toUpperCase()}`}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {maskEmail(currentUser?.email)}
                    </span>
                  </div>
                )}
                {currentUser
                  ? loggedInSettings.map(({ label, path, id }) => (
                      <MenuItem
                        key={id}
                        sx={{
                          gap: 0.5,
                          borderTop:
                            label === "Logout" ? "2px solid #EEEEEE" : "",
                        }}
                        onClick={() => handleCloseUserMenu(path)}
                      >
                        {label === "Profile" ? (
                          <User
                            size={18}
                            className="mb-[0.1rem] text-gray-600"
                          />
                        ) : label === "Stats" ? (
                          <ChartBar
                            size={18}
                            className="mb-[0.1rem] text-gray-600"
                          />
                        ) : (
                          label === "Logout" && (
                            <SignOut
                              size={18}
                              className="mb-[0.1rem] text-gray-600"
                            />
                          )
                        )}
                        <CustomTypography
                          textAlign="center"
                          content={label}
                          alt={`userMenuItem-${label.toLowerCase()}`}
                        />
                      </MenuItem>
                    ))
                  : loginSettings.map(({ label, id, path }) => (
                      <MenuItem
                        key={id}
                        onClick={() => handleLoginMenu(path)}
                        data-test={`loginMenuItem-${label.toLowerCase()}`}
                      >
                        <CustomTypography
                          textAlign="center"
                          content={label}
                          alt={label.toLowerCase()}
                        />
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
          data-test="authModal"
        />
      )}
    </>
  );
};
export default Navbar;
