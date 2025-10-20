import { Route } from "react-router-dom"
import HomePage from "@/pages/HomePage"


const BuyerRoutes = () => {
    return (
        <>
            <Route path="home" element={<HomePage />} />
        </>
    )
}

export default BuyerRoutes;
