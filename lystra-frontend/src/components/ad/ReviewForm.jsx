import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Rate, Button } from "antd";
import ReviewSchema from "@/validations/review/ReviewSchemaValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import useAxiosInstance from "@/hooks/useAxiosInstance";

const ReviewForm = () => {
  const singleAdId = useSelector((store) => store.ad.singleAdId);
  const { reviewApi } = useAxiosInstance();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ReviewSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (data.feedbackTitle === "") {
        delete data.feedbackTitle;
      }
      if (data.feedbackComment === "") {
        delete data.feedbackComment;
      }

      const res = await reviewApi.post(`/create/${singleAdId}`, data);

      if (res?.success) {
        toast.success(res.message);
        reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 w-[90vw] md:w-[50vw] lg:w-[450px] xl:w-[497px] pb-5"
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-gray-800 font-medium ">Rate Product</p>
          <Rate
            value={watch("productRating")}
            onChange={(value) =>
              setValue("productRating", value, { shouldValidate: true })
            }
          />
          <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
            {errors.productRating?.message}
          </p>
        </div>

        <div>
          <p className="text-gray-800 font-medium">Rate Seller</p>
          <Rate
            value={watch("sellerRating")}
            onChange={(value) =>
              setValue("sellerRating", value, { shouldValidate: true })
            }
          />
          <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
            {errors.sellerRating?.message}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-normal text-[16px] ">
          Subject
        </label>
        <input
          type="text"
          {...register("feedbackTitle")}
          placeholder="Enter feedback title"
          className="p-4 mt-3 w-full  border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
          {errors.feedbackTitle?.message}
        </p>
      </div>

      <div>
        <label className="block text-gray-700 font-normal text-[16px] ">
          Write your comment
        </label>
        <textarea
          {...register("feedbackComment")}
          placeholder="Write comment"
          className=" mt-3 w-full p-4 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
        ></textarea>
        <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
          {errors.feedbackComment?.message}
        </p>
      </div>

      <div className="flex justify-end ">
        <Button
          type="primary"
          htmlType="submit"
          className="bg-[#ED640F] rounded-[7.6px] text-white hover:!bg-[#fd581c] hover:!text-white font-archivo text-sm font-semibold px-10 py-5  "
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
