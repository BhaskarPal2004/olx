import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./layouts/RootLayout";
import BuyerRoutes from "./routes/buyerRoutes";
import SellerRoutes from "./routes/sellerRoutes";
import { APIProvider } from "@vis.gl/react-google-maps";
import CategoriesPage from "./pages/CategoriesPage";
import HelpPage from "./pages/HelpPage";
import TransactionsPage from "./pages/TransactionsPage";
import AdDetailsPage from "./pages/ad/AdDetailsPage";
import ReviewPage from "./pages/review/ReviewPage";
import AuthRoutes from "./routes/AuthRoutes";
import ProfilePage from "./pages/ProfilePage";
import useGetUserCoords from "./hooks/useGetUserCoords";
import PerformancePage from "./pages/ad/PerformancePage";
import PurchaseItemPage from "./pages/PurchaseItemPage";
import FavoriteAdPage from "./pages/ad/FavoriteAdPage";
import BlockUserPage from "./pages/BlockUserPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BuyerLanding from "@/pages/buyer/BuyerLanding";
import SellerLanding from "@/pages/seller/SellerLanding";
import ChatPage from "./pages/ChatPage";

const App = () => {
  useGetUserCoords();

  return (
    <BrowserRouter>
      <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY}>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<RootLayout />}>
            <Route path="/auth" element={<Outlet />}>
              {AuthRoutes()}
            </Route>

            {/* Buyer Routes */}
            <Route path="/buyer" element={<Outlet />}>
              <Route index element={<BuyerLanding />} />
              <Route element={<ProtectedRoute allowedRole="buyer" />}>
                {BuyerRoutes()}
              </Route>
            </Route>

            {/* Seller Routes */}
            <Route path="/seller" element={<Outlet />}>
              <Route index element={<SellerLanding />} />
              <Route element={<ProtectedRoute allowedRole="seller" />}>
                {SellerRoutes()}
              </Route>
            </Route>
          </Route>

          {/* Public Pages */}
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/ad/details/:adId" element={<AdDetailsPage />} />
          <Route path="/ad/reviews/:adId" element={<ReviewPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ad/performance/:adId" element={<PerformancePage />} />
          <Route path="/purchase" element={<PurchaseItemPage />} />
          <Route path="/favoriteAd" element={<FavoriteAdPage />} />
          <Route path="/BlockUser" element={<BlockUserPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Routes>
      </APIProvider>
    </BrowserRouter>
  );
};

export default App;
