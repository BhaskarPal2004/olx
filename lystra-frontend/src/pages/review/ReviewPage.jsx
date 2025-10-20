import Reviews from "@/layouts/reviews/Reviews";
import AuthNavbar from "@/layouts/shared/AuthNavbar";

const ReviewPage = () => {
  return (
    <div>
      <AuthNavbar />
      <section className="max-w-[1170px] flex flex-col items-start mx-auto">
        <h3 className="text-[#0C0C0C] p-4 lg:ps-0 font-medium text-center lg:text-start  mx-auto 2xl:mx-0 text-lg">
          Reviews
        </h3>
        <section className="flex flex-col items-center  pb-[51px] mx-auto">
          <Reviews />
        </section>
      </section>
    </div>
  );
};

export default ReviewPage;
