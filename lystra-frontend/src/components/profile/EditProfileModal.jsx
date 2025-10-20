import { Modal } from "antd";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import EditProfileAddressModal from "./EditProfileAddressModal";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import useGetUser from "@/hooks/user/useGetUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileValidation } from "@/validations/Ad/editProfileValidation";


const EditProfileModal = ({ setEditProfileModalVisible, editProfileModalVisible }) => {
    const [addressModalVisible, setAddressModalVisible] = useState(false)
    const [address, setAddress] = useState({})
    const getUserData = useGetUser()

    const { user } = useSelector(store => store.auth)

    const { userApi } = useAxiosInstance()
    const handleCancel = () => {
        setEditProfileModalVisible(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(editProfileValidation) });


    const onSubmission = async (data) => {
        if (address.line2 === "") { delete address.line1 }
        if (address.landMark === "") { delete address.landMark }
        if (data.name === "") { delete data.name }
        if (data.phoneNumber === "") { delete data.phoneNumber }
        if (Object.keys(address).length !== 0) { data.address = address }


        try {
            const response = await userApi.put('/updateProfile', data)
            if (response.success) {
                await getUserData()
                toast.success("Your profile is updated successfully!")
                handleCancel()
            }
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
    };


    return (
        <>
            <Modal
                title={
                    <div className="flex flex-col">
                        <h1 className="text-xl text-nowrap">Enter Profile Details</h1>
                        <div className="flex">
                            <h3 className="text-gray-500 text-nowrap">
                                (<span className="text-red-500">* </span>Leave fields empty to keep previously saved content)
                            </h3>
                        </div>
                    </div>
                }
                open={editProfileModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <form
                    onSubmit={handleSubmit(onSubmission)}
                    className="flex flex-col gap-3"

                >
                    <section>
                        <div className=" flex flex-wrap gap-3 justify-center items-center w-full">
                            <div className=" w-full md:w-[48.5%]">
                                <label htmlFor="name">Name</label>
                                <input
                                    defaultValue={user?.name}
                                    name="name"
                                    {...register("name")}
                                    placeholder="Enter name"
                                    className="border outline-none rounded-lg p-2 w-full "
                                />
                                <p className="text-red-600 font-semibold text-xs h-5 2xl:h-3 pt-1 pb-3 ps-1">
                                    {errors.name?.message}
                                </p>
                            </div>
                            <div className=" w-full md:w-[48.5%]">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    defaultValue={user?.phoneNumber}
                                    name="phoneNumber"
                                    {...register("phoneNumber")}
                                    placeholder="Enter phone number"
                                    className="border outline-none rounded-lg p-2 w-full "
                                />
                                <p className="text-red-600 font-semibold text-xs h-5 2xl:h-3 pt-1 pb-3 ps-1">
                                    {errors.phoneNumber?.message}
                                </p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <button
                            type="button"
                            className="flex justify-between items-center w-full border rounded-lg p-2"
                            onClick={() => setAddressModalVisible(true)}
                        >
                            <span className="text-[#B0B3B6]">Enter Address</span>
                            <MapPin color="#B0B3B6" />
                        </button>
                    </section>

                    <button
                        className="flex self-end justify-center p-3 rounded-md w-[150px] bg-[#ED640F] text-white hover:bg-[#cf7841]"
                    >
                        Submit
                    </button>
                </form>
            </Modal>
            {addressModalVisible && <EditProfileAddressModal address={address} setAddress={setAddress} visible={addressModalVisible} onClose={() => setAddressModalVisible(false)} />}
        </>
    )
}

export default EditProfileModal