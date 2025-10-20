import useGetFavoriteAds from "@/hooks/ad/useGetFavoriteAds";
import { useSelector } from "react-redux";
import BuyerAdCard from "@/components/home/BuyerAdCard";
import AuthNavbar from "@/layouts/shared/AuthNavbar";
import SellerAdCard from "@/components/home/SellerAdCard";

const FavoriteAdPage = () => {
    const role = useSelector((store) => store.auth.role);
    useGetFavoriteAds();
    const { favoriteAd } = useSelector((store) => store.ad);
    const data = "favoriteAd";

    const isBuyer = role === "buyer";

    return (
        <>
            <AuthNavbar />
            <section className="border-none max-w-[1200px] px-4 sm:px-8 pb-10 mx-auto my-4 flex flex-wrap gap-4 overflow-y-scroll no-scrollbar h-[calc(100vh-100px)]">
                {favoriteAd.length > 0 ? (
                    favoriteAd.map((ad) =>
                        isBuyer ? (
                            <BuyerAdCard key={ad._id} ad={ad} data ={data} className="w-full xs:w-[48%] sm:w-[30%] lg:w-[22%]" />
                        ) : (
                                <SellerAdCard key={ad._id} ad={ad} data={data} className="w-full sm:w-[48%] lg:w-[45%]" />
                        )
                    )
                ) : (
                    <div className="w-full flex justify-center items-center h-full text-gray-500 text-lg">
                        No favorite ads yet.
                    </div>
                )}
            </section>
        </>
    );
};

export default FavoriteAdPage;
