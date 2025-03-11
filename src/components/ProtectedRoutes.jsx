import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
    const {auth} = useAuth();
    const user = auth;
    return user.accessToken ? <Outlet/> : <Navigate to="../login"></Navigate>
}

export default ProtectedRoutes