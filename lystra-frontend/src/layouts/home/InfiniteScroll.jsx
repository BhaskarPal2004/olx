import { useEffect, useRef, useState } from "react";
import { List, Skeleton, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useGetAllAds from "@/hooks/ad/useGetAllAds";
import {
  incrementPageNum,
  resetPageNum,
} from "@/store/slices/adSlice";
import BuyerAdCard from "@/components/home/BuyerAdCard";
import SellerAdCard from "@/components/home/SellerAdCard";


const PLACEHOLDER_COUNT = 3;

const InfiniteScroll = () => {
  const dispatch = useDispatch();
  const getAllAds = useGetAllAds();

  const { role } = useSelector((store) => store.auth);

  const { pageNum, sortBy, sortOrder, searchKeyword, searchCategory, priceRange, city, condition } = useSelector((store) => store.ad);
  const { changeAddress } = useSelector((store) => store.address)
  
  const { minPrice = 0, maxPrice = Infinity } = priceRange || {};
  const { adCreateModalVisible } = useSelector((store) => store.modal);
  
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  
  const skeletonStartRef = useRef(null);
  
  let { lat, lng } = useSelector((store) => store.user.userLocation)
  
  if (lat === null && lng === null) {
    lat = 22.5726459;
    lng = 88.3638953;
  }
  
  useEffect(() => {
    dispatch(resetPageNum());
    setInitLoading(true);

    const placeholders = Array(PLACEHOLDER_COUNT).fill({
      loading: true,
      isPlaceholder: true,
    });
    setData(placeholders);

    const fetchInitialAds = async () => {
      const { ads, isLastPage } = await getAllAds(1, sortBy, sortOrder, searchKeyword, searchCategory, minPrice, maxPrice, city, condition, lat, lng);
      if (role === 'seller') {
        ads.forEach((ad) => {
          if (ad.adLocation.city === city) {
            console.log('hi')
          }
        })
      }
      setData(ads);
      setIsLastPage(isLastPage);
      setInitLoading(false);
    };

    fetchInitialAds();

    //eslint-disable-next-line
  }, [sortBy, sortOrder, searchKeyword, adCreateModalVisible, searchCategory, minPrice, maxPrice, city, condition, changeAddress]);

  const onLoadMore = async () => {
    setLoading(true);
    const nextPage = pageNum + 1;
    dispatch(incrementPageNum());

    const placeholders = Array(PLACEHOLDER_COUNT).fill({
      loading: true,
      isPlaceholder: true,
    });
    setData((prev) => [...prev, ...placeholders]);

    requestAnimationFrame(() => {
      if (skeletonStartRef.current) {
        skeletonStartRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });

    const { ads: newAds, isLastPage: reachedEnd } = await getAllAds(nextPage, sortBy, sortOrder, searchKeyword, searchCategory, minPrice, maxPrice, condition, lat, lng);

    setData((prev) => {
      const withoutPlaceholders = prev.filter((item) => !item.isPlaceholder);
      return [...withoutPlaceholders, ...newAds];
    });

    setIsLastPage(reachedEnd);
    setLoading(false);
  };

  const loadMore =
    !initLoading && !loading && !isLastPage ? (
      <button
        className="w-[143px] mx-auto p-4 border rounded-lg bg text-center"
        onClick={onLoadMore}
      >
        Load more
      </button>
    ) : isLastPage && data.length > 0 ? (
      <div className="text-center text-gray-500 mt-4">
        No more ads to display
      </div>
    ) : null;

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: role === "seller" ? 2 : 2,
        lg: role === "seller" ? 1 : 3,
        xl: role === "seller" ? 1 : 4,
      }}
      className="w-full"
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={data}
      renderItem={(item, index) => {
        const placeholderStartIndex = data.findIndex((d) => d.isPlaceholder);
        const isPlaceholder = item.loading;
        return (
          <List.Item
            key={index}
            className="h-full"
            ref={index === placeholderStartIndex ? skeletonStartRef : null}
          >
            {isPlaceholder ? (
              <Card className="w-full h-full flex flex-col justify-between">
                <Skeleton.Image className="w-full mb-4" active />
                <Skeleton active title paragraph={{ rows: 3 }} />
              </Card>
            ) : role === "buyer" ? (
              <BuyerAdCard ad={item} className="w-full h-full" />
            ) : (
              <SellerAdCard ad={item} className="w-full h-full" />
            )}
          </List.Item>
        );
      }}
    />
  );
};

export default InfiniteScroll;
