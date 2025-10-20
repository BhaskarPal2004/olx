import { useState, useEffect } from "react";
import { Rate } from "antd";
import Heart from "react-heart";
import dummyImg from "@/assets/profile/user.svg";
import ReplyModal from "./ReplyModal";
import RepliesModal from "./ShowRepliesModal";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import toast from "react-hot-toast";
import useGetAdReviews from "@/hooks/review/useGetAdReviews";
import { useSelector } from "react-redux";

const ReviewCard = ({ review }) => {
  const reviews = useGetAdReviews();
  const { _id: userId } = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const [active, setActive] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [replies, setReplies] = useState([]);
  const [likeTrigger, setLikeTrigger] = useState(false);
  const { reviewApi } = useAxiosInstance();
  const {profilePicture,name} = useSelector((state) => state.auth.user);

  const imageSrc = review.buyerId?.profilePicture || review.sellerId?.profilePicture || dummyImg;
  const sellerImg = review.sellerId?.profilePicture || profilePicture;
  const sellerName = review.sellerId?.name || name;

  useEffect(() => {
    if (review.likes && userId) {
      setActive(review.likes.includes(userId));
    }
  }, [review.likes, userId]);

  useEffect(() => {
    const handleLikeToggle = async () => {
      try {
        setActive((prev) => !prev);
        const response = await reviewApi.post(`/handleReviewLikes/${review._id}`);
        if (response.success) {
          toast.success(response.message);
        }
      } catch (error) {
        console.error("Failed to update like status", error);
        toast.error(error?.response?.data?.message || "Something went wrong");
        setActive((prev) => !prev);
      } finally {
        setLikeTrigger(false);
      }
    };

    if (likeTrigger) {
      handleLikeToggle();
    }
  }, [likeTrigger, review._id, reviewApi, reviews]);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const { data } = await reviewApi.get(`/getAllReply/${review._id}`);
        
        setReplies(data || []);
      } catch (error) {
        console.error("Error fetching replies", error);
        setReplies([]);
      }
    };

    if (isRepliesOpen) {
      fetchReplies();
    }
  }, [isRepliesOpen, review._id, reviewApi]);

  return (
    <>
      <div className="p-4 flex w-full flex-wrap md:gap-x-6 lg:gap-x-[150px] xl:gap-x-[270px] bg-white">
        <div className="flex gap-4 w-full md:w-[200px] items-center md:items-start">
          <img src={imageSrc} alt="person" className="w-[63px] border rounded-full max-h-[65px]" />
          <div className="mt-2">
            <h3 className="text-[#0C0C0C] text-center font-medium">
              {review.buyerId?.name || review.sellerId?.name}
            </h3>
            <a href={`tel:${review.buyerId?.phoneNumber}`} className="text-[14px] text-[#828282]">
              {review.buyerId?.phoneNumber}
            </a>
          </div>
        </div>

        <div>
          <div className="flex gap-[9px] items-center mt-3">
            <Rate disabled allowHalf defaultValue={review.productRating} />
            <span className="text-[12px] text-[#6C6C6C]">
              {new Date(review.createdAt).toLocaleDateString("en-GB")}
            </span>
          </div>

          <p className="text-[#0C0C0C] text-sm font-medium mt-3 md:mt-6 lg:mt-[27px]">
            {review.feedbackTitle}
          </p>
          <p className="text-[#828282] text-sm md:w-[500px] xl:w-[606px] max-w-[606px] overflow-x-auto text-wrap no-scrollbar">
            {review.feedbackComment}
          </p>

          {role === "seller" && (
            <div className="flex gap-4 mt-5 flex-wrap">
              <button
                onClick={() => setIsReplyOpen(true)}
                className="border rounded-[7px] text-[#0C0C0C] text-sm font-semibold bg-[#E6E6E6] py-2 px-4 md:px-6"
              >
                Reply
              </button>
              <button
                onClick={() => setIsRepliesOpen(true)}
                className="border rounded-[7px] text-[#0C0C0C] text-sm font-semibold bg-[#F5F5F5] py-2 px-4"
              >
                Show Replies
              </button>
              <div
                onClick={() => setLikeTrigger(true)}
                className="p-[10px] border border-[#D3D3D3] w-fit h-fit rounded-[7px] cursor-pointer"
              >
                <Heart isActive={active} className="w-[20px]" />
              </div>
            </div>
          )}

          {role === "buyer" && (
              <button
                onClick={() => setIsRepliesOpen(true)}
                className=" mt-5 border rounded-[7px] text-[#0C0C0C] text-sm font-semibold bg-[#F5F5F5] py-2 px-4"
              >
                Show Replies
              </button>
          )}
          
        </div>
        <hr className="w-[98%] mt-5 md:mt-[35px] text-center" />
      </div>

      <ReplyModal
        isOpen={isReplyOpen}
        onClose={() => setIsReplyOpen(false)}
        reviewId={review._id}
      />

      <RepliesModal
        isOpen={isRepliesOpen}
        onClose={() => setIsRepliesOpen(false)}
        replies={replies}
        sellerImg ={sellerImg}
        sellerName = {sellerName}

      />
    </>
  );
};

export default ReviewCard;
