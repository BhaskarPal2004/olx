import { AddressSchema } from "@/validations/Ad/addressValidation";
import { yupResolver } from "@hookform/resolvers/yup/src/yup";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";



const EditProfileAddressModal = ({
    visible,
    onClose,
    setAddress,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(AddressSchema) });

    const onSubmission = (data, e) => {
        setAddress(data);
        onClose();
        e.stopPropagation()
    };

    const { user } = useSelector(store => store.auth)
    return (
        <Modal
            title="Enter Address"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <form
                onSubmit={handleSubmit(onSubmission)}
                className="flex flex-col gap-3"
            >
                <div className=" flex flex-wrap gap-3 justify-center items-center w-full">
                    <div className=" w-full md:w-[48.5%]">
                        <label htmlFor="line1">Line 1</label>
                        <input
                            name="line1"
                            defaultValue={user?.address?.line1}
                            {...register("line1")}
                            placeholder="Enter line 1"
                            className="border outline-none rounded-lg p-2 w-full "
                        />
                        <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
                            {errors.line1?.message}
                        </p>
                    </div>

                    <div className="w-full md:w-[48.5%]">
                        <label htmlFor="line2">Line 2</label>
                        <input
                            name="line2"
                            defaultValue={user?.address?.line2}
                            {...register("line2")}
                            placeholder="Enter line 2"
                            className="border outline-none rounded-lg p-2 w-full "
                        />
                        <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
                            {errors.line2?.message}
                        </p>
                    </div>
                </div>

                <div className=" flex flex-wrap gap-3 justify-center items-center w-full">
                    <div className="w-full md:w-[48.5%]">
                        <label htmlFor="state">State</label>
                        <input
                            name="state"
                            defaultValue={user?.address?.state}
                            {...register("state")}
                            placeholder="Enter State"
                            className="border outline-none rounded-lg p-2 w-full"
                        />
                        <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
                            {errors.state?.message}
                        </p>
                    </div>

                    <div className="w-full md:w-[48.5%] ">
                        <label htmlFor="city">City</label>
                        <input
                            name="city"
                            defaultValue={user?.address?.city}
                            {...register("city")}
                            placeholder="Enter city"
                            className="border outline-none rounded-lg p-2 w-full"
                        />
                        <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
                            {errors.city?.message}
                        </p>
                    </div>
                </div>

                <div className=" flex flex-wrap gap-3 justify-center items-center w-full">
                    <div className="w-full md:w-[48.5%] ">
                        <label htmlFor="country">Country</label>
                        <input
                            name="country"
                            defaultValue={user?.address?.country}
                            {...register("country")}
                            placeholder="Enter country"
                            className="border outline-none rounded-lg p-2 w-full"
                        />
                        <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
                            {errors.country?.message}
                        </p>
                    </div>

                    <div className="w-full md:w-[48.5%]">
                        <label htmlFor="pinCode">PinCode</label>
                        <input
                            name="pinCode"
                            defaultValue={user?.address?.pinCode}
                            type="number"
                            {...register("pinCode")}
                            placeholder="Enter pinCode"
                            className="border outline-none rounded-lg p-2 w-full"
                        />
                        <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
                            {errors.pinCode?.message}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 w-full ">
                    <label htmlFor="landMark">LandMark</label>
                    <input
                        name="landMark"
                        defaultValue={user?.address?.landMark}
                        {...register("landMark")}
                        placeholder="Enter landMark"
                        className="border outline-none rounded-lg p-2 w-full"
                    />
                    <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
                        {errors.landMark?.message}
                    </p>
                </div>

                <button className="flex self-end justify-center p-3 rounded-md w-[150px]  bg-[#ED640F]  text-white hover:bg-[#cf7841]">
                    Save Address
                </button>

            </form>
        </Modal>
    )
}

export default EditProfileAddressModal