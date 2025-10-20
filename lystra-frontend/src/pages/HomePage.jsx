import CreateAdModal from "@/components/ad/CreateAdModal";
import DashboardHeader from "@/components/home/DashboardHeader";
import LocationModal from "@/components/home/LocationModal";
import HomeDashboard from "@/layouts/home/HomeDashboard";
import HomeSideBar from "@/layouts/home/HomeSideBar";
import AuthNavbar from "@/layouts/shared/AuthNavbar";
import { useSelector } from "react-redux";
import CompareCard from "@/components/home/CompareCard";
import useGetFavoriteAds from "@/hooks/ad/useGetFavoriteAds";

const HomePage = () => {
  useGetFavoriteAds();
  const { adCreateModalVisible, locationChangeModalVisible } = useSelector(store => store.modal)
  const { compareAd } = useSelector(store => store.ad)
  return (
    <>
      <AuthNavbar />
      <div className="bg-[#F7F7F7] h-[calc(100vh-90px)] overflow-hidden flex flex-col pb-2 relative">
        <div className="w-full 2xl:w-[1170px] px-3 m-auto flex flex-col items-end flex-1 overflow-hidden">
          <DashboardHeader />
          <section className="mx-auto flex gap-3 flex-1 w-full overflow-hidden">
            <HomeSideBar />
            <div className="flex flex-col items-center gap-[60px] flex-1 overflow-hidden">
              <HomeDashboard />
            </div>
          </section>
        </div>
        {adCreateModalVisible && <CreateAdModal />}
        {locationChangeModalVisible && <LocationModal />}
        <div className="absolute bottom-2 right-3">
          <CompareCard compareAd={compareAd} />
        </div>
      </div>     
    </>
  );
};

export default HomePage;