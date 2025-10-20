import { Button } from "antd";
import chatIcon from "@/assets/ShowAnAd/chatIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentReceiver, setReceiverId } from "@/store/slices/chatSlice";
import axios from "axios";
import logo from "@/assets/navbar/logo.svg";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { toast } from "react-hot-toast";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function StartChattingBtn({
  content,
  bgColor,
  hoverColor,
  textColor,
  IsIcon,
  width,
  amount,
  disabled = false,
}) {
  const { singleAd } = useSelector((store) => store.ad);
  const { paymentApi } = useAxiosInstance();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("Logo URL: ", logo);

  const handleChat = () => {
    dispatch(setReceiverId(singleAd?.sellerId?._id));
    dispatch(setCurrentReceiver(singleAd?.sellerId));
    navigate(`/chat`);
  };

  const handlePayment = async () => {
    if (disabled) return;

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay failed to load!");
      return;
    }

    try {
      const { data: { key } } = await axios.get("http://localhost:3000/api/payment/getKey");

      const response = await paymentApi.post(`/paymentCheckout/${singleAd._id}`, { amount });

      const publicLogoUrl =
        "https://raw.githubusercontent.com/aayush-itobuz/Lystra/refs/heads/main/logo.svg";

      const options = {
        key,
        amount: response.data.amount,
        currency: "INR",
        name: "Lystra",
        description: "Test Transaction",
        image: publicLogoUrl,
        order_id: response.data.id,
        callback_url: "http://localhost:3000/api/payment/paymentVerification",
        notes: { address: "Razorpay Corporate Office" },
        theme: { color: "orange" },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", async (response) => {
        await axios.post(
          `http://localhost:3000/api/payment/update/failed/payment/${response.error.metadata.order_id}/${response.error.metadata.payment_id}`
        );
      });

      paymentObject.open();
    } catch (error) {
      const errMsg = error.response?.data?.message || "Payment initiation failed";
      toast.error(errMsg);
      if (errMsg.toLowerCase().includes("address")) {
        navigate("/profile");
      }
    }
  };

  const isChat = content === "Chat with seller";

  return (
    <Button
      type="primary"
      icon={IsIcon ? <img src={chatIcon} alt="" /> : null}
      className={`rounded-[10px] font-archivo text-[12px] md:text-base p-5 2xl:py-6 ${width} ${disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : `bg-[${bgColor}] text-[${textColor}] hover:!bg-[${hoverColor}] hover:!text-[#FFFFFF]`
        }`}
      onClick={isChat ? handleChat : handlePayment}
      disabled={disabled}
    >
      {content}
    </Button>
  );
}
