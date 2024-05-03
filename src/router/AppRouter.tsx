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
import Detail from "../pages/Detail";
import PrivateRouter from "./PrivateRouter";
import MyBlogs from "../pages/MyBlogs";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Write from "../pages/Write";
import Contact from "../pages/Contact";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Outlet />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="" element={<PrivateRouter />}>
            <Route path="/write" element={<Write />} />
            <Route path="/blog-details/:id" element={<Detail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default AppRouter;
