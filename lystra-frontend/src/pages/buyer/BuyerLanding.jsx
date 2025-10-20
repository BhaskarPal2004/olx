import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import FeaturedProducts from "@/layouts/landing/buyer/FeaturedProducts";
import Category from "@/layouts/landing/buyer/Category";
import Hero from "@/layouts/landing/buyer/Hero";
import Footer from "@/layouts/shared/Footer";
import Navbar from "@/layouts/shared/Navbar";
import NewAds from "@/layouts/landing/buyer/NewAds";
import AuthNavbar from "@/layouts/shared/AuthNavbar";

const BuyerLanding = () => {
    const { user } = useSelector(store => store.auth);
    const categoryRef = useRef(null);

    useEffect(() => {
        window.scrollToCategory = () => {
            categoryRef.current?.scrollIntoView({ behavior: "smooth" });
        };


        if (window.location.hash === "#category") {
            categoryRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <div className="bg-white">
            {user ? <AuthNavbar /> : <Navbar />}
            <Hero />
            <div ref={categoryRef}>
                <Category />
            </div>
            <NewAds />
            <FeaturedProducts />
            <Footer />
        </div>
    );
};

export default BuyerLanding;
