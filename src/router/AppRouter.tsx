import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import PrivateRouter from "./PrivateRouter";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Write from "../pages/Write";
import Contact from "../pages/Contact";
import FilterCategory from "../pages/FilterCategory";
import SingleBlog from "../pages/SingleBlog";
import EditBlog from "../pages/EditBlog";
import AuthSuccess from "../pages/AuthSuccess";
import AuthFail from "../pages/AuthFail";
import Statistics from "../pages/Statistics";
import Forgot from "../pages/Forgot";
import Verify from "../pages/Verify";
import ResetPassword from "../pages/Reset";

const AppContent = () => {
  const location = useLocation();
  const hideNavbarFooterPaths = [
    "/auth/success",
    "/auth/failure",
    // "/forgot-password",
  ];

  // Check if the current path matches any of the paths that should hide the navbar and footer
  const hideNavbarFooter = hideNavbarFooterPaths.includes(location.pathname);

  // Additional check for dynamic paths like "/verify-email/:token" or "/reset-password/:token"
  const hideForDynamicPaths =
    /\/verify-email\/.+/.test(location.pathname) ||
    /\/reset-password\/.+/.test(location.pathname);

  const showNavbarFooter = !hideNavbarFooter && !hideForDynamicPaths;

  return (
    <>
      {showNavbarFooter && <Navbar />}
      <Outlet />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="auth/success" element={<AuthSuccess />} />
        <Route path="auth/failure" element={<AuthFail />} />
        <Route path="forgot-password" element={<Forgot />} />
        <Route path="verify-email/:token" element={<Verify />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="write" element={<Write />} />
          <Route path="blog/:blogId" element={<SingleBlog />} />
          <Route path="blog/:blogId/edit" element={<EditBlog />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="statistics/:userId" element={<Statistics />} />
        </Route>
        <Route path="/categories" element={<FilterCategory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showNavbarFooter && <Footer />}
    </>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default AppRouter;
