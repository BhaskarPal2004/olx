import HomePage from "@/pages/HomePage"
import { Route } from "react-router-dom"


const SellerRoutes = () => {
    return (
      <>
        <Route path="home" element={<HomePage />} />
      </>
    );
}

export default SellerRoutes;
