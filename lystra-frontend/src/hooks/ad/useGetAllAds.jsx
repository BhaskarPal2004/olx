import useAxiosInstance from "../useAxiosInstance";

const useGetAllAds = () => {
    const { adsApi } = useAxiosInstance();

    const getAllAds = async (pageNum, sortBy, sortOrder, searchKeyword, searchCategory, minPrice, maxPrice, city, condition,lat,lng) => {
        try {
            const res = await adsApi.get(`/getAllAds`, {
                params: { pageNum, sortBy, sortOrder, searchKeyword, searchCategory, minPrice, maxPrice, city, condition,lat,lng},
            });
            if (res.success) {
                return {
                    ads: res.ads,
                    isLastPage: res.isLastPage
                };
            }
        } catch (error) {
            console.log(error);
        }
        return { ads: [], isLastPage: true };
    };

    return getAllAds;
};

export default useGetAllAds;