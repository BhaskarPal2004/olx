import Visuals from "@/layouts/landing/seller/Visuals"
import Hero from "@/layouts/landing/seller/Hero"
import Footer from "@/layouts/shared/Footer"
import Navbar from "@/layouts/shared/Navbar"
import Features from "@/layouts/landing/seller/Features"


const SellerLanding = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <Visuals />
            <Footer />
        </>
    )
}

export default SellerLanding