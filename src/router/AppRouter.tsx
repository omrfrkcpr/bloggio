import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "../pages/Register";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Detail from "../pages/Detail";
import PrivateRouter from "./PrivateRouter";
import MyBlogs from "../pages/MyBlogs";
import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";
import Write from "../pages/Write";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/our-story" element={<About />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/write" element={<PrivateRouter />}>
            <Route path="" element={<Write />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default AppRouter;
