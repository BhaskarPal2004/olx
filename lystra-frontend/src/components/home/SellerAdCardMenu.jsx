import { useState } from "react";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { setSingleAd, setSingleAdId } from "@/store/slices/adSlice";
import {
  setAdCreateModalVisible,
  setHandleToggleForm,
} from "@/store/slices/modalSlice";
import { Dropdown, Popconfirm } from "antd";
import { Ellipsis } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BoostAdModal from "../ad/BoostAdModal";

const SellerAdCardMenu = ({ ad }) => {
  const { adsApi } = useAxiosInstance();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [boostModalVisible, setBoostModalVisible] = useState(false);

  const handleEdit = () => {
    dispatch(setAdCreateModalVisible(true));
    dispatch(setHandleToggleForm(true));
    dispatch(setSingleAdId(ad?._id));
    dispatch(setSingleAd(ad));
  };

  const confirmDelete = async () => {
    try {
      const res = await adsApi.delete(`/deleteAd/${ad?._id}`);
      if (res?.success) {
        toast.success(res.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleBoostAd = () => {
    setBoostModalVisible(true);
  };

  const handleFeature = async () => {
    try {
      const res = await adsApi.post(`/featured/${ad?._id}`);
      if (res?.success) {
        toast.success(res.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleRenew = async () => {
    try {
      const res = await adsApi.put(`/renewAd/${ad?._id}`);
      if (res?.success) {
        toast.success(res.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleRemoveFeature = async () => {
    try {
      const res = await adsApi.delete(`/removeFeature/${ad?._id}`);
      if (res?.success) {
        toast.success(res.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const items = [
    {
      label: (
        <button className="w-full h-full text-start" onClick={handleEdit}>
          Edit
        </button>
      ),
      key: "0",
    },
    { type: "divider" },
    {
      key: "1",
      danger: true,
      label: (
        <Popconfirm
          title="Delete the ad"
          description="Are you sure you want to delete this ad?"
          onConfirm={confirmDelete}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <span
            className="w-full h-full text-start inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            Delete
          </span>
        </Popconfirm>
      ),
    },
    { type: "divider" },
    {
      label: (
        <button className="w-full h-full text-start" onClick={handleBoostAd}>
          Boost AD
        </button>
      ),
      key: "2",
    },
    { type: "divider" },
    {
      key: "3",
      label: ad.isFeatured ? (
        <Popconfirm
          title="Remove Feature the ad"
          description="Are you sure you want to remove feature from this ad?"
          onConfirm={handleRemoveFeature}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <span
            className="w-full h-full text-start inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            Remove Feature
          </span>
        </Popconfirm>
      ) : (
        <Popconfirm
          title="Feature the ad"
          description="Are you sure you want to feature this ad?"
          onConfirm={handleFeature}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <span
            className="w-full h-full text-start inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            Feature
          </span>
        </Popconfirm>
      ),
    },
    { type: "divider" },
    {
      label: (
        <button
          className="w-full h-full text-start"
          onClick={() => navigate(`/ad/performance/${ad?._id}`)}
        >
          Ad Performance
        </button>
      ),
      key: "4",
    },

    { type: "divider" },
    {
      label: ad.isExpire ? (
        <button className="w-full h-full text-start" onClick={handleRenew}>
          Renew
        </button>
      ) : (
        <button
          className="w-full h-full text-gray-400 text-start cursor-not-allowed"
          disabled
        >
          Renew
        </button>
      ),
      key: "5",
    },
  ];

  return (
    <div className="cursor-pointer hover:scale-105">
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
        <Ellipsis color="#A0A4A8" />
      </Dropdown>

      {/* Boost Modal */}
      <BoostAdModal
        visible={boostModalVisible}
        onClose={() => setBoostModalVisible(false)}
        adId={ad?._id}
      />
    </div>
  );
};

export default SellerAdCardMenu;
