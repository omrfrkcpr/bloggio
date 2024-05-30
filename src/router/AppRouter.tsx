import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
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
import Stats from "../pages/Stats";
import SingleBlog from "../pages/SingleBlog";
import EditBlog from "../pages/EditBlog";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Outlet />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="" element={<PrivateRouter />}>
            <Route path="write" element={<Write />} />
            <Route path="blog/:blogId" element={<SingleBlog />} />
            <Route path="blog/:blogId/edit" element={<EditBlog />} />
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="stats/:userId" element={<Stats />} />
          </Route>
          <Route path="/categories" element={<FilterCategory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default AppRouter;
