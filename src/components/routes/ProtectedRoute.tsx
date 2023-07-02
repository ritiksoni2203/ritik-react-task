import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function RequireAuth() {
    const { isAuthenticated, isLoading } = useAuth0();
    let location = useLocation();

    console.log(isAuthenticated);
    

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet />;
}