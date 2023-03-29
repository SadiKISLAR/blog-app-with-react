import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import Details from "../pages/Details";
import PrivateRouter from "./PrivateRouter";
import NavBar from "../components/NavBar";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/details/:id" element={<PrivateRouter />}>
                    <Route path="" element={<Details />} />
                </Route>

                <Route path="/profile" element={<PrivateRouter />}>
                    <Route path="" element={<Profile />} />
                </Route>

                <Route path="/newblog" element={<PrivateRouter />}>
                    <Route path="" element={<NewBlog />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
