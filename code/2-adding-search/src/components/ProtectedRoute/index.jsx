import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import authContext from "../../context/auth-context";

function ProtectedRoute({ children }) {
    const ctx = useContext(authContext);
    const location = useLocation();

    if (!ctx.isLoggedIn) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}

export default ProtectedRoute;
