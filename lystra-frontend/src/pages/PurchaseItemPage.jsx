import PurchaseAdCard from "@/components/ad/PurchaseAdCard";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import AuthNavbar from "@/layouts/shared/AuthNavbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PurchaseItemPage = () => {
  const [purchaseData, setPurchaseData] = useState([]);
  const { buyerApi } = useAxiosInstance();
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const res = await buyerApi.get("/orders");
        setPurchaseData(res.data);
      } catch (error) {
        console.error("Error in fetching data:", error);
      }
    };

    fetchPurchaseData();
  }, [buyerApi]);


  return (
    <section className="bg-[#f7f7f7] h-[100vh]">
      <AuthNavbar />
      <section className="max-w-[1170px] flex flex-col items-start mx-auto">
        <h3 className="text-[#0C0C0C] pt-10 pb-[13px] lg:ps-0 font-medium text-center lg:text-start  mx-auto 2xl:mx-0 text-lg ">
          {role === "buyer" ? "Purchased Items" : "Sold Items"}
        </h3>
        <div className="flex flex-wrap gap-x-[30px] gap-y-[22px] mx-auto md:w-[600px] lg:w-[900px] xl:w-[1170px] max-h-[calc(100vh-200px)] overflow-scroll no-scrollbar">
          {purchaseData.length > 0 ? (
            purchaseData.map((order) => (
              <PurchaseAdCard key={order._id} order={order} />
            ))
          ) : (
            <p className="text-gray-500">
              {role === "buyer"
                ? "No purchased items found."
                : "No Sold Items found."}
            </p>
          )}
        </div>
      </section>
    </section>
  );
};

export default PurchaseItemPage;
