import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const useRedirectOnRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const role = useSelector(state => state.auth.role);

    useEffect(() => {
        if (location.pathname !== "/") {
            sessionStorage.setItem("lastRoute", location.pathname);
            return;
        }

        const lastRoute = sessionStorage.getItem("lastRoute");

        if (lastRoute && lastRoute !== "/") {
            navigate(lastRoute, { replace: true });
        }
        else {
            const redirectPath = role === "seller" ? "/seller" : "/buyer";
            navigate(redirectPath, { replace: true });
        }

    }, [location, role, navigate]);
};

export default useRedirectOnRoot;