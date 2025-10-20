import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import useGetCategories from "@/hooks/ad/useGetCategories";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCategory } from "@/store/slices/adSlice";

export default function Category() {
    useGetCategories()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { categories } = useSelector(store => store.ad)
    const dispatch = useDispatch()
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCheckboxChange = (option) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    useEffect(() => {
        dispatch(setSearchCategory(selectedOptions));

    }, [selectedOptions, dispatch]);
    return (
        <div className="w-[270px] border rounded-lg shadow-sm p-2 mt-2 font-archivo bg-white">
            <div onClick={toggleDropdown} className="flex items-center justify-between cursor-pointer p-2">
                <span>Categories</span> <ChevronDown size={18} />
            </div>
            {isOpen && (
                <div className="p-2">
                    {categories.map((option) => (
                        <label key={option?._id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option?.name)}
                                onChange={() => handleCheckboxChange(option?.name)}
                                className="form-checkbox w-5 h-5"
                            />
                            <span className="text-[#5D5D5D]">{option?.name}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}