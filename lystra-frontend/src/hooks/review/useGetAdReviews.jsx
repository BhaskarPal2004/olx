import useAxiosInstance from "@/hooks/useAxiosInstance";
import { setAdReviews } from "@/store/slices/reviewSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAdReviews = () => {
  const { reviewApi } = useAxiosInstance();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNewAds = async () => {
      try {
        const response = await reviewApi.get('/getReview');
        if (response.success) {
          dispatch(setAdReviews(response.data));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNewAds();
  }, [dispatch, reviewApi]);
};

export default useGetAdReviews;
