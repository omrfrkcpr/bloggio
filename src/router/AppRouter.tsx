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
import NewBlog from "../pages/NewBlog";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Detail from "../pages/Detail";
import PrivateRouter from "./PrivateRouter";
import MyBlogs from "../pages/MyBlogs";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/new-blog" element={<PrivateRouter />}>
            <Route path="" element={<NewBlog />} />
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
