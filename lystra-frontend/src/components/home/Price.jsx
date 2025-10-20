import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Slider } from "antd";
import { useDispatch } from "react-redux";
import { setPriceRange, resetPriceRange } from "@/store/slices/adSlice";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import useGetAllAds from "@/hooks/ad/useGetAllAds";

export default function Price() {
  useGetAllAds();
  const dispatch = useDispatch();
  const { userApi } = useAxiosInstance();

  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100000); 
  const [priceRange, setPriceRangeLocal] = useState([0, 100000]);
  const debounceTimeoutRef = useRef(null);

  

  const togglePriceDropdown = () => setIsPriceOpen(!isPriceOpen);


  useEffect(() => {
    const fetchMaxPrice = async () => {
      try {
        const res = await userApi.get("/getHeighestPrice");
        
        const highest = res?.data?.highestPrice;
        const cappedMax = highest > 0 ? highest : 100000;
        
        setMaxPrice(cappedMax);
        setPriceRangeLocal([0, cappedMax]);
      } catch (err) {
        console.error("Error fetching max price:", err.message);
        setMaxPrice(100000);
        setPriceRangeLocal([0, 100000]);
      }
    };

    fetchMaxPrice();
  }, [userApi]);


  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      dispatch(
        setPriceRange({ minPrice: priceRange[0], maxPrice: priceRange[1] })
      );
    }, 500);

    return () => clearTimeout(debounceTimeoutRef.current);
  }, [dispatch, priceRange]);

  const handleClear = () => {
    setPriceRangeLocal([0, maxPrice]);
    dispatch(resetPriceRange());
  };

  return (
    <div className="w-[270px] border rounded-lg shadow-sm p-2 mt-2 font-archivo bg-white">
      <div
        onClick={togglePriceDropdown}
        className="flex items-center justify-between cursor-pointer p-2"
      >
        <span>Price Range</span> <ChevronDown size={18} />
      </div>
      {isPriceOpen && (
        <div className="p-2 space-y-2">
          <div className="flex justify-between items-center text-sm mb-2 space-x-2">
            <div>
              <span>₹</span>
              <input
                type="number"
                className="w-fit border-0 focus:outline-none rounded pe-2 py-1 ms-1"
                min={0}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) => {
                  const newMin = Number(e.target.value);
                  if (newMin <= priceRange[1]) {
                    setPriceRangeLocal([newMin, priceRange[1]]);
                  }
                }}
              />
            </div>
            <div>
              <span>₹</span>
              <input
                type="number"
                className="w-fit border-0 focus:outline-none rounded pe-2 py-1 ms-1 text-right"
                min={priceRange[0]}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => {
                  const newMax = Number(e.target.value);
                  if (newMax >= priceRange[0]) {
                    setPriceRangeLocal([priceRange[0], newMax]);
                  }
                }}
              />
            </div>
          </div>

          <Slider
            range
            min={0}
            max={maxPrice}
            value={priceRange}
            onChange={setPriceRangeLocal}
            styles={{
              track: { backgroundColor: "orange" },
              handle: { borderColor: "orange" },
            }}
          />

          <button
            onClick={handleClear}
            className="mt-3 w-full py-1 text-sm text-center bg-gray-200 hover:bg-gray-300 rounded"
          >
            Clear Price Range
          </button>
        </div>
      )}
    </div>
  );
}
