import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Radio } from "antd";
import { resetCity, setCity } from "@/store/slices/adSlice";
import { useDispatch } from "react-redux";
import useAxiosInstance from '@/hooks/useAxiosInstance';

export default function Location() {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();
    const { userApi } = useAxiosInstance();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const [value, setValue] = useState(0);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await userApi.get("/getAllcities");                
                const cities = res.data;

                if (cities.length === 0) {
                    const defaultCities = [
                        "Kolkata",
                        "Mumbai",
                        "Pune",
                        "Nagpur",
                        "Delhi",
                        "Bengaluru",
                        "Goa",
                        "Gurgaon",
                    ];
                    setOptions(
                        defaultCities.map((city, index) => ({
                            value: index + 1,
                            label: (
                                <span className="text-lg text-[#5D5D5D]">{city}</span>
                            ),
                        }))
                    );
                } else {
                    setOptions(
                        cities.map((city, index) => ({
                            value: index + 1,
                            label: (
                                <span className="text-lg text-[#5D5D5D]">{city}</span>
                            ),
                        }))
                    );
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchCities();
    }, [userApi]);

    useEffect(() => {
        if (options.length > 0 && value > 0) {
            dispatch(
                setCity(
                    options[value - 1]?.label.props.children.toLowerCase()
                )
            );
        }
    }, [value, dispatch, options]);

    const handleClear = () => {
        setValue(0);
        dispatch(resetCity());
    };

    return (
        <div className="w-[270px] border rounded-lg shadow-sm p-2 mt-2 font-archivo bg-white">
            <div
                onClick={toggleDropdown}
                className="flex items-center justify-between cursor-pointer p-2"
            >
                <span>Locations</span> <ChevronDown size={18} />
            </div>
            {isOpen && (
                <>
                    <Radio.Group
                        className="flex flex-col px-3 gap-2 h-56 overflow-auto accent-black"
                        onChange={onChange}
                        value={value}
                        options={options}
                    />
                    <button
                        onClick={handleClear}
                        className="mt-3 w-full py-1 text-sm text-center bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Clear City
                    </button>
                </>
            )}
        </div>
    );
}
