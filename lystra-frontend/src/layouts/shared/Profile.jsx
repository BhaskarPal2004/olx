import { Rate } from "antd";
import user1 from "@/assets/profile/user.svg";
import CallTo from "@/components/landing/CallTo";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { useEffect, useState } from "react";
import ProfilePicture from "@/components/home/ProfilePicture";
import EditProfileModal from "@/components/profile/EditProfileModal";
import useGetUser from "@/hooks/user/useGetUser";
import { useSelector } from "react-redux";
import useGetAllFollow from "@/hooks/useGetAllFollower";
import useGetAllFollowing from "@/hooks/useGetAllFollowing";

const Profile = () => {
    const getUserData = useGetUser()
    const getFollowers = useGetAllFollow;
    const getFollowing = useGetAllFollowing;

    getFollowers();
    getFollowing();

    useEffect(() => {
        getUserData()
        //eslint-disable-next-line
    }, [])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewCount, setReviewCount] = useState(0)
    const [editProfileModalVisible, setEditProfileModalVisible] = useState(false)

    const { role, user } = useSelector(store => store.auth)
    const { reviewApi } = useAxiosInstance();
    const follow = useSelector((store) => store.user?.follower);
    const following = useSelector((store)=>store.user?.following)
    

    useEffect(() => {
        const getReviewCount = async () => {
            try {
                const response = await reviewApi.get('/getReview')
                if (response.success) {
                    setReviewCount(response.totalReviews)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        if (role === 'seller') { getReviewCount() }
        //eslint-disable-next-line
    }, [reviewCount])

    const rateSystem = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

    return (
        <>
            <div className="bg-white px-4 py-[30px] 2xl:py-[52px] border rounded-[10px] flex flex-col items-center gap-5 max-w-[570px] mx-auto md:gap-6">
                <div className="2xl:mb-3 flex flex-col justify-center items-center gap-3">
                    <ProfilePicture isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    <h3 className="font-archivo text-xl text-[#0C0C0C] font-semibold text-center">
                        {user?.name}
                    </h3>
                    {role === "seller" && (
                        <div className="flex gap-2">
                            <Rate tooltips={rateSystem} allowHalf disabled value={user?.averageRating} />
                            <span className="text-sm text-[#6C6C6C]">({reviewCount} Reviews)</span>
                        </div>
                    )}
                </div>

                <div className={`2xl:mb-4 ${role === 'buyer' ? '-mt-5' : 'mt-0'}`}>
                    <button>
                        <div className="flex gap-1">
                            <img src={user1} alt="dummyUser" />
                            <p className="text-sm text-[#6C6C6C] font-archivo m-0">
                                Following
                            </p>

                            <span className="text-sm font-bold text-[#ED640F] border-[#BABABA] border-e-[1px] pr-2">
                                ({following.length})
                            </span>
                        </div>
                    </button>
                    <button>
                        <div className="flex gap-1">
                            <img src={user1} alt="dummyUser" className="pl-2" />
                            <p className="text-sm text-[#6C6C6C] font-archivo m-0">
                                Followers
                            </p>
                            <span className="text-sm font-bold text-[#ED640F]">({follow.length})</span>
                        </div>
                    </button>
                </div>

                <section className="flex flex-col gap-5 bg-[#FBFBFB] border border-[#E2E2E2] rounded-[10px] p-4 2xl:mb-3 w-full max-w-2/3 md:max-w-[370px] overflow-x-auto">
                    <div className="">
                        <h4 className="font-archivo text-[#0C0C0C] font-semibold">
                            Contact No.
                        </h4>
                        <CallTo phone={user?.phoneNumber} />
                    </div>

                    <div className="">
                        <h4 className="font-archivo text-[#0C0C0C] font-semibold">
                            Address
                        </h4>
                        <p className="text-[#828282] text-sm font-archivo m-0 pr-[6px] overflow-x-auto whitespace-nowrap">
                            {user?.address ? (
                                [
                                    user.address.line1,
                                    user.address.line2,
                                    user.address.city,
                                ]
                                    .filter(Boolean)
                                    .join(', ')
                            ) : (
                                "No address added. Please add your address."
                            )}
                        </p>
                    </div>
                </section>
                <button onClick={() => { setEditProfileModalVisible(true) }}
                    className={`bg-[#ED640F] rounded-[10px] text-white hover:!bg-[#fd581c] hover:!text-[#FFFFFF] font-archivo text-sm font-semibold p-2 px-5 md:p-3 md:px-6 2xl:p-4 2xl:px-[54px] 2xl:mb-4`}
                >
                    Edit Profile
                </button>
            </div>
            {editProfileModalVisible && <EditProfileModal setEditProfileModalVisible={setEditProfileModalVisible} editProfileModalVisible={editProfileModalVisible} />}

        </>
    );
};

export default Profile;
