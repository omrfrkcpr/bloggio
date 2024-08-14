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
// import Stats from "../pages/Stats";
import SingleBlog from "../pages/SingleBlog";
import EditBlog from "../pages/EditBlog";
import Development from "../components/global/Development";
import AuthSuccess from "../pages/AuthSuccess";
import AuthFail from "../pages/AuthFail";

const AppContent = () => {
  const location = useLocation();
  const hideNavbarFooterPaths = ["/auth/success", "/auth/failure"];
  const showNavbarFooter = !hideNavbarFooterPaths.includes(location.pathname);

  return (
    <>
      {showNavbarFooter && <Navbar />}
      <Outlet />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        // TODO : Contact.tsx
        <Route path="contact" element={<Contact />} />
        <Route path="auth/success" element={<AuthSuccess />} />
        <Route path="auth/failure" element={<AuthFail />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="write" element={<Write />} />
          <Route path="blog/:blogId" element={<SingleBlog />} />
          <Route path="blog/:blogId/edit" element={<EditBlog />} />
          <Route path="profile/:userId" element={<Profile />} />
          // TODO : Stats.tsx
          <Route path="stats/:userId" element={<Development />} />
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
