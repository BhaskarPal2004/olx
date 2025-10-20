import { useState } from "react";
import { useSelector } from "react-redux";
import AdDescription from "@/components/ad/AdDescription";
import AdImageCarousel from "@/components/ad/AdImageCarousel";
import Disclaimer from "@/components/ad/Disclaimer";
import SellerReviewCard from "@/components/ad/SellerReviewCard";
import StartChattingBtn from "@/components/ad/StartChattingBtn";
import AuthNavbar from "@/layouts/shared/AuthNavbar";
import CustomMap from "@/components/ad/CustomMap";
import ReviewForm from "@/components/ad/ReviewForm";
import useGetSingleAd from "@/hooks/ad/useGetSingleAd";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import ReportModal from "@/components/chat/ReportModal";
import toast from "react-hot-toast";
import { UserCheck, UserPlus } from "lucide-react";
import useGetAllFollow from "@/hooks/useGetAllFollower";
import useGetAllFollowing from "@/hooks/useGetAllFollowing";

const AdDetailsPage = () => {
  useGetSingleAd();

  const fetchFollowers = useGetAllFollow();    
  const fetchFollowing = useGetAllFollowing(); 

  const { followApi } = useAxiosInstance()
  const followId =useSelector((store)=>store.ad?.singleAd?.sellerId?._id);
  const following = useSelector((store) => store.user.following);
  const isFollowing = following?.includes(followId);
  
  
  const singleAd = useSelector((store) => store.ad.singleAd);
  const role = useSelector((store) => store.auth.role);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { userApi } = useAxiosInstance();

  const handleReportSubmit = async (reportData) => {
    const payload = {
      message: reportData.details,
      isFake: reportData.reportType === "isFake",
      isFraudulent: reportData.reportType === "isFraud",
    };

    try {
      const res = await userApi.post(`/report/${singleAd._id}`, payload);
      if (res.success) {
        toast.success(res.message);
        setIsReportModalOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to report ad");
    }
  };

  const handleFollow = async () => {
    try {
      const res = await followApi.post(`/follow/${followId}`)
      if (res.success) {
        await fetchFollowing();
        await fetchFollowers();
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  return (
    <>
      <AuthNavbar />
      <section className="w-full flex flex-col items-center gap-4 p-2 lg:p-6 2xl:w-[1129px] 2xl:py-10 2xl:px-0 2xl:mx-auto">
        <section className="w-full flex flex-col gap-10 lg:flex-row 2xl:justify-center">
          <AdImageCarousel />
            <AdDescription />
        </section>

        <section className="w-full flex flex-col justify-center items-center gap-5 lg:gap-10 lg:flex-row 2xl:px-0">
          <div className="lg:w-1/2 flex items-center gap-3 md:gap-5 lg:gap-[50px]">
            <SellerReviewCard />
            <button className="border rounded-full p-2 " onClick={handleFollow}>
              {isFollowing ? <UserCheck className="text-green-600" /> : <UserPlus />}
            </button>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-2 md:gap-8 justify-center 2xl:w-[520px]">
            <StartChattingBtn
              content="Chat with seller"
              bgColor="#ED640F"
              hoverColor="#ba5816"
              textColor="#FFFFFF"
              IsIcon={true}
              width="2xl:w-[243px]"
            />
            <StartChattingBtn
              content="Pay Now"
              amount={singleAd?.price}
              bgColor="#E6E6E6"
              hoverColor="#bab8b8"
              textColor="#0C0C0C"
              IsIcon={false}
              width="2xl:w-[178px]"
              disabled={role === "seller"} 
            />
          </div>
        </section>

        <section className="flex flex-col gap-4 lg:gap-10 2xl:px-24 lg:flex-row-reverse">
          <section className="lg:w-1/2 2xl:w-[497px]">
            <CustomMap
              lat={singleAd?.address?.location?.coordinates[0]}
              lng={singleAd?.address?.location?.coordinates[1]}
            />
            <div className="flex justify-between mt-3 lg:mt-6 gap-3">
              <span>AD ID {singleAd?._id?.slice(-11)}</span>
              <button
                className="uppercase text-[#ED640F]"
                onClick={() => setIsReportModalOpen(true)}
              >
                Report this ad
              </button>
            </div>
          </section>
          <div className="lg:w-1/2 2xl:w-[570px]">
            <Disclaimer />
          </div>
        </section>
      </section>

      <div className="mt-3 flex justify-center lg:justify-end lg:pr-8 xl:w-[1300px] 2xl:w-[1350px] 4xl:ml-[200px]">
        {role === "buyer" && <ReviewForm />}
      </div>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </>
  );
};

export default AdDetailsPage;
