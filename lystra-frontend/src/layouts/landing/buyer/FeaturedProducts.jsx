import { useEffect, useState } from 'react';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import FeaturedProductCard from '@/components/landing/seller/featuredProducts/FeaturedProductCard';

const FeaturedProducts = () => {
  const [featuredAds, setFeaturedAds] = useState([]);
  const { adsApi } = useAxiosInstance();

  useEffect(() => {
    const fetchFeaturedAds = async () => {
      try {
        const response = await adsApi.get('/getFeaturedAds');
        if (response.success) {
          setFeaturedAds(response.ads);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchFeaturedAds();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="m-5 text-center">Featured Products</div>
      {featuredAds.length > 0 ? (
        <div className='w-full flex flex-wrap gap-2 gap-x-4 xl:gap-x-[30px] gap-y-[17px] mx-auto justify-center xl:w-[1170px] py-3'>
          {featuredAds.map((ad) => (
            <FeaturedProductCard key={ad._id} data={ad} />
          ))}
        </div>
      ) : (
        <div className="text-sm min-w-[100px] md:text-lg font-semibold text-gray-700">
          No featured ads available.
        </div>
      )}
    </>
  );
};

export default FeaturedProducts;
