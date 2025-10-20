import { useEffect, useState } from "react";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import AdCard from "@/components/landing/buyer/newAds/AdCard";

const NewAds = () => {

    const [newAds, setNewAds] = useState([]);
    const { adsApi } = useAxiosInstance();

    useEffect(() => {
        const fetchNewAds = async () => {
            try {
                const response = await adsApi.get('/getNewAds');
                if (response.success) {
                    setNewAds(response.ads);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchNewAds();

        //eslint-disable-next-line
    }, [setNewAds]);
    return (
        <>
            <div className="m-5 text-center">New Ads (Recently Posted)</div>
            {newAds.length > 0 ? (
                <div className="flex flex-wrap px-10 s:px-5 lg:px-10 xl:px-0 xl:w-[1170px] mx-auto gap-5 2xl:gap-4 4xl:gap-x-[30px] 4xl:gap-y-[26px] mb-5">
                    {
                        newAds.map((data) => {
                            return <AdCard key={data._id} data={data}/>
                        })
                    }
                </div>
            ) : (
                <div className="text-sm min-w-[100px] md:text-lg font-semibold text-gray-700">
                    No ads exist
                </div>
            )}
        </>
    );
};

export default NewAds;