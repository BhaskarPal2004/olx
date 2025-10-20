import ReviewCard from "@/components/review/ReviewCard";
import useGetAdReviews from "@/hooks/review/useGetAdReviews";
import { useSelector } from "react-redux";

const Reviews = () => {
  useGetAdReviews();

  const { adReviews } = useSelector((store) => store.review);

  return (
    <section className="max-h-[70vh] overflow-scroll no-scrollbar bg-white rounded-lg lg:w-[900px] xl:w-[1170px] mx-auto pt-3 flex flex-col items-center">
      <section>
        {adReviews.map((review) => {
          return <ReviewCard review={review} key={review._id} />;
        })}
      </section>
    </section>
  );
};

export default Reviews;
