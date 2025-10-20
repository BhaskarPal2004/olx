import { useState } from "react";
import { Modal } from "antd";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { toast } from "react-hot-toast";
import axios from "axios";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const BoostAdModal = ({ visible, onClose, adId }) => {
  const options = [
    { days: 7, price: 250 },
    { days: 30, price: 700 },
    { days: 90, price: 1800 },
  ];

  const [selected, setSelected] = useState(options[0]);
  const { paymentApi } = useAxiosInstance();

  const handleBoostPayment = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    try {
      // Get Razorpay key
      const {
        data: { key },
      } = await axios.get("http://localhost:3000/api/payment/getKey");

      // Create Razorpay order
      const {
        data: { id, amount },
      } = await paymentApi.post(`/boost/ad/payment/checkout/${adId}`, {
        days: selected.days,
        amount: selected.price,
      });

      const options = {
        key,
        amount,
        currency: "INR",
        name: "Lystra",
        description: `Boost Ad for ${selected.days} days`,
        image:
          "https://raw.githubusercontent.com/aayush-itobuz/Lystra/refs/heads/main/logo.svg",
        order_id: id,
        callback_url: `http://localhost:3000/api/payment/boost/ad/payment/verification/${adId}/${selected.price}/${selected.days}`,
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
      const errMsg =
        error.response?.data?.message || "Payment initiation failed";
      toast.error(errMsg);
    }
  };

  const handleSubmit = () => {
    handleBoostPayment();
    onClose();
  };

  return (
    <Modal
      title="Boost AD"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div className="grid grid-cols-3 gap-3 mb-6 mt-4">
        {options.map((option) => (
          <div
            key={option.days}
            onClick={() => setSelected(option)}
            className={`border rounded-xl p-4 cursor-pointer text-center ${
              selected.days === option.days
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <p className="font-medium">{option.days} Days</p>
            <p className="mt-2 font-semibold">₹{option.price}.00</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md"
        >
          Make Payment
        </button>
      </div>
    </Modal>
  );
};

export default BoostAdModal;
