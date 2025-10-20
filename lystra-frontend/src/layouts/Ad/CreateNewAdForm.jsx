import UploadAdFileInput from "@/components/ad/UploadAdFileInput";
import { MapPin } from "lucide-react";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AddressFormModal from "@/components/ad/AddressFormModal";
import AdCategoryInputDropdown from "@/components/ad/AdCategoryInputDropdown";
import { Select, Spin } from "antd";
import ProductDetailModal from "@/components/ad/ProductDetailModal";
import { yupResolver } from "@hookform/resolvers/yup/src/yup";
import { CreateAdSchema } from "@/validations/Ad/createAdValidation";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/slices/adSlice";
import { setAdCreateModalVisible } from "@/store/slices/modalSlice";

const CreateNewAdForm = () => {
  const { loading } = useSelector((store) => store.ad);
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateAdSchema),
    defaultValues: {
      files: [null, null, null, null],
    },
  });

  const [details, setDetails] = useState({});
  const [address, setAddress] = useState({});
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const addressInputRef = useRef(null);
  const detailsInputRef = useRef(null);

  const fileLists = watch("files");

  const { adsApi } = useAxiosInstance();

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      if (address.line2 === "") {
        delete address.line2;
      }
      if (address.landMark === "") {
        delete address.landMark;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("condition", data.condition.toLowerCase());
      formData.append("details", JSON.stringify(details));
      formData.append("description", data.description);
      formData.append("address", JSON.stringify(address));

      data.files?.forEach((fileObj) => {
        if (fileObj?.originFileObj) {
          formData.append("adFiles", fileObj.originFileObj);
        }
      });


      const res = await adsApi.post("/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.success) {
        toast.success(res.message);
        reset();
        addressInputRef?.current?.reset();
        detailsInputRef?.current?.reset();
        setDetails({});
        setAddress({});
        dispatch(setAdCreateModalVisible(false));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-2 flex-col justify-evenly"
      >
        <section>
          <div className="flex flex-wrap justify-center items-center gap-x-3">
            {fileLists.map((file, index) => (
              <UploadAdFileInput
                key={index}
                fileList={file ? [file] : []}
                setFileList={(newList) => {
                  const newFiles = [...fileLists];
                  newFiles[index] = newList[0] || null;
                  setValue("files", newFiles, { shouldValidate: true });
                }}
              />
            ))}
          </div>
          <h2 className="text-center mt-[-10px]">
            *Only JPEG (JPG) and PNG image formats are allowed
          </h2>

          <p className="text-red-600 text-xs font-semibold h-5 pt-1 ps-1 md:text-center">
            {errors.files?.message}
          </p>
        </section>

        <section className="flex flex-wrap items-center">
          <div className="flex flex-wrap gap-3 justify-center items-center w-full">
            <div className="md:w-[48.5%]">
              <label>Product Title</label>
              <input
                className="border outline-none p-2 rounded-md w-full"
                placeholder="Enter product title"
                {...register("name")}
              />
              <p className="text-red-600 text-xs font-semibold h-5 pt-1 ps-1">
                {errors.name?.message}
              </p>
            </div>

            <div className="md:w-[48.5%]">
              <label>Product Price</label>
              <input
                type="number"
                className="border outline-none p-2 rounded-md w-full"
                placeholder="Enter product price"
                {...register("price")}
              />
              <p className="text-red-600 text-xs font-semibold h-5 pt-1 ps-1">
                {errors.price?.message}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center w-full">
            <div className="md:w-[48.5%]">
              <label>Select product category</label>
              <AdCategoryInputDropdown control={control} errors={errors} />
            </div>
            <div className="w-full md:w-[48.5%]">
              <label>Seller Address</label>
              <button
                type="button"
                className="flex justify-between items-center w-full border rounded-lg p-2"
                onClick={() => setAddressModalVisible(true)}
              >
                <span className="text-[#B0B3B6] overflow-hidden text-start text-nowrap w-[90%]">
                  {address.line1 || "Enter Address"}
                </span>
                <MapPin color="#B0B3B6" />
              </button>
              <p className="text-red-600 text-xs font-semibold h-5 pt-1 ps-1"></p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center w-full">
            <div className="w-full md:w-[48.5%]">
              <label htmlFor="condition">Condition</label>
              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-full h-[40px]"
                    placeholder="Select a condition"
                    optionFilterProp="label"
                    options={[
                      { value: "Used", label: "Used" },
                      { value: "New", label: "New" },
                      { value: "Refurbished", label: "Refurbished" },
                    ]}
                  />
                )}
              />
              <p className="text-red-600 text-xs font-semibold h-5 pt-1 ps-1">
                {errors.condition?.message}
              </p>
            </div>
            <div className="w-full md:w-[48.5%]">
              <label>Product Details</label>
              <button
                type="button"
                className="flex justify-between items-center w-full border rounded-lg p-2"
                onClick={() => setDetailModalVisible(true)}
              >
                <span className="text-[#B0B3B6] text-nowrap overflow-hidden">
                  {Object.keys(details).length > 0
                    ? Object.entries(details)
                        .map(
                          ([key, value]) =>
                            `${
                              key.charAt(0).toUpperCase() + key.slice(1)
                            }: ${value}`
                        )
                        .join(", ")
                    : "Enter Details"}
                </span>
              </button>
              <p className="text-red-600 text-xs font-semibold h-5 pt-1 ps-1"></p>
            </div>
          </div>
        </section>

        <section>
          <label>Description</label>
          <textarea
            {...register("description")}
            placeholder="Enter product description"
            className="border-2 outline-none p-2 rounded-md w-full"
            rows="5"
          />
          <p className="text-red-600 text-xs font-semibold h-5 pt-1 ps-1">
            {errors.description?.message}
          </p>
        </section>

        <button
          className="flex self-end justify-center p-3 rounded-md w-[150px] bg-[#ED640F] text-white hover:bg-[#cf7841]"
          type="submit"
        >
          {loading ? <Spin /> : <span>Publish</span>}
        </button>
      </form>

      <AddressFormModal
        addressData={address}
        setAddressData={setAddress}
        visible={addressModalVisible}
        addressInputRef={addressInputRef}
        onClose={() => setAddressModalVisible(false)}
      />

      <ProductDetailModal
        visible={detailModalVisible}
        detailData={details}
        setDetailData={setDetails}
        detailsInputRef={detailsInputRef}
        onClose={() => setDetailModalVisible(false)}
      />
    </div>
  );
};

export default CreateNewAdForm;
