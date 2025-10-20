import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCondition } from "@/store/slices/adSlice";

const options = ["New", "Used", "Refurbished"];

export default function Condition() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState(null); 
    const dispatch = useDispatch();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleRadioChange = (option) => {
        setSelectedCondition(option); 
        dispatch(setCondition(option));
    };

    const handleClear = () => {
        setSelectedCondition(null); 
        dispatch(setCondition());   
    };

    return (
        <div className="w-[270px] border rounded-lg shadow-sm p-2 mt-2 font-archivo bg-white">
            <div
                onClick={toggleDropdown}
                className="flex items-center justify-between cursor-pointer p-2"
            >
                <span>Condition</span> <ChevronDown size={18} />
            </div>

            {isOpen && (
                <div className="p-2">
                    {options.map((option) => (
                        <label
                            key={option}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                        >
                            <input
                                type="radio"
                                name="condition"
                                value={option}
                                checked={selectedCondition === option} 
                                onChange={() => handleRadioChange(option)}
                                className="form-radio w-5 h-5"
                            />
                            <span className="text-[#5D5D5D]">{option}</span>
                        </label>
                    ))}

                    <button
                        onClick={handleClear}
                        className="mt-3 w-full py-1 text-sm text-center bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Clear Condition
                    </button>
                </div>
            )}
        </div>
    );
}
