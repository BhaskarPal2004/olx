import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useRedirectOnRoot from "@/hooks/useRedirectOnRoot";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    useRedirectOnRoot();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith("/buyer"))
            document.title = "Lystra | Buyer";
        else if (location.pathname.startsWith("/seller"))
            document.title = "Lystra | Seller";
        else
            document.title = "Lystra | Marketplace";

    }, [location.pathname]);

    return <Outlet />;
};

export default RootLayout;