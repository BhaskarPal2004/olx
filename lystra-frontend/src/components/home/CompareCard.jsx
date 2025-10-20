import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCompareAd } from "@/store/slices/adSlice";
import CompareCardAd from "./CompareCardAd";
import { Modal, Table, Spin, message } from "antd";
import dayjs from "dayjs";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import toast from "react-hot-toast";

const CompareCard = ({ compareAd }) => {
    const dispatch = useDispatch();
    const { adsApi } = useAxiosInstance();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [compareData, setCompareData] = useState([]);
    const [loading, setLoading] = useState(false);

    if (!compareAd || compareAd.length === 0) return null;

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Details", dataIndex: "details", key: "details" },
        { title: "Summary", dataIndex: "summary", key: "summary" },
        { title: "Price", dataIndex: "price", key: "price" },
        { title: "Condition", dataIndex: "condition", key: "condition" },
        { title: "Seller", dataIndex: "seller", key: "seller" },
        { title: "Listed On", dataIndex: "listedOn", key: "listedOn" },
        { title: "Seller Avg. Rating", dataIndex: "sellerAverageRating", key: "sellerAverageRating" },
        { title: "Product Avg. Rating", dataIndex: "productAverageRating", key: "productAverageRating" },
    ];

    const fetchCompareData = async () => {
        try {
            setLoading(true);
            const ids = compareAd.map((item) => item._id).join(',');
            const response = await adsApi.get(`/compareAds/${ids}`);            

            if (response.success) {
                setCompareData(response.data);
                setIsModalOpen(true);
            } else {
                toast.error(response.message );
            }

        } catch (error) {
            console.error("Error fetching compare data:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
            message.error("An error occurred while comparing ads.");
        } finally {
            setLoading(false);
        }
    };

    const handleCompareClick = () => {
        fetchCompareData();
    };

    const dataSource = compareData.map((ad) => ({
        key: ad._id,
        name: ad.name,
        category: ad.category,
        details: Object.entries(ad.details || {})
            .map(([key, value]) => `${key}: ${value}`)
            .join(", "), 
        summary: ad.summary,
        price: ad.price,
        condition: ad.condition,
        seller: ad.seller,
        listedOn: dayjs(ad.listedOn).format("YYYY-MM-DD"),
        sellerAverageRating: ad.sellerAverageRating,
        productAverageRating: ad.productAverageRating,
    }));

    return (
        <div>
            <div className="w-[282px] border rounded-lg shadow-sm font-archivo max-h-[350px] overflow-scroll no-scrollbar">
                {compareAd.map((item) => (
                    <CompareCardAd key={item._id} data={item} />
                ))}
            </div>
            <div className="w-[282px] flex justify-between mt-3 items-center">
                <button
                    onClick={() => dispatch(setCompareAd([]))}
                    className="p-4 bg-[#E6E6E6] w-[135px] rounded-xl"
                >
                    Remove
                </button>
                <button
                    onClick={handleCompareClick}
                    className="p-3 bg-[#ED640F] w-[135px] rounded-xl flex justify-center items-center gap-2"
                >
                    <div className="p-3 bg-white rounded-full w-[20px] h-[20px] text-[#ED640F] flex justify-center items-center">
                        {compareAd.length}
                    </div>
                    <div className="text-white">Compare</div>
                </button>
            </div>

            <Modal
                title="Compare Ads"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width="90%"
                style={{ top: 30 }}
            >
                <div className="overflow-auto">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            scroll={{ x: 1500 }}
                            pagination={false}
                            bordered
                        />
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default CompareCard;
