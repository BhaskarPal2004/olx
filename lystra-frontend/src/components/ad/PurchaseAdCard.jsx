import useAxiosInstance from "@/hooks/useAxiosInstance";
import daysAgoFunction from "@/utils/daysAgoFunction";
import { ArrowDownToLine } from "lucide-react";

const PurchaseAdCard = ({ order }) => {
  const { orderApiRaw } = useAxiosInstance();
  const { adId, amount, updatedAt, _id: orderId } = order;

  const imageUrl = adId?.files?.[0]?.fileUrl;
  const adTitle = adId?.name || "Untitled Ad";
  const formattedDate = daysAgoFunction(updatedAt);

  const downloadInvoice = async () => {
    try {
      const response = await orderApiRaw.get(`/invoice/${orderId}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice_${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error in downloading invoice:", error);
    }
  };

  return (
    <div className="w-[270px] mx-auto border border-[#EAEAEA] rounded-[10px] bg-white">
      <img
        src={imageUrl}
        alt={adTitle}
        className="w-[270px] h-[174px] rounded-t-[10px]"
      />

      <div className=" pt-2 px-5">
        <div className="flex justify-between mt-[12px] items-baseline">
          <h2 className="text-[20px] font-semibold">₹{amount}.00</h2>
          <span className="text-[12px] text-[#6C6C6C] text-end">
            {formattedDate}
          </span>
        </div>
        <p className="text-[#6C6C6C]  w-full text-nowrap  overflow-hidden text-ellipsis">
          {adTitle}
        </p>
      </div>

      <hr className=" bg-black" />
      <div className="flex justify-between p-2 items-center px-5">
        <div className="text-[#199753] font-medium">Download Invoice</div>
        <button
          className="p-1 bg-[#DDEFE5] flex  items-center border rounded-md"
          onClick={downloadInvoice}
        >
          <ArrowDownToLine color="#199753" width={21} height={21} />
        </button>
      </div>
    </div>
  );
};

export default PurchaseAdCard;
