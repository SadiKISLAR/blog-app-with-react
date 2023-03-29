import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import { toastError } from "../helpers/toastify";

const PrivateRouter = () => {
    const { currentUser } = useAuthContext();

    return (
        <div>
            {currentUser ? <Outlet /> : <Navigate to="/login" replace />}
            {currentUser ? "" : toastError("Please Login..")}
        </div>
    );
};

export default PrivateRouter;