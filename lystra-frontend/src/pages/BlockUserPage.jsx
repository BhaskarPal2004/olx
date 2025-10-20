import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import AuthNavbar from "@/layouts/shared/AuthNavbar";
import useGetBlockedUser from "@/hooks/useGetBlockedUser";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import dummyImg from "@/assets/profile/user.svg";
import { useDispatch } from "react-redux";
import { setBlock } from "@/store/slices/blockAndReportSlice";

const BlockUserPage = () => {
    const { userApi } = useAxiosInstance();
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const dispatch = useDispatch()
    

    useGetBlockedUser(refreshTrigger);
    const { blockUser } = useSelector((store) => store.blockUser);

    const handleUnblock = async (id) => {
        try {
            const response = await userApi.post(`/unblockUser/${id}`);
            if (response.success) {
                toast.success(response.message);
                dispatch(setBlock(false))
                setRefreshTrigger(prev => prev + 1); 
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <AuthNavbar />
            <section className="px-2 xs:px-5 xs:w-[400px] md:w-[500px] lg:w-[700px] 2xl:w-[1000px] mx-auto">
                <h3 className="py-5">Blocked Users</h3>

                {blockUser.length === 0 ? (
                    <div className="flex justify-center items-center mt-[40vh] text-gray-500">
                        No blocked users found.
                    </div>
                ) : (
                    <section className="flex flex-col gap-y-4 max-h-[calc(100vh-180px)] overflow-y-auto no-scrollbar">
                        {blockUser.map((user) => {
                            const imageSrc =
                                user.profilePicture.length >0
                                    ? user.profilePicture
                                    : dummyImg;
                            return (
                                <div
                                    key={user._id}
                                    className="w-full flex justify-between border rounded-md p-2 lg:p-4"
                                >
                                    <div className="flex gap-2 xs:gap-3 lg:gap-5 items-center">
                                        <img
                                            src={imageSrc}
                                            alt="profile"
                                            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] 2xl:w-[60px] 2xl:h-[60px] rounded-full object-cover"
                                        />
                                        <div className="text-[13px] xs:text-[14px] md:text-[16px]">
                                            <p>{user.name}</p>
                                            <p className="text-gray-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleUnblock(user._id)}
                                        className="border rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 xs:px-4 md:px-6 text-[13px] md:text-[16px] cursor-pointer"
                                    >
                                        Unblock
                                    </button>
                                </div>
                            );
                        })}
                    </section>
                )}
            </section>
        </div>
    );
};

export default BlockUserPage;
